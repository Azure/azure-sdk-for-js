// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "stream";
import { isBlob } from "./typeGuards.js";
import {
  disposeBodyStream,
  monitorBodyStreamErrors,
  registerMultipartStream,
  startBodyStream,
} from "./nodeBody.js";
import { logger } from "../log.js";
import { RestError } from "../restError.js";

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
          .catch((error: unknown) =>
            stream.destroyed
              ? stream
              : stream.destroy(error instanceof Error ? error : new Error(String(error))),
          );
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
  return function () {
    let index = 0;
    let current: NodeJS.ReadableStream | undefined;
    let cleanupCurrent: (() => void) | undefined;
    let protectReplay = false;
    const stream = new Readable({
      read() {
        if (current) current.resume();
        else advance();
      },
      destroy(error, callback) {
        cleanupCurrent?.();
        callback(error);
      },
    });
    registerMultipartStream(stream, (enabled) => {
      protectReplay = enabled;
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
            startWebSource(resolved, protectReplay);
          } else {
            startBodyStream(resolved, protectReplay);
          }
        }
        const part = toStream(resolved, owned);
        current = part;
        const onData = (chunk: Buffer | string): void => {
          if (!stream.push(chunk)) part.pause();
        };
        const onError = (error: Error): void => {
          stream.destroy(error);
        };
        const onEnd = (): void => {
          cleanupCurrent?.();
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
        stream.destroy(error instanceof Error ? error : new Error(String(error)));
      }
    }
    return stream;
  };
}

const startedWebSources = new WeakSet<ReadableStream>();
function startWebSource(source: ReadableStream, protectReplay: boolean): void {
  if (startedWebSources.has(source)) {
    throw new RestError(
      "Cannot resend an already-started multipart stream. Use a factory returning a fresh stream.",
      { code: "REQUEST_BODY_NOT_REPLAYABLE" },
    );
  }
  if (protectReplay) startedWebSources.add(source);
}
