import { NextRequest, NextResponse } from 'next/server';

const COMMENT_API_URL = process.env.COMMENT_API_URL;

export async function POST(request: NextRequest) {
  const { comment } = await request.json();
  
  if (!COMMENT_API_URL) {
    return NextResponse.json({ error: 'API not configured' }, { status: 500 });
  }
  
  try {
    const response = await fetch(`${COMMENT_API_URL}/process-comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment })
    });
    
    const analysis = await response.json();
    
    // Block negative comments
    if (analysis.sentiment === 'NEGATIVE' && analysis.confidence.Negative > 0.8) {
      return NextResponse.json({ error: 'Comment rejected' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true, sentiment: analysis.sentiment });
  } catch {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
