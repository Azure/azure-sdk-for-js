// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Stream } from "stream";
import { HttpResponse, HttpNodeStreamResponse } from "../common";

export function getNodeStreamResponse(response: HttpResponse): HttpNodeStreamResponse {
  if (isStream(response.body)) {
    return response as HttpNodeStreamResponse;
  }

  // If this is not an stream body, we need to make it one
  const iterableBody = Array.isArray(response.body) ? response.body : [response.body];
  const streamBody: NodeJS.ReadableStream = Stream.Readable.from(iterableBody);
  return {
    ...response,
    body: streamBody,
  };
}

function isStream(body: any): body is NodeJS.ReadableStream {
  return Boolean(body && typeof body.pipe === "function");
}
