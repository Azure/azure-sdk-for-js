// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortError } from "@azure/abort-controller";
import { createAbortablePromise, delay } from "@azure/core-util";
import type {
  EventMessage,
  EventMessageStream,
  ReconnectingSseStreamOptions,
  SseConnect,
  SseConnectResponse,
  SseStream,
} from "./models.js";
import { SseRetryError } from "./models.js";
import { createSseParser } from "./sse.js";
import { createStream, ensureAsyncIterable } from "./utils.js";

const defaultRetryDelayInMs = 3000;

/**
 * The largest delay Node.js and browser timers reliably honor. Values above
 * this (including `Infinity`) are normalized by `setTimeout` to a 1ms delay,
 * which would otherwise turn a large configured or server-provided `retry:`
 * value into an immediate reconnect loop.
 */
const maxTimerDelayInMs = 2147483647;

/**
 * Clamps a reconnect delay to a value timers can honor without wrapping.
 */
function clampDelay(delayInMs: number): number {
  return Math.min(delayInMs, maxTimerDelayInMs);
}

/**
 * Best-effort cancellation: swallows any error, including a synchronous
 * throw from the cancel function itself, so cleanup never masks a real
 * transport or validation error.
 */
async function safeCancel(cancel: (() => Promise<void>) | undefined): Promise<void> {
  if (!cancel) {
    return;
  }
  try {
    await cancel();
  } catch {
    // ignored
  }
}

/**
 * Creates an SSE stream that reconnects when a connection ends unexpectedly.
 *
 * The initial connection is established and validated before this function
 * resolves. Subsequent connections are established while the returned stream
 * is being consumed.
 *
 * @param connect - A factory that establishes a fresh SSE connection.
 * @param options - Options that control response validation, abort, and reconnection.
 * @returns A promise that resolves to a reconnecting stream of event messages.
 */
export async function createReconnectingSseStream<TResponse extends SseConnectResponse>(
  connect: SseConnect<TResponse>,
  options: ReconnectingSseStreamOptions<TResponse>,
): Promise<EventMessageStream> {
  const retryDelayInMs = options.retryDelayInMs ?? defaultRetryDelayInMs;
  validateOptions(retryDelayInMs, options.maxRetries);

  const aborter = new AbortController();
  let activeCancel: (() => Promise<void>) | undefined;
  let stopped = false;

  const abort = (): void => {
    aborter.abort();
    void safeCancel(activeCancel);
  };
  options.abortSignal?.addEventListener("abort", abort);

  const cleanup = async (): Promise<void> => {
    if (stopped) {
      return;
    }
    stopped = true;
    aborter.abort();
    options.abortSignal?.removeEventListener("abort", abort);
    await safeCancel(activeCancel);
  };

  try {
    throwIfAborted(options.abortSignal);
    let lastEventId = options.lastEventId ?? "";
    let reconnectDelayInMs = clampDelay(retryDelayInMs);
    const parserCallbacks = {
      onId: (value: string) => {
        lastEventId = value;
      },
      onRetry: (value: number) => {
        reconnectDelayInMs = clampDelay(value);
      },
    };
    const initial = await establishConnection(
      connect,
      options.validateResponse,
      aborter.signal,
      options.lastEventId,
      parserCallbacks,
    );
    if (initial.kind === "stop") {
      await cleanup();
      return createStream(createEmptyIterator(), async () => {});
    }

    activeCancel = initial.cancel;
    let reconnects = 0;
    let lastTransportError: unknown;
    let current = initial;

    const events = async function* (): AsyncIterableIterator<EventMessage> {
      try {
        while (!stopped) {
          try {
            yield* current.iterable;
            lastTransportError = undefined;
          } catch (error: unknown) {
            if (stopped || aborter.signal.aborted || options.abortSignal?.aborted) {
              throw new AbortError("The operation was aborted.");
            }
            lastTransportError = error;
          }
          activeCancel = undefined;

          if (stopped) {
            return;
          }
          throwIfAborted(options.abortSignal);
          if (options.maxRetries !== undefined && reconnects >= options.maxRetries) {
            throw new SseRetryError(lastTransportError);
          }

          await delay(reconnectDelayInMs, { abortSignal: aborter.signal });
          throwIfAborted(options.abortSignal);
          reconnects++;

          try {
            const next = await establishConnection(
              connect,
              options.validateResponse,
              aborter.signal,
              lastEventId || undefined,
              parserCallbacks,
            );
            if (next.kind === "stop") {
              return;
            }
            current = next;
            activeCancel = next.cancel;
          } catch (error: unknown) {
            if (error instanceof FatalSseConnectionError) {
              throw error.cause;
            }
            if (aborter.signal.aborted || options.abortSignal?.aborted) {
              throw new AbortError("The operation was aborted.");
            }
            lastTransportError = error;

            while (!stopped) {
              if (options.maxRetries !== undefined && reconnects >= options.maxRetries) {
                throw new SseRetryError(lastTransportError);
              }
              await delay(reconnectDelayInMs, { abortSignal: aborter.signal });
              reconnects++;
              try {
                const next = await establishConnection(
                  connect,
                  options.validateResponse,
                  aborter.signal,
                  lastEventId || undefined,
                  parserCallbacks,
                );
                if (next.kind === "stop") {
                  return;
                }
                current = next;
                activeCancel = next.cancel;
                break;
              } catch (nextError: unknown) {
                if (nextError instanceof FatalSseConnectionError) {
                  throw nextError.cause;
                }
                if (aborter.signal.aborted || options.abortSignal?.aborted) {
                  throw new AbortError("The operation was aborted.");
                }
                lastTransportError = nextError;
              }
            }
          }
        }
      } finally {
        await cleanup();
      }
    };

    return createStream(events(), cleanup);
  } catch (error: unknown) {
    await cleanup();
    if (error instanceof FatalSseConnectionError) {
      throw error.cause;
    }
    throw error;
  }
}

