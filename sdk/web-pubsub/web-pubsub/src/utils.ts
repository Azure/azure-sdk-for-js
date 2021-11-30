// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestBodyType } from "@azure/core-rest-pipeline";

function isRequestBody(obj: unknown): obj is RequestBodyType {
  return (
    typeof obj === "function" ||
    (typeof obj === "object" &&
      obj != null &&
      (obj.constructor.name === "ArrayBuffer" ||
        obj.constructor.name === "Blob" ||
        ArrayBuffer.isView(obj)))
  );
}

export interface TextPlainPayload {
  contentType: "text/plain";
  payload: string;
}

export interface JsonPayload {
  contentType: "application/json";
  payload: string;
}

export interface BinaryPayload {
  contentType: "application/octet-stream";
  payload: RequestBodyType;
}

export type Payload = TextPlainPayload | JsonPayload | BinaryPayload;

export function getPayloadForMessage(message: unknown, options: Record<string, any>): Payload {
  if (options?.contentType === "text/plain") {
    if (typeof message !== "string") {
      throw new TypeError("Message must be a string.");
    }
    return { contentType: "text/plain", payload: message };
  } else if (isRequestBody(message)) {
    return { contentType: "application/octet-stream", payload: message };
  } else {
    return { contentType: "application/json", payload: JSON.stringify(message) };
  }
}
