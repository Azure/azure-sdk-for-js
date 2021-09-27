// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { IncomingMessage, RequestOptions } from "http";
import https from "https";
import http from "http";

/**
 * Returns the environment variable, throws an error if not defined.
 *
 * @export
 * @param {string} name
 */
export function getEnvVar(name: string) {
  const val = process.env[name];
  if (!val) {
    throw `Environment variable ${name} is not defined.`;
  }
  return val;
}

/**
 * Reads a readable stream. Doesn't save to a buffer.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 */
export async function drainStream(stream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    stream.on("data", () => {});
    stream.on("end", resolve);
    stream.on("error", reject);
  });
}
export async function makeRequest(
  uri: string,
  requestOptions: RequestOptions
): Promise<IncomingMessage> {
  console.log("make request", uri);
  return new Promise<IncomingMessage>((resolve, reject) => {
    let req: http.ClientRequest;
    if (uri.startsWith("https")) {
      console.log("inside if");
      req = https.request(
        uri,
        {
          ...requestOptions,
          agent: new https.Agent({ rejectUnauthorized: false, requestCert: true })
        },
        resolve
      );
    } else {
      req = http.request(uri, requestOptions, resolve);
    }
    req.once("error", reject);

    req.end();
  });
}

/**
 * Helper TypeGuard that checks if something is defined or not.
 * @param thing - Anything
 * @internal
 */
export function isDefined<T>(thing: T | undefined | null): thing is T {
  return typeof thing !== "undefined" && thing !== null;
}
