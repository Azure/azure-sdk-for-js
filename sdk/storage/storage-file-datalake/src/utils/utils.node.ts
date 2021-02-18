// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs";
import * as util from "util";
import { isNode } from "@azure/core-http";

/**
 * Reads a readable stream into buffer. Fill the buffer from offset to end.
 *
 * @export
 * @param stream - A Node.js Readable stream
 * @param buffer - Buffer to be filled, length must >= offset
 * @param offset - From which position in the buffer to be filled, inclusive
 * @param end - To which position in the buffer to be filled, exclusive
 * @param encoding - Encoding of the Readable stream
 *
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
 * Reads a readable stream into buffer entirely.
 *
 * @export
 * @param stream - A Node.js Readable stream
 * @param buffer - Buffer to be filled, length must >= offset
 * @param encoding - Encoding of the Readable stream
 * @returns with the count of bytes read.
 * @throws {RangeError} If buffer size is not big enough.
 */
export async function streamToBuffer2(
  stream: NodeJS.ReadableStream,
  buffer: Buffer,
  encoding?: string
): Promise<number> {
  let pos = 0; // Position in stream
  const bufferSize = buffer.length;

  return new Promise<number>((resolve, reject) => {
    stream.on("readable", () => {
      let chunk = stream.read();
      if (!chunk) {
        return;
      }
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk, encoding);
      }

      if (pos + chunk.length > bufferSize) {
        reject(new Error(`Stream exceeds buffer size. Buffer size: ${bufferSize}`));
        return;
      }

      buffer.fill(chunk, pos, pos + chunk.length);
      pos += chunk.length;
    });

    stream.on("end", () => {
      resolve(pos);
    });

    stream.on("error", reject);
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Promisified version of fs.stat().
 */
export const fsStat = util.promisify(isNode ? fs.stat : function stat() {});

export const fsCreateReadStream = fs.createReadStream;
