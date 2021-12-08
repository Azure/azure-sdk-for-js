// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Gets the schema definition from the response
 * @param response - The service response for a get schema by ID request.
 * @returns a string representing an Avro schema definition
 */
export async function getSchemaDefinition<
  T extends {
    blobBody?: Promise<Blob>;
    readableStreamBody?: NodeJS.ReadableStream;
  }
>(response: T): Promise<string> {
  return blobToString(await response.blobBody!);
}

async function blobToString(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject;
    reader.readAsText(blob);
  });
}
