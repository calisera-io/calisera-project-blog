import { validateInput } from './validators.js';
import { sanitizeInput } from './sanitizers.js';

export const handler = async (event) => {
    try {
        const input = JSON.parse(event.body);
        
        const validation = validateInput(input);
        if (!validation.isValid) {
            return { statusCode: 400, body: JSON.stringify({ errors: validation.errors }) };
        }
        
        const sanitized = sanitizeInput(input);
        if (!sanitized.isValid) {
            return { statusCode: 400, body: JSON.stringify({ errors: sanitized.errors }) };
        }
        return { statusCode: 200, body: JSON.stringify({ data: sanitized }) };
    } catch(error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};