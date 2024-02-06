// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** @internal */
export function wrapError<T>(f: () => T, message: string): T {
  let result: T;
  try {
    result = f();
  } catch (cause) {
    throw errorWithCause(message, cause as Error);
  }
  return result;
}

/** @internal */
export function errorWithCause(message: string, cause: Error): Error {
  return new Error(
    message,
    // TS v4.6 and below do not yet recognize the cause option in the Error constructor
    // see https://medium.com/ovrsea/power-up-your-node-js-debugging-and-error-handling-with-the-new-error-cause-feature-4136c563126a
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { cause }
  );
}
