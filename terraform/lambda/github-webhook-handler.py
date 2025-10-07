import json
import hmac
import hashlib
import boto3 # type: ignore
import urllib.parse
import urllib3 # type: ignore

http = urllib3.PoolManager()
ssm = boto3.client('ssm')

def lambda_handler(event, context):

    body = event.get("body")
    if not body:
        return {"statusCode": 400, "body": "Empty body"}
    
    secret = ssm.get_parameter(
        Name="/jenkins/dev/github_webhook_secret",
        WithDecryption=True
    )["Parameter"]["Value"]

    headers = {k.lower(): v for k, v in event.get("headers", {}).items()}

    signature = headers.get("x-hub-signature-256", "")

    if signature:
        expected = "sha256=" + hmac.new(
            secret.encode(),
            body.encode(),
            hashlib.sha256
        ).hexdigest()
        
        if not hmac.compare_digest(signature, expected):
            return {"statusCode": 401, "body": "Unauthorized"}
    else:
        return {"statusCode": 400, "body": "Missing signature"}

    if body.startswith("payload="):
        decoded = urllib.parse.unquote_plus(body[len("payload="):])
        try:
            payload = json.loads(decoded)
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}")
            return {"statusCode": 400, "body": "Invalid JSON"}
    else:
        return {"statusCode": 400, "body": "Invalid format"}

    event_type = headers.get("x-github-event", "")
    forward_events = {"push", "pull_request", "status"}

    if event_type in forward_events:
        if event_type == "push":
            print(f"Push to {payload['repository']['name']}")
        elif event_type == "pull_request":
            print(f"PR {payload['action']}: {payload['pull_request']['title']}")
            if payload['action'] == "closed" and payload['pull_request']['merged']:
                print(json.dumps(payload, indent=2))
        elif event_type == "status":
            print(f"Status update: {payload['state']} for {payload['sha'][:7]}")

    return {
        "statusCode": 200,
        "body": json.dumps({"message": f"Forwarded: {event_type}"})
    }