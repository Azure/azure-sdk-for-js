// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { isStreamDebug } from "../../../utils/injectables.js";

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Read body from downloading operation methods to string.
 * Node.js-specific version that handles readable streams.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, optional limit for bytes to read
 */
export async function bodyToString(
  { readableStreamBody }: { readableStreamBody?: NodeJS.ReadableStream },
  length?: number,
): Promise<string> {
  if (readableStreamBody) {
    const stream = readableStreamBody;
    return new Promise<string>((resolve, reject) => {
      function cleanup(): void {
        stream.removeListener("error", onError);
        stream.removeListener("end", onEnd);
        stream.removeListener("readable", onReadable);
      }
      function onError(err: unknown): void {
        cleanup();
        reject(err);
      }
      function onEnd(): void {
        cleanup();
        resolve("");
      }
      function onReadable(): void {
        const chunk = stream.read(length);
        if (chunk !== null) {
          cleanup();
          resolve(chunk.toString());
        }
      }
      stream.on("error", onError);
      stream.on("end", onEnd);
      stream.on("readable", onReadable);
      // Try immediate read in case data is already buffered
      onReadable();
    });
  }

  throw new Error("Unable to extract body: readableStreamBody is required in Node.js environment");
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates a random local file and returns its path.
 */
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
): Promise<string> {
  const filePath = path.join(
    folder,
    `randomfile_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  );

  return new Promise<string>((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    let writtenBlocks = 0;

    function writeNextBlock(): void {
      if (writtenBlocks >= blockNumber) {
        ws.end();
        return;
      }

      const data = randomBytes(blockSize);
      if (!ws.write(data)) {
        ws.once("drain", writeNextBlock);
      } else {
        writtenBlocks++;
        setImmediate(writeNextBlock);
      }
      writtenBlocks++;
    }

    ws.on("finish", () => resolve(filePath));
    ws.on("error", reject);

    writeNextBlock();
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file. Returns a Promise which is completed after the file handle is closed.
 * If Promise is rejected, the reason will be set to the first error raised by either the
 * ReadableStream or the fs.WriteStream.
 */
export async function readStreamToLocalFileWithLogs(
  rs: NodeJS.ReadableStream,
  file: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const ws = fs.createWriteStream(file);

    // Set STREAM_DEBUG env var to log stream events while running tests
    if (isStreamDebug()) {
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

    let error: Error;

    rs.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }

      // When rs.error is raised, rs.end will never be raised automatically, so it must be raised manually
      // to ensure ws.close is eventually raised.
      rs.emit("end");
    });

    ws.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }
    });

    ws.on("close", () => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    rs.pipe(ws);
  });
}

/**
 * Extracts the signature from a SAS URL.
 */
export function getSignatureFromSasUrl(sasUrl: string): string {
  const url = new URL(sasUrl);
  const sig = url.searchParams.get("sig");
  return sig ?? "";
}
