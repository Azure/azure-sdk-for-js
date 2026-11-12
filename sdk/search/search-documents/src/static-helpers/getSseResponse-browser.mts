// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PathUncheckedResponse, StreamableMethod } from "@azure-rest/core-client";

export type SseResponse = PathUncheckedResponse & {
  body?: ReadableStream<Uint8Array>;
};

export async function getSseResponse(streamableMethod: StreamableMethod): Promise<SseResponse> {
  return (await streamableMethod.asBrowserStream()) as SseResponse;
}

export async function cancelSseResponse(response: SseResponse): Promise<void> {
  await response.body?.cancel();
}

export async function parseSseErrorResponse(response: SseResponse): Promise<PathUncheckedResponse> {
  if (!response.body) {
    return response;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let body = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  return {
    ...response,
    body: body.length > 0 ? parseErrorBody(body, getContentType(response.headers)) : undefined,
  } as PathUncheckedResponse;
}

function parseErrorBody(body: string, contentType: string | undefined): unknown {
  const mediaType = contentType?.split(";", 1)[0].trim().toLowerCase();
  if (mediaType?.endsWith("/json") || mediaType?.endsWith("+json")) {
    try {
      return JSON.parse(body);
    } catch {
      return body;
    }
  }

  return body;
}

function getContentType(headers: Record<string, string>): string | undefined {
  return Object.entries(headers).find(([name]) => name.toLowerCase() === "content-type")?.[1];
}
