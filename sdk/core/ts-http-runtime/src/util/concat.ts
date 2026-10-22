// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "stream";
import { isBlob } from "./typeGuards.js";
import {
  assertBodyStreamAvailable,
  disposeBodyStream,
  monitorBodyStreamErrors,
  registerPendingBodyErrorSources,
  registerMultipartStream,
  startBodyStream,
} from "./nodeBody.js";
import { logger } from "../log.js";
import { RestError } from "../restError.js";
import { toError } from "./error.js";

function toStream(
  source: ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob,
  owned: boolean,
): NodeJS.ReadableStream {
  if (source instanceof Uint8Array) {
    return Readable.from(Buffer.from(source));
  } else if (isBlob(source)) {
    return toStream(source.stream(), true);
  } else if (source instanceof ReadableStream) {
    const reader = source.getReader();
    const stream = new Readable({
      read() {
        return reader
          .read()
          .then(
            ({ done, value }) => !stream.destroyed && stream.push(done ? null : Buffer.from(value)),
          )
          .catch((error: unknown) => (stream.destroyed ? stream : stream.destroy(toError(error))));
      },
      destroy(error, callback) {
        reader.releaseLock();
        if (owned) {
          source.cancel(error).catch((cancelError: unknown) => {
            logger.warning("Error canceling multipart source", cancelError);
          });
        }
        callback(error);
      },
    });
    return stream;
  } else {
    return source;
  }
}

/**
 * Accepted binary data types for concat
 *
 * @internal
 */
export type ConcatSource =
  ReadableStream<Uint8Array<ArrayBuffer>> | NodeJS.ReadableStream | Uint8Array<ArrayBuffer> | Blob;

/**
 * Utility function that concatenates a set of binary inputs into one combined output.
 *
 * @param sources - array of sources for the concatenation
 * @returns - in Node, a (() =\> NodeJS.ReadableStream) which, when read, produces a concatenation of all the inputs.
 *           In browser, returns a `Blob` representing all the concatenated inputs.
 *
 * @internal
 */
export async function concat(
  sources: (ConcatSource | (() => ConcatSource))[],
): Promise<(() => NodeJS.ReadableStream) | Blob> {
  const createStream = function (): NodeJS.ReadableStream {
    let index = 0;
    let current: NodeJS.ReadableStream | undefined;
    let cleanupCurrent: (() => void) | undefined;
    let waitingForRead = false;
    const stream = new Readable({
      read() {
        const pipePaused = this.readableFlowing === false && this.listenerCount("data") > 0;
        if (pipePaused) {
          waitingForRead = true;
          current?.pause();
          return;
        }
        waitingForRead = false;
        if (current) current.resume();
        else advance();
      },
      destroy(error, callback) {
        cleanupCurrent?.();
        callback(error);
      },
    });
    const isPipePaused = (): boolean =>
      stream.readableFlowing === false && stream.listenerCount("data") > 0;
    stream.on("resume", () => {
      if (!waitingForRead || stream.destroyed) {
        return;
      }
      waitingForRead = false;
      if (current) current.resume();
      else advance();
    });
    registerMultipartStream(stream, () => {
      for (const source of sources) {
        if (typeof source === "function" || source instanceof Uint8Array || isBlob(source)) {
          continue;
        }
        if (source instanceof ReadableStream) assertWebSourceAvailable(source);
        else assertBodyStreamAvailable(source);
      }
    });
    function advance(): void {
      if (stream.destroyed) return;
      if (index === sources.length) {
        stream.push(null);
        return;
      }
      const source = sources[index++];
      const factory = typeof source === "function";
      try {
        const resolved = factory ? source() : source;
        const owned = factory || resolved instanceof Uint8Array || isBlob(resolved);
        if (stream.destroyed) {
          if (factory && !(resolved instanceof Uint8Array) && !isBlob(resolved)) {
            if (resolved instanceof ReadableStream) {
              resolved.cancel().catch((error: unknown) => {
                logger.warning("Error canceling multipart source", error);
              });
            } else {
              disposeBodyStream(resolved);
            }
          }
          return;
        }
        if (!(resolved instanceof Uint8Array) && !isBlob(resolved)) {
          if (resolved instanceof ReadableStream) {
            // Web sources also need identity-based replay protection before taking a reader.
            startWebSource(resolved);
          } else {
            startBodyStream(resolved);
          }
        }
        const part = toStream(resolved, owned);
        current = part;
        const onData = (chunk: Buffer | string): void => {
          if (!stream.push(chunk) || isPipePaused()) {
            waitingForRead = true;
            part.pause();
          }
        };
        const onError = (error: Error): void => {
          stream.destroy(error);
        };
        const onEnd = (): void => {
          cleanupCurrent?.();
          if (
            waitingForRead ||
            stream.readableLength >= stream.readableHighWaterMark ||
            isPipePaused()
          ) {
            waitingForRead = true;
            return;
          }
          advance();
        };
        const onClose = (): void => {
          if (current === part) stream.destroy(new Error("Multipart source closed before ending"));
        };
        cleanupCurrent = () => {
          current = undefined;
          cleanupCurrent = undefined;
          part.pause();
          part.removeListener("data", onData);
          part.removeListener("end", onEnd);
          part.removeListener("error", onError);
          part.removeListener("close", onClose);
          if (owned || resolved instanceof ReadableStream) disposeBodyStream(part);
          else monitorBodyStreamErrors(part);
        };
        part.on("data", onData);
        part.once("end", onEnd);
        part.once("error", onError);
        part.once("close", onClose);
        part.resume();
      } catch (error) {
        stream.destroy(toError(error));
      }
    }
    return stream;
  };
  registerPendingBodyErrorSources(
    createStream,
    sources.filter(
      (source): source is NodeJS.ReadableStream =>
        typeof source !== "function" &&
        !(source instanceof Uint8Array) &&
        !isBlob(source) &&
        !(source instanceof ReadableStream),
    ),
  );
  return createStream;
}

const startedWebSources = new WeakSet<ReadableStream>();
function assertWebSourceAvailable(source: ReadableStream): void {
  if (
    startedWebSources.has(source) ||
    source.locked ||
    Readable.isDisturbed(source as unknown as Parameters<typeof Readable.isDisturbed>[0])
  ) {
    throw new RestError(
      "Cannot resend an already-started multipart stream. Use a factory returning a fresh stream.",
      { code: "REQUEST_BODY_NOT_REPLAYABLE" },
    );
  }
}

function startWebSource(source: ReadableStream): void {
  assertWebSourceAvailable(source);
  startedWebSources.add(source);
}
