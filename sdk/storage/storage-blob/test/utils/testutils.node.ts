// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NodeJSReadableStream } from "@azure/storage-common";
import fs from "node:fs";
import stream, { Readable } from "node:stream";
import util from "node:util";
const pipeline = util.promisify(stream.pipeline);

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file. Returns a Promise which is completed after the file handle is closed.
 * If Promise is rejected, the reason will be set to the first error raised by either the
 * ReadableStream or the fs.WriteStream.
 *
 * @param rs - The read stream.
 * @param file - Destination file path.
 */
export async function readStreamToLocalFileWithLogs(
  rs: NodeJS.ReadableStream,
  file: string,
): Promise<void> {
  const ws = fs.createWriteStream(file);

  // Set STREAM_DEBUG env var to log stream events while running tests
  if (process.env.STREAM_DEBUG) {
    rs.on("close", () => console.log("rs.close"));
    rs.on("data", () => console.log("rs.data"));
    rs.on("end", () => console.log("rs.end"));
    rs.on("error", () => console.log("rs.error"));

    ws.on("close", () => console.log("ws.close"));
    ws.on("drain", () => console.log("ws.drain"));
    ws.on("error", () => console.log("ws.error"));
    ws.on("finish", () => console.log("ws.finish"));
    ws.on("pipe", () => console.log("ws.pipe"));
    ws.on("unpipe", () => console.log("ws.unpipe"));
  }

  return pipeline(rs, ws);
}

export class InjectorReadableStream extends Readable {
  private source: NodeJSReadableStream;
  public constructor(source: NodeJSReadableStream) {
    super();
    this.source = source;

    this.setSourceEventHandlers();
  }

  public _read(): void {
    this.source.resume();
  }

  private setSourceEventHandlers() {
    this.source.on("data", this.sourceDataHandler);
    this.source.on("end", this.sourceErrorOrEndHandler);
    this.source.on("error", this.sourceErrorOrEndHandler);
    // needed for Node14
    this.source.on("aborted", this.sourceAbortedHandler);
  }

  private removeSourceEventHandlers() {
    this.source.removeListener("data", this.sourceDataHandler);
    this.source.removeListener("end", this.sourceErrorOrEndHandler);
    this.source.removeListener("error", this.sourceErrorOrEndHandler);
    this.source.removeListener("aborted", this.sourceAbortedHandler);
  }

  private sourceDataHandler = (data: Buffer) => {
    if (!this.push(data)) {
      this.source.pause();
    }
  };

  private sourceAbortedHandler = () => {
    const abortError = new Error("The operation was aborted.");
    this.destroy(abortError);
  };

  private sourceErrorOrEndHandler = (err?: Error) => {
    if (err && err.name === "AbortError") {
      this.destroy(err);
      return;
    }
    this.removeSourceEventHandlers();
    this.push(null);
  };

  _destroy(error: Error | null, callback: (error?: Error) => void): void {
    // remove listener from source and release source
    this.removeSourceEventHandlers();
    this.source.destroy();

    callback(error === null ? undefined : error);
  }
}
