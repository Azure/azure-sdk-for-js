// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../log.js";

interface NodeResponseBody {
  closed?: boolean;
  destroy?: () => void;
  resume: () => void;
}

interface NodeEventEmitterBody {
  on(event: "error", listener: (error: unknown) => void): unknown;
  once(event: "close", listener: () => void): unknown;
  removeListener(event: "error", listener: (error: unknown) => void): unknown;
  removeListener(event: "close", listener: () => void): unknown;
}

interface BrowserResponseBody {
  cancel: () => Promise<void>;
}

const responseBodySources = new WeakMap<NodeResponseBody, NodeResponseBody>();
const responseBodyDisposers = new WeakMap<object, () => void>();

function isNodeResponseBody(value: unknown): value is NodeResponseBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "resume" in value &&
    typeof value.resume === "function"
  );
}

function isNodeEventEmitterBody(
  value: NodeResponseBody,
): value is NodeResponseBody & NodeEventEmitterBody {
  return (
    "on" in value &&
    typeof value.on === "function" &&
    "once" in value &&
    typeof value.once === "function" &&
    "removeListener" in value &&
    typeof value.removeListener === "function"
  );
}

function isBrowserResponseBody(value: unknown): value is BrowserResponseBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "cancel" in value &&
    typeof value.cancel === "function"
  );
}

export function setResponseBodySource(body: unknown, source: unknown): void {
  if (isNodeResponseBody(body) && isNodeResponseBody(source)) {
    responseBodySources.set(body, source);
  }
}

export function setResponseBodyDisposer(response: object, dispose: () => void): () => void {
  responseBodyDisposers.set(response, dispose);
  return () => {
    if (responseBodyDisposers.get(response) === dispose) {
      responseBodyDisposers.delete(response);
    }
  };
}

function disposeNodeResponseBody(
  readableStream: NodeResponseBody,
  disposed: Set<NodeResponseBody>,
): void {
  if (disposed.has(readableStream)) return;
  disposed.add(readableStream);

  const source = responseBodySources.get(readableStream);
  responseBodySources.delete(readableStream);

  if (readableStream.closed !== true) {
    if (readableStream.destroy) {
      if (isNodeEventEmitterBody(readableStream)) {
        const onError = (error: unknown): void => {
          logger.warning("Error disposing response body", error);
        };
        const onClose = (): void => {
          readableStream.removeListener("error", onError);
        };
        readableStream.on("error", onError);
        readableStream.once("close", onClose);
        try {
          readableStream.destroy();
        } catch (error) {
          readableStream.removeListener("error", onError);
          readableStream.removeListener("close", onClose);
          throw error;
        }
      } else {
        readableStream.destroy();
      }
    } else {
      readableStream.resume();
    }
  }

  if (source) {
    disposeNodeResponseBody(source, disposed);
  }
}

/**
 * Releases the body of a response that will not be read, so the underlying connection can be
 * reused or closed. Handles Node readable streams and browser web streams, and never throws:
 * disposal failures are logged as warnings.
 *
 * @param response - The response whose `readableStreamBody` or `browserStreamBody` should be disposed.
 */
export async function disposeResponseBody(response: {
  readableStreamBody?: unknown;
  browserStreamBody?: unknown;
}): Promise<void> {
  try {
    const dispose = responseBodyDisposers.get(response);
    responseBodyDisposers.delete(response);
    try {
      const readableStream: unknown = response.readableStreamBody;
      if (isNodeResponseBody(readableStream)) {
        disposeNodeResponseBody(readableStream, new Set());
        return;
      }

      const browserStream: unknown = response.browserStreamBody;
      if (isBrowserResponseBody(browserStream)) {
        await browserStream.cancel();
      }
    } finally {
      dispose?.();
    }
  } catch (error) {
    logger.warning("Error disposing response body", error);
  }
}
