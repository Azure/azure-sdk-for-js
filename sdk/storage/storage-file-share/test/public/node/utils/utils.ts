// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Node-specific test utilities for file operations.
 */

import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

/**
 * Read body from downloading operation methods to string.
 * Node.js only.
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
      onReadable();
    });
  }

  throw new Error("Unable to extract body");
}

/**
 * Compare download response body with a Uint8Array.
 * Node.js only.
 */
export async function compareBodyWithUint8Array(
  { readableStreamBody }: { readableStreamBody?: NodeJS.ReadableStream },
  uint8Array: Uint8Array,
): Promise<boolean> {
  if (readableStreamBody) {
    const stream = readableStreamBody;
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on("error", reject);
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    });
    if (buffer.length !== uint8Array.length) {
      return false;
    }
    for (let i = 0; i < uint8Array.length; i++) {
      if (buffer[i] !== uint8Array[i]) {
        return false;
      }
    }
    return true;
  }
  throw new Error("Unable to extract body");
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Create a random temporary local file with specified size and random content.
 *
 * @param folder - The folder to create the file in.
 * @param blockNumber - Number of blocks to write.
 * @param blockSize - Size of each block in bytes.
 * @returns Path to the created file.
 */
export async function createRandomLocalFile(
  folder: string,
  blockNumber: number,
  blockSize: number,
): Promise<string> {
  const filePath = path.join(
    folder,
    `${Date.now()}_${Math.random().toString(36).substring(7)}.tmp`,
  );

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const ws = fs.createWriteStream(filePath);
    let i = 0;

    const writeNext = (): void => {
      let ok = true;
      while (i < blockNumber && ok) {
        const chunk = randomBytes(blockSize);
        if (i === blockNumber - 1) {
          ws.write(chunk, (err) => {
            if (err) {
              reject(err);
            } else {
              ws.end();
            }
          });
        } else {
          ok = ws.write(chunk);
        }
        i++;
      }
      if (i < blockNumber) {
        ws.once("drain", writeNext);
      }
    };

    ws.on("finish", () => resolve(filePath));
    ws.on("error", reject);

    writeNext();
  });
}

/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file.
 * Returns a Promise which is completed after the file handle is closed.
 *
 * @param rs - The read stream.
 * @param file - Destination file path.
 */
export async function readStreamToLocalFileWithLogs(
  rs: NodeJS.ReadableStream,
  file: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
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

    let error: Error;

    rs.on("error", (err: Error) => {
      // First error wins
      if (!error) {
        error = err;
      }
      // When rs.error is raised, rs.end will never be raised automatically
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
 * Extract signature from SAS URL.
 */
export function getSignatureFromSasUrl(sasUrl: string): string {
  const url = new URL(sasUrl);
  return url.searchParams.get("sig") ?? "";
}

/**
 * Parse JWT token payload.
 */
export function parseJwt(token: string): Record<string, string> {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  return JSON.parse(jsonPayload);
}
