// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import * as util from "util";

/**
 * Reads a readable stream into buffer. Fill the buffer from offset to end.
 *
 * @param stream - A Node.js Readable stream
 * @param buffer - Buffer to be filled, length must greater than or equal to offset
 * @param offset - From which position in the buffer to be filled, inclusive
 * @param end - To which position in the buffer to be filled, exclusive
 * @param encoding - Encoding of the Readable stream
 */
export async function streamToBuffer(
  stream: NodeJS.ReadableStream,
  buffer: Buffer,
  offset: number,
  end: number,
  encoding?: string
): Promise<void> {
  let pos = 0; // Position in stream
  const count = end - offset; // Total amount of data needed in stream

  return new Promise<void>((resolve, reject) => {
    stream.on("readable", () => {
      if (pos >= count) {
        resolve();
        return;
      }

      let chunk = stream.read();
      if (!chunk) {
        return;
      }
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk, encoding);
      }

      // How much data needed in this chunk
      const chunkLength = pos + chunk.length > count ? count - pos : chunk.length;

      buffer.fill(chunk.slice(0, chunkLength), offset + pos, offset + pos + chunkLength);
      pos += chunkLength;
    });

    stream.on("end", () => {
      if (pos < count) {
        reject(
          new Error(
            `Stream drains before getting enough data needed. Data read: ${pos}, data need: ${count}`
          )
        );
      }
      resolve();
    });

    stream.on("error", reject);
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file. Returns a Promise which is completed after the file handle is closed.
 *
 * @param rs - The read stream.
 * @param file - Destination file path.
 */
export async function readStreamToLocalFile(
  rs: NodeJS.ReadableStream,
  file: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(file);

    rs.on("error", (err: Error) => {
      reject(err);
    });

    ws.on("error", (err: Error) => {
      reject(err);
    });

    ws.on("close", resolve);

    rs.pipe(ws);
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Promisified version of fs.stat().
 */
export const fsStat = util.promisify(fs.stat);

export const fsCreateReadStream = fs.createReadStream;
