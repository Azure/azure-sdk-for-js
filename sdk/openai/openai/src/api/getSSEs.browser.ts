// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { wrapError } from "./util.js";
import { streamToText } from "./readableStreamUtils.js";

export async function getStream<TResponse>(
  response: StreamableMethod<TResponse>,
): Promise<ReadableStream<Uint8Array>> {
  const { body, status } = await response.asBrowserStream();
  if (status !== "200" && body !== undefined) {
    const text = await streamToText(body);
    throw wrapError(() => JSON.parse(text).error, "Error parsing response body");
  }

  if (!body) throw new Error("No stream found in response. Did you enable the stream option?");
  return body;
}
