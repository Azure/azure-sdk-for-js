// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpBrowserStreamResponse, HttpNodeStreamResponse } from "@azure-rest/core-client";

/**
 * Gets the schema definition from the response
 * @param response - The service response for a get schema by ID request.
 * @returns a string representing a schema definition
 */
export async function getSchemaDefinition<
  T extends {
    asNodeStream: () => Promise<HttpNodeStreamResponse>;
    asBrowserStream: () => Promise<HttpBrowserStreamResponse>;
  },
>(response: T): Promise<string> {
  return streamToString((await response.asNodeStream()).body!);
}

function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  return new Promise<string>((resolve, reject) => {
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
    stream.on("error", reject);
  });
}
