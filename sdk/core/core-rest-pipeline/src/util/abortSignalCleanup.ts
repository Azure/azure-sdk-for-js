// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getRequestCompletion } from "@typespec/ts-http-runtime/internal/util";

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
  const requestCompletion = response ? getRequestCompletion(response) : undefined;
  let requestDone = requestCompletion === undefined;
  let responseDone = !stream || !stream.readable;
  let cleanedUp = false;
  const cleanupIfComplete = (): void => {
    if (cleanedUp || !requestDone || !responseDone) return;
    cleanedUp = true;
    cleanup();
  };
  const onResponseComplete = (): void => {
    stream?.removeListener("end", onResponseComplete);
    stream?.removeListener("close", onResponseComplete);
    stream?.removeListener("error", onResponseComplete);
    responseDone = true;
    cleanupIfComplete();
  };
  if (!responseDone && stream) {
    stream.once("end", onResponseComplete);
    stream.once("close", onResponseComplete);
    stream.once("error", onResponseComplete);
  }
  if (requestCompletion) {
    void requestCompletion.then(() => {
      requestDone = true;
      cleanupIfComplete();
      return undefined;
    });
  }
  cleanupIfComplete();
}
