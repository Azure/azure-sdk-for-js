// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BodyPart, HttpHeaders, PipelineRequest, PipelineResponse } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { stringToUint8Array } from "../util/bytesEncoding.js";
import { isBlob } from "../util/typeGuards.js";
import { randomUUID } from "../util/uuidUtils.js";
import { concat } from "../util/concat.js";

function generateBoundary(): string {
  return `----AzSDKFormBoundary${randomUUID()}`;
}

function encodeHeaders(headers: HttpHeaders): string {
  let result = "";
  for (const [key, value] of headers) {
    result += `${key}: ${value}\r\n`;
  }
  return result;
}

function getLength(
  source:
    | (() => ReadableStream<Uint8Array>)
    | (() => NodeJS.ReadableStream)
    | Uint8Array
    | Blob
    | ReadableStream
    | NodeJS.ReadableStream,
): number | undefined {
  if (source instanceof Uint8Array) {
    return source.byteLength;
  } else if (isBlob(source)) {
    // if was created using createFile then -1 means we have an unknown size
    return source.size === -1 ? undefined : source.size;
  } else {
    return undefined;
  }
}

function getTotalLength(
  sources: (
    | (() => ReadableStream<Uint8Array>)
    | (() => NodeJS.ReadableStream)
    | Uint8Array
    | Blob
    | ReadableStream
    | NodeJS.ReadableStream
  )[],
): number | undefined {
  let total = 0;
  for (const source of sources) {
    const partLength = getLength(source);
    if (partLength === undefined) {
      return undefined;
    } else {
      total += partLength;
    }
  }
  return total;
}

async function buildRequestBody(
  request: PipelineRequest,
  parts: BodyPart[],
  boundary: string,
): Promise<void> {
  const sources = [
    stringToUint8Array(`--${boundary}`, "utf-8"),
    ...parts.flatMap((part) => [
      stringToUint8Array("\r\n", "utf-8"),
      stringToUint8Array(encodeHeaders(part.headers), "utf-8"),
      stringToUint8Array("\r\n", "utf-8"),
      part.body,
      stringToUint8Array(`\r\n--${boundary}`, "utf-8"),
    ]),
    stringToUint8Array("--\r\n\r\n", "utf-8"),
  ];

  const contentLength = getTotalLength(sources);
  if (contentLength) {
    request.headers.set("Content-Length", contentLength);
  }

  request.body = await concat(sources);
}

/**
 * Name of multipart policy
 */
export const multipartPolicyName = "multipartPolicy";

const maxBoundaryLength = 70;
const validBoundaryCharacters = new Set(
  `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?`,
);

function assertValidBoundary(boundary: string): void {
  if (boundary.length > maxBoundaryLength) {
    throw new Error(`Multipart boundary "${boundary}" exceeds maximum length of 70 characters`);
  }

  if (Array.from(boundary).some((x) => !validBoundaryCharacters.has(x))) {
    throw new Error(`Multipart boundary "${boundary}" contains invalid characters`);
  }
}

/**
 * Pipeline policy for multipart requests
 */
export function multipartPolicy(): PipelinePolicy {
  return {
    name: multipartPolicyName,
    async sendRequest(request, next): Promise<PipelineResponse> {
      if (!request.multipartBody) {
        return next(request);
      }

      if (request.body) {
        throw new Error("multipartBody and regular body cannot be set at the same time");
      }

      let boundary = request.multipartBody.boundary;

      const contentTypeHeader = request.headers.get("Content-Type") ?? "multipart/mixed";
      const parsedHeader = contentTypeHeader.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);
      if (!parsedHeader) {
        throw new Error(
          `Got multipart request body, but content-type header was not multipart: ${contentTypeHeader}`,
        );
      }

      const [, contentType, parsedBoundary] = parsedHeader;
      if (parsedBoundary && boundary && parsedBoundary !== boundary) {
        throw new Error(
          `Multipart boundary was specified as ${parsedBoundary} in the header, but got ${boundary} in the request body`,
        );
      }

      boundary ??= parsedBoundary;
      if (boundary) {
        assertValidBoundary(boundary);
      } else {
        boundary = generateBoundary();
      }
      request.headers.set("Content-Type", `${contentType}; boundary=${boundary}`);
      await buildRequestBody(request, request.multipartBody.parts, boundary);

      request.multipartBody = undefined;

      return next(request);
    },
  };
}
