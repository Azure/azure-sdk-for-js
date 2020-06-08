// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const SIZE_ONE_MEGA = 1024 * 1024;

/**
 * Reads a readable stream into buffer entirely. NodeJS only.
 * The maximum allowed size is specified in {@link MAX_INPUT_DOCUMENT_SIZE}.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 * @returns {Promise<Buffer>} The resultant buffer.
 * @throws {Error} If buffer size is not big enough.
 */
export async function streamToBuffer(
  stream: NodeJS.ReadableStream,
  maxSize: number
): Promise<Buffer> {
  let pos = 0; // Position in stream
  let size = SIZE_ONE_MEGA;
  let buffer = Buffer.alloc(size);

  return new Promise<Buffer>((resolve, reject) => {
    stream.on("readable", () => {
      const chunk = stream.read();
      if (!chunk) {
        return;
      }
      const nextPos = pos + chunk.length;
      if (size < nextPos && nextPos <= maxSize) {
        // Keep doubling buffer until it is large enough or over max size
        const oldSize = size;
        while (size < nextPos && size * 2 < maxSize) {
          size *= 2;
        }

        if (nextPos < size && size < maxSize) {
          const newBuffer = Buffer.alloc(size - oldSize);
          buffer = Buffer.concat([buffer, newBuffer]);
        } else {
          const newBuffer = Buffer.alloc(maxSize - oldSize);
          size = maxSize;
          buffer = Buffer.concat([buffer, newBuffer]);
        }
      } else if (nextPos > maxSize) {
        reject(new Error(`Input stream exceeds maximum allowed size: ${maxSize}`));
        return;
      }

      buffer.fill(chunk, pos, nextPos);
      pos = nextPos;
    });

    stream.on("end", () => {
      resolve(buffer.slice(0, pos));
    });

    stream.on("error", reject);
  });
}

export function getFirstFourBytesFromBlob(_data: Blob): Promise<Uint8Array> {
  throw new Error("Blob is not supported in NodeJS environment");
}
