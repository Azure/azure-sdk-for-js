// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { RestError } from "@azure/core-rest-pipeline";
import { wrapError } from "./util.js";

export async function getStream<TResponse>(
  response: StreamableMethod<TResponse>,
): Promise<NodeJS.ReadableStream> {
  const { body, status } = await response.asNodeStream();
  if (status !== "200" && body !== undefined) {
    const text = await streamToText(body);
    throw wrapError(() => JSON.parse(text).error, "Error parsing response body");
  }

  if (!body) throw new Error("No stream found in response. Did you enable the stream option?");
  return body;
}

function streamToText(stream: NodeJS.ReadableStream): Promise<string> {
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
    stream.on("error", (e) => {
      if (e && e?.name === "AbortError") {
        reject(e);
      } else {
        reject(
          new RestError(`Error reading response as text: ${e.message}`, {
            code: RestError.PARSE_ERROR,
          }),
        );
      }
    });
  });
}
