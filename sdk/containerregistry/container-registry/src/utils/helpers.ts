// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Extract the path part from the next link value returned by the service,
 * @internal
 */
export function extractNextLink(value: string | undefined): string | undefined {
  // The link value has this pattern
  //     `</acr/v1/name/...&n=2&orderby=>; rel="next"`
  // and we only want the part inside of <...>
  return value?.substr(1, value.indexOf(">") - 1);
}

/**
 * Checks whether a string is a digest
 * @internal
 */
export function isDigest(tagOrDigest: string): boolean {
  return tagOrDigest.includes(":");
}

export async function readStreamToEnd(
  stream: NodeJS.ReadableStream,
  maxLength?: number,
): Promise<Buffer> {
  const buffers: Buffer[] = [];
  let bytesRead = 0;

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      buffers.push(chunk);
      bytesRead += chunk.length;

      if (maxLength && bytesRead > maxLength) {
        reject(new Error(`Stream exceeded maximum allowed length of ${maxLength} bytes.`));
      }
    });
    stream.on("end", () => resolve(Buffer.concat(buffers)));
    stream.on("error", (err) => reject(err));
  });
}

export async function* readChunksFromStream(
  stream: NodeJS.ReadableStream,
  chunkSize: number,
): AsyncGenerator<Buffer> {
  let chunk = Buffer.alloc(chunkSize);
  let chunkCursor = 0;

  for await (const data of stream) {
    const dataAsBuffer = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
    let dataCursor = 0;

    while (dataCursor < dataAsBuffer.length) {
      const bytesCopied = dataAsBuffer.copy(chunk, chunkCursor, dataCursor);
      dataCursor += bytesCopied;
      chunkCursor += bytesCopied;
      if (chunkCursor >= chunkSize) {
        yield chunk;
        chunkCursor = 0;
        chunk = Buffer.alloc(chunkSize);
      }
    }
  }

  if (chunkCursor > 0) {
    yield chunk.subarray(0, chunkCursor);
  }
}
