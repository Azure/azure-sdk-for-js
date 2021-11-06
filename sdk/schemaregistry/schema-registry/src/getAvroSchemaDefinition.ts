// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Gets the schema definition from the response
 * @param response - The service response for a get schema by ID request.
 * @returns a string representing an Avro schema definition
 */
export async function getAvroSchemaDefinition<
  T extends {
    blobBody?: Promise<Blob>;
    readableStreamBody?: NodeJS.ReadableStream;
  }
>(response: T): Promise<string> {
  return streamToString(response.readableStreamBody!);
}

function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise((resolve, reject) => {
    const buffer: Buffer[] = [];
    stream.on("data", (chunk) => {
      if (Buffer.isBuffer(chunk)) {
        buffer.push(chunk);
      } else {
        buffer.push(Buffer.from(chunk));
      }
    });
    stream.on("end", () => {
      resolve(Buffer.concat(buffer).toString("utf8"));
    });
    stream.on("error", (e) => {
      if (e && (e === null || e === void 0 ? void 0 : e.name) === "AbortError") {
        reject(e);
      } else {
        reject(new Error(`Error reading response as text: ${e.message}`));
      }
    });
  });
}
