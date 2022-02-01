export type Reference<T> = { ref: T | undefined };
export const referenceInit = () => {
  return { ref: undefined };
};
