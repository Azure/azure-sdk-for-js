// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID, stringToUint8Array } from "@azure/core-util";
import {
  BodyPart,
  HttpHeaders,
  MultipartRequestBody,
  PipelineRequest,
  RequestBodyType,
} from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { concatenateStreams, isReadableStream, toStream } from "../util/stream";

export const multipartPolicyName = "multipartPolicy";

function generateBoundary(): string {
  return `----AzSDKFormBoundary${randomUUID()}`;
}

function encodeHeaders(headers: HttpHeaders): string {
  return [...headers].map(([name, value]) => `${name}: ${value}\r\n`).join("");
}

function calculateTotalLength(
  sources: (ReadableStream | NodeJS.ReadableStream | Uint8Array | Blob)[]
): number | undefined {
  let length = 0;

  for (const source of sources) {
    if (isReadableStream(sources)) {
      // cannot get length of a stream
      return undefined;
    } else if (typeof (source as Blob).size === "number") {
      length += (source as Blob).size;
    } else if (typeof (source as Uint8Array).byteLength === "number") {
      length += (source as Uint8Array).byteLength;
    }
  }

  return length;
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

  request.body = concatenateStreams(sources.map(toStream));
  const contentLength = calculateTotalLength(sources);
  if (contentLength) {
    request.headers.set("Content-Length", contentLength);
  }
}

export function isMultipartRequestBody(
  body: RequestBodyType | undefined
): body is MultipartRequestBody {
  return Boolean(body && Array.isArray((body as MultipartRequestBody).parts));
}

export function multipartPolicy(): PipelinePolicy {
  return {
    name: multipartPolicyName,
    sendRequest(request, next) {
      if (!isMultipartRequestBody(request.body)) {
        return next(request);
      }

      let boundary = request.body.boundary;

      const contentTypeHeader = request.headers.get("Content-Type");
      if (contentTypeHeader) {
        const parsedHeader = contentTypeHeader.match(/^(multipart\/[^ ;]+)(?:; *boundary=(.+))?$/);
        if (!parsedHeader) {
          throw new Error(
            `Got multipart request body, but content-type header was not multipart: ${contentTypeHeader}`
          );
        }

        const parsedContentType = parsedHeader[1];
        const parsedBoundary = parsedHeader[2];

        if (parsedBoundary) {
          if (boundary && boundary !== parsedBoundary) {
            throw new Error(
              `Multipart boundary was specified as ${parsedBoundary} in the header, but got ${boundary} in the request body`
            );
          } else {
            boundary = parsedBoundary;
          }
        } else {
          boundary ??= generateBoundary();
          request.headers.set("Content-Type", `${parsedContentType}; boundary=${boundary}`);
        }
      } else {
        boundary ??= generateBoundary();
        request.headers.set("Content-Type", `multipart/mixed; boundary=${boundary}`);
      }

      buildRequestBody(request, request.body.parts, boundary);
      return next(request);
    },
  };
}
