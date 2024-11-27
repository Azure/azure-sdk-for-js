// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";
import * as stream from "stream";
import * as util from "util";
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
