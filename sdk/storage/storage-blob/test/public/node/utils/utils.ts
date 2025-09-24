// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { pipeline } from "node:stream/promises";
import { getUniqueName } from "../../utils/utils.js";

/**
 * Read body from downloading operation methods to string.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, needed for Node.js environment
 */
export async function bodyToString(
  response: {
    readableStreamBody?: NodeJS.ReadableStream;
  },
  length?: number,
): Promise<string> {
  const stream = response.readableStreamBody;
  if (!stream) {
    throw new Error("A response stream is expected but not found");
  }
  return new Promise<string>((resolve, reject) => {
    stream.on("readable", () => {
      const chunk = stream.read(length);
      if (chunk) {
        resolve(chunk.toString());
      }
    });

    stream.on("error", reject);
    stream.on("end", () => {
      resolve("");
    });
  });
}

export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockContent: Buffer,
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
): Promise<string>;

// Total file size = (blockNumber -1)*blockSize + lastBlockSize
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
  lastBlockSize: number,
): Promise<string>;
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSizeOrContent: number | Buffer,
  lastBlockSize: number = 0,
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const destFile = path.join(folder, getUniqueName("tempfile."));
    const ws = fs.createWriteStream(destFile);
    let offsetInMB = 0;

    function randomValueHex(blockIndex: number): string | Buffer<ArrayBufferLike> {
      if (typeof blockSizeOrContent !== "number") {
        return blockSizeOrContent;
      }

      let len = blockSizeOrContent;
      if (blockIndex === blockNumber && lastBlockSize !== 0) {
        len = lastBlockSize;
      }

      return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString("hex") // convert to hexadecimal format
        .slice(0, len); // return required number of characters
    }

    ws.on("open", () => {
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex(offsetInMB))) {
        /* empty */
      }
      if (offsetInMB >= blockNumber) {
        ws.end();
      }
    });

    ws.on("drain", () => {
      while (offsetInMB++ < blockNumber && ws.write(randomValueHex(offsetInMB))) {
        /* empty */
      }
      if (offsetInMB >= blockNumber) {
        ws.end();
      }
    });
    ws.on("finish", () => resolve(destFile));
    ws.on("error", reject);
  });
}

export async function createRandomLocalFileWithTotalSize(
  folder: string,
  totalSize: number,
  blockSize?: number,
): Promise<string> {
  const effectiveBlockSize =
    blockSize === undefined || isNaN(blockSize) || blockSize <= 0 ? 1024 * 1024 : blockSize;
  const blockNumber = Math.ceil(totalSize / effectiveBlockSize);
  const lastBlockSize = totalSize - (blockNumber - 1) * effectiveBlockSize;
  return createRandomLocalFile(folder, blockNumber, effectiveBlockSize, lastBlockSize);
}

export function getSignatureFromSasUrl(sasUrl: string): string {
  const url = new URL(sasUrl);
  const signature = url.searchParams.get("sig");
  return signature!;
}

// Mock a Browser file with specified name and size
export function getBrowserFile(name: string, size: number): File {
  const uint8Arr = new Uint8Array(size);
  for (let j = 0; j < size; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }

  return new File([uint8Arr], name);
}

export function arrayBufferEqual(buf1: ArrayBuffer, buf2: ArrayBuffer): boolean {
  if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }

  const uint8Arr1 = new Uint8Array(buf1);
  const uint8Arr2 = new Uint8Array(buf2);

  for (let i = 0; i < uint8Arr1.length; i++) {
    if (uint8Arr1[i] !== uint8Arr2[i]) {
      return false;
    }
  }

  return true;
}

/**
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

  await pipeline(rs, ws);
}