function validateOptions(retryDelayInMs: number, maxRetries: number | undefined): void {
  if (!Number.isFinite(retryDelayInMs) || retryDelayInMs < 0) {
    throw new RangeError("retryDelayInMs must be a non-negative finite number.");
  }
  if (maxRetries !== undefined && (!Number.isSafeInteger(maxRetries) || maxRetries < 0)) {
    throw new RangeError("maxRetries must be a non-negative safe integer.");
  }
}

function throwIfAborted(abortSignal: { aborted: boolean } | undefined): void {
  if (abortSignal?.aborted) {
    throw new AbortError("The operation was aborted.");
  }
}

type EstablishedConnection =
  | {
      kind: "accept";
      cancel: () => Promise<void>;
      iterable: AsyncIterableIterator<EventMessage>;
    }
  | { kind: "stop" };

class FatalSseConnectionError extends Error {
  override readonly cause: unknown;

  constructor(cause: unknown) {
    super("The SSE connection response was rejected.");
    this.cause = cause;
  }
}

async function establishConnection<TResponse extends SseConnectResponse>(
  connect: SseConnect<TResponse>,
  validateResponse: ReconnectingSseStreamOptions<TResponse>["validateResponse"],
  abortSignal: AbortSignal,
  lastEventId: string | undefined,
  callbacks: {
    onId(value: string): void;
    onRetry(value: number): void;
  },
): Promise<EstablishedConnection> {
  const connectPromise = connect({
    abortSignal,
    ...(lastEventId === undefined ? {} : { lastEventId }),
  });
  let response: TResponse;
  try {
    response = await createAbortablePromise(
      (resolve, reject) => {
        return connectPromise.then(resolve, reject);
      },
      { abortSignal },
    );
  } catch (error: unknown) {
    if (abortSignal.aborted) {
      void connectPromise
        .then(
          (lateResponse) => cancelBody(lateResponse.body),
          () => undefined,
        )
        .catch(() => undefined);
    }
    throw error;
  }

  let validationPromise: Promise<"accept" | "stop">;
  try {
    validationPromise = Promise.resolve(validateResponse(response));
  } catch (error: unknown) {
    await cancelBody(response.body);
    throw new FatalSseConnectionError(error);
  }

  let validation;
  try {
    validation = await createAbortablePromise(
      (resolve, reject) => validationPromise.then(resolve, reject),
      { abortSignal },
    );
  } catch (error: unknown) {
    await cancelBody(response.body);
    if (abortSignal.aborted) {
      throw error;
    }
    throw new FatalSseConnectionError(error);
  }

  if (validation === "stop") {
    await cancelBody(response.body);
    return { kind: "stop" };
  }
  if (!response.body) {
    throw new FatalSseConnectionError(
      new Error("The accepted SSE response did not include a body."),
    );
  }

  const parser = createSseParser(response.body, callbacks);
  return { kind: "accept", ...parser };
}

async function cancelBody(body: SseStream | undefined): Promise<void> {
  if (!body) {
    return;
  }
  try {
    // Best-effort cleanup: swallow any error here (including a synchronous
    // throw from acquiring the reader, e.g. when a caller's validator has
    // already locked the stream) so it never masks the real error.
    await ensureAsyncIterable(body).cancel();
  } catch {
    // ignored
  }
}

function createEmptyIterator(): AsyncIterableIterator<EventMessage> {
  return {
    next: async () => ({ done: true, value: undefined }),
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
