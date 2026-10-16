// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function cleanupAbortSignal(
  response:
    | {
        readableStreamBody?: {
          readable: boolean;
          once(event: string, listener: () => void): unknown;
          removeListener(event: string, listener: () => void): unknown;
        };
      }
    | undefined,
  cleanup: (() => void) | undefined,
): void {
  if (!cleanup) return;
  const stream = response?.readableStreamBody;
  if (!stream || !stream.readable) {
    cleanup();
    return;
  }
  const onComplete = (): void => {
    stream.removeListener("end", onComplete);
    stream.removeListener("close", onComplete);
    stream.removeListener("error", onComplete);
    cleanup();
  };
  stream.once("end", onComplete);
  stream.once("close", onComplete);
  stream.once("error", onComplete);
}
