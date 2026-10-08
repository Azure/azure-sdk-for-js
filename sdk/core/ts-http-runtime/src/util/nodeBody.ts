// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "../restError.js";
import { logger } from "../log.js";

const startedSources = new WeakSet<object>();
const disposedSources = new WeakSet<object>();
const monitoredSources = new WeakSet<object>();
const multipartStreams = new WeakMap<NodeJS.ReadableStream, (protectReplay: boolean) => void>();

export function registerMultipartStream(
  stream: NodeJS.ReadableStream,
  protectReplay: (enabled: boolean) => void,
): void {
  multipartStreams.set(stream, protectReplay);
}

export function startBodyStream(stream: NodeJS.ReadableStream, protectReplay: boolean): void {
  if (
    startedSources.has(stream) ||
    (protectReplay &&
      (!stream.readable ||
        ("destroyed" in stream && stream.destroyed === true) ||
        ("readableEnded" in stream && stream.readableEnded === true)))
  ) {
    throw new RestError(
      "Cannot resend an already-started request body stream. Use a factory returning a fresh stream.",
      { code: "REQUEST_BODY_NOT_REPLAYABLE" },
    );
  }
  if (protectReplay) startedSources.add(stream);
  multipartStreams.get(stream)?.(protectReplay);
}

export function destroyBodyStream(stream: NodeJS.ReadableStream, error?: Error): void {
  if ("destroy" in stream && typeof stream.destroy === "function") {
    stream.destroy(error);
  }
}

export function disposeBodyStream(stream: NodeJS.ReadableStream): void {
  if (disposedSources.has(stream) || ("closed" in stream && stream.closed === true)) return;
  disposedSources.add(stream);
  monitorBodyStreamErrors(stream);
  destroyBodyStream(stream);
}

export function monitorBodyStreamErrors(stream: NodeJS.ReadableStream): void {
  if (monitoredSources.has(stream) || ("closed" in stream && stream.closed === true)) return;
  monitoredSources.add(stream);
  const onError = (error: Error): void => {
    logger.warning("Error after stopping request body stream", error);
  };
  stream.on("error", onError);
  stream.once("close", () => stream.removeListener("error", onError));
}
