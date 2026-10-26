// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  getRequestCompletion,
  getResponseBodyCompletion,
} from "@typespec/ts-http-runtime/internal/util";

/**
 * Runs the cleanup callback associated with the response and its request once they are complete.
 */
export function cleanupOnRequestResponseCompletion(
  response:
    | {
        readableStreamBody?: {
          readable: boolean;
          once(event: string, listener: () => void): unknown;
          removeListener(event: string, listener: () => void): unknown;
        };
        browserStreamBody?: unknown;
      }
    | undefined,
  cleanup: (() => void) | undefined,
): void {
  if (!cleanup) return;
  const stream = response?.readableStreamBody;
  const requestCompletion = response ? getRequestCompletion(response) : undefined;
  const browserResponseCompletion = response ? getResponseBodyCompletion(response) : undefined;
  let requestDone = requestCompletion === undefined;
  let nodeResponseDone = !stream || !stream.readable;
  let browserResponseDone = browserResponseCompletion === undefined;
  let cleanedUp = false;
  const cleanupIfComplete = (): void => {
    if (cleanedUp || !requestDone || !nodeResponseDone || !browserResponseDone) return;
    cleanedUp = true;
    cleanup();
  };
  const onResponseComplete = (): void => {
    stream?.removeListener("end", onResponseComplete);
    stream?.removeListener("close", onResponseComplete);
    stream?.removeListener("error", onResponseComplete);
    nodeResponseDone = true;
    cleanupIfComplete();
  };
  if (!nodeResponseDone && stream) {
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
  if (browserResponseCompletion) {
    void browserResponseCompletion.then(() => {
      browserResponseDone = true;
      cleanupIfComplete();
      return undefined;
    });
  }
  cleanupIfComplete();
}
