// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { IncomingMessage } from "http";
import { Message } from "cloudevents";

function isJsonObject(obj: any): boolean {
  return obj && typeof obj === "object" && !Array.isArray(obj);
}

export function toBase64JsonString(obj: Record<string, any>): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64");
}

export function fromBase64JsonString(base64String: string): Record<string, any> {
  if (base64String === undefined) {
    return {};
  }

  try {
    const buf = Buffer.from(base64String, "base64").toString();
    const parsed = JSON.parse(buf);
    return isJsonObject(parsed) ? parsed : {};
  } catch (e) {
    console.warn("Unexpected state format:" + e);
    return {};
  }
}

export function getHttpHeader(req: IncomingMessage, key: string): string | undefined {
  const value = req.headers[key];
  if (value === undefined) {
    return undefined;
  }

  if (typeof value === "string") {
    return value;
  }

  return value[0];
}

export async function convertHttpToEvent(request: IncomingMessage): Promise<Message> {
  const normalized: Message = {
    headers: {},
    body: ""
  };
  if (request.headers) {
    for (const key in request.headers) {
      if (Object.prototype.hasOwnProperty.call(request.headers, key)) {
        const element = request.headers[key];
        if (element !== undefined) {
          normalized.headers[key.toLowerCase()] = element;
        }
      }
    }
  }

  normalized.body = await readRequestBody(request);
  return normalized;
}

export function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise(function(resolve, reject) {
    const chunks: any = [];
    req.on("data", function(chunk) {
      chunks.push(chunk);
    });
    req.on("end", function() {
      const buffer = Buffer.concat(chunks);
      resolve(buffer.toString());
    });
    // reject on request error
    req.on("error", function(err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });
  });
}
