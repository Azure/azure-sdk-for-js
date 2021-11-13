// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 * Returns a promise and the promise's resolve and reject methods.
 */
export function getPromiseParts<T = unknown>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: Error) => void;
} {
  let resolver: (value: T) => void;
  let rejector: (reason?: any) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolver = resolve;
    rejector = reject;
  });
  return {
    promise,
    resolve: resolver!,
    reject: rejector!
  };
}
