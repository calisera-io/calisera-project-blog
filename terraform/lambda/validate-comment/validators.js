const COMMENT_MAX_LENGTH = 1000;
const COMMENT_MIN_LENGTH = 10;
const NAME_MAX_LENGTH = 100;
const NAME_MIN_LENGTH = 3;
const URL_MAX_COUNT = 0;

export const validateInput = (input) => {
  const errors = [];
  const { comment, name } = input;

  if (!comment?.trim()) {
    errors.push('Comment is required');
  } else if (comment.length > COMMENT_MAX_LENGTH) {
    errors.push(`Comment too long (max ${COMMENT_MAX_LENGTH} characters)`);
  } else if (comment.length < COMMENT_MIN_LENGTH) {
    errors.push(`Comment too short (min ${COMMENT_MIN_LENGTH} characters)`);
  }

  if (!name?.trim()) {
    errors.push('Name is required');
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.push(`Name too long (max ${NAME_MAX_LENGTH} characters)`);
  } else if (name.length < NAME_MIN_LENGTH) {
    errors.push(`Name too short (min ${NAME_MIN_LENGTH} characters)`);
  }

  const urlCount = (comment?.match(/https?:\/\//g) || []).length;
  if (urlCount > URL_MAX_COUNT) {
    errors.push('Too many links detected');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};