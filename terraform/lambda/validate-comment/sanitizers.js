import DOMPurify from 'isomorphic-dompurify';

export const sanitizeInput = (input) => {
    const errors = [];
    const { comment, name } = input;
    const sanitized = {
        comment: DOMPurify.sanitize(comment.trim()),
        name: DOMPurify.sanitize(name.trim())
    };

    if (sanitized.comment !== comment) {
        errors.push('Comment contains HTML tags');
    }
    if (sanitized.name !== name) {
        errors.push('Name contains HTML tags');
    }

    return {
        isValid: errors.length === 0,
        errors,
        sanitized
    };
}