// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID, stringToUint8Array } from "@azure/core-util";
import { BlobLike, BodyPart, HttpHeaders, PipelineRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { toStream, concatenateStreams } from "../util/stream";
import { isInMemoryBlob, isStreamableBlob } from "../util/typeGuards";

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
  source: Uint8Array | BlobLike | ReadableStream | NodeJS.ReadableStream
): number | undefined {
  if (source instanceof Uint8Array) {
    return source.byteLength;
  } else if (isStreamableBlob(source)) {
    return source.size;
  } else if (isInMemoryBlob(source)) {
    return source.content.byteLength;
  } else {
    return undefined;
  }
}

function getTotalLength(
  sources: (Uint8Array | BlobLike | ReadableStream | NodeJS.ReadableStream)[]
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

function buildRequestBody(request: PipelineRequest, parts: BodyPart[], boundary: string): void {
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

  request.body = concatenateStreams(sources.map(toStream));
}

/**
 * Name of multipart policy
 */
export const multipartPolicyName = "multipartPolicy";

const maxBoundaryLength = 70;
const validBoundaryCharacters = new Set(
  `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'()+,-./:=?`
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
    sendRequest(request, next) {
      if (!request.multipartBody) {
        return next(request);
      }

      if (request.body) {
        throw new Error("multipartBody and regular body cannot be set at the same time");
      }

      let boundary = request.multipartBody.boundary;

      let contentTypeHeader = request.headers.get("Content-Type") ?? "multipart/mixed";
      const parsedHeader = contentTypeHeader.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);
      if (!parsedHeader) {
        throw new Error(
          `Got multipart request body, but content-type header was not multipart: ${contentTypeHeader}`
        );
      }

      const [, contentType, parsedBoundary] = parsedHeader;
      if (parsedBoundary && boundary && parsedBoundary !== boundary) {
        throw new Error(
          `Multipart boundary was specified as ${parsedBoundary} in the header, but got ${boundary} in the request body`
        );
      }

      boundary ??= parsedBoundary ?? generateBoundary();
      assertValidBoundary(boundary);
      request.headers.set("Content-Type", `${contentType}; boundary=${boundary}`);
      buildRequestBody(request, request.multipartBody.parts, boundary);

      request.multipartBody = undefined;

      return next(request);
    },
  };
}
