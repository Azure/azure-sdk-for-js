// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

export function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}

export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutInMs: number,
  errorMessage: string,
): Promise<T> {
  const timeout = createDeferred<never>();
  const handle = setTimeout(() => timeout.reject(new Error(errorMessage)), timeoutInMs);
  try {
    return await Promise.race([promise, timeout.promise]);
  } finally {
    clearTimeout(handle);
  }
}

export async function sleep(timeoutInMs: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, timeoutInMs));
}
