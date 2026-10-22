// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { RestError } from "../restError.js";
import { logger } from "../log.js";

const startedSources = new WeakSet<object>();
const disposedSources = new WeakSet<object>();
const monitoredSources = new WeakSet<object>();
const multipartStreams = new WeakMap<NodeJS.ReadableStream, () => void>();
const pendingErrorSources = new WeakMap<object, NodeJS.ReadableStream[]>();

export function registerMultipartStream(
  stream: NodeJS.ReadableStream,
  prepareSources: () => void,
): void {
  multipartStreams.set(stream, prepareSources);
}

export function registerPendingBodyErrorSources(
  body: object,
  sources: NodeJS.ReadableStream[],
): void {
  pendingErrorSources.set(body, [...new Set(sources)]);
}

export function observeBodyStreamErrors(
  body: unknown,
  onError: (error: Error) => void,
): (() => void) | undefined {
  if (!body || typeof body !== "object" || !("pipe" in body) || typeof body.pipe !== "function") {
    return undefined;
  }
  const source = body as NodeJS.ReadableStream;
  source.on("error", onError);
  return () => {
    source.removeListener("error", onError);
  };
}

export function observePendingBodyErrors(
  body: unknown,
  onError: (error: Error) => void,
): (() => void) | undefined {
  if ((typeof body !== "object" || body === null) && typeof body !== "function") {
    return undefined;
  }
  const sources = pendingErrorSources.get(body);
  if (!sources?.length) return undefined;
  for (const source of sources) source.on("error", onError);
  return () => {
    for (const source of sources) source.removeListener("error", onError);
  };
}

export function assertBodyStreamAvailable(stream: NodeJS.ReadableStream): void {
  if (
    startedSources.has(stream) ||
    Readable.isDisturbed(stream) ||
    !stream.readable ||
    ("destroyed" in stream && stream.destroyed === true) ||
    ("readableEnded" in stream && stream.readableEnded === true) ||
    ("closed" in stream && stream.closed === true)
  ) {
    throw new RestError(
      "Cannot resend an already-started request body stream. Use a factory returning a fresh stream.",
      { code: "REQUEST_BODY_NOT_REPLAYABLE" },
    );
  }
}

export function startBodyStream(stream: NodeJS.ReadableStream): void {
  assertBodyStreamAvailable(stream);
  startedSources.add(stream);
  multipartStreams.get(stream)?.();
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
