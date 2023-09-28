import { Comment } from '../types';

export const findRow = (rows: Comment[], rowId: string) => {
  const stack = [...rows];
  let result: Comment | undefined;
  while (stack.length > 0) {
    const node = stack.pop();
    if (node?.id === rowId) {
      result = node;
      continue;
    }
    if (node?.comments?.length) {
      stack.push(...node.comments);
    }
  }
  return result;
};
