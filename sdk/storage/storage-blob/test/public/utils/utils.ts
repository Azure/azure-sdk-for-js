// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Recorder } from "@azure-tools/test-recorder";
import { stringToUint8Array, uint8ArrayToString } from "@azure/core-util";

export function getUniqueName(prefix: string, options: { recorder?: Recorder } = {}): string {
  const uniqueName = `${prefix}${new Date().getTime()}${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "00000")}`;
  return options.recorder?.variable(prefix, uniqueName) ?? uniqueName;
}

type BlobMetadata = { [propertyName: string]: string };

/**
 * Validate if m1 is super set of m2.
 *
 * @param m1 - BlobMetadata
 * @param m2 - BlobMetadata
 */
export function isSuperSet(m1?: BlobMetadata, m2?: BlobMetadata): boolean {
  if (!m1 || !m2) {
    throw new RangeError("m1 or m2 is invalid");
  }

  for (const p in m2) {
    if (m1[p] !== m2[p]) {
      return false;
    }
  }

  return true;
}

/**
 * Generate a Uint8Array with specified byteLength and randome content.
 *
 * @param byteLength -
 */
export function generateRandomUint8Array(byteLength: number): Uint8Array {
  const uint8Arr = new Uint8Array(byteLength);
  for (let j = 0; j < byteLength; j++) {
    uint8Arr[j] = Math.floor(Math.random() * 256);
  }
  return uint8Arr;
}

export function base64encode(input: string): string {
  return uint8ArrayToString(stringToUint8Array(input, "utf-8"), "base64");
}

/**
 * Read body from downloading operation methods to string.
 * Works in both Node.js and browsers.
 *
 * @param response - Convenience layer methods response with downloaded body
 * @param length - Length of Readable stream, needed for Node.js environment
 */
export async function bodyToString(
  {
    blobBody,
    readableStreamBody,
  }: { blobBody?: Promise<Blob>; readableStreamBody?: NodeJS.ReadableStream },
  length?: number,
): Promise<string> {
  // Browser-style body (Blob)
  if (blobBody) {
    const blob = await blobBody;
    return blob.text();
  }

  // Node.js readable stream: inline minimal reader that optionally limits bytes
  if (readableStreamBody) {
    const stream = readableStreamBody;
    return new Promise<string>((resolve, reject) => {
      function cleanup(): void {
        stream.removeListener("error", onError);
        stream.removeListener("end", onEnd);
        stream.removeListener("readable", onReadable);
      }
      function onError(err: unknown): void {
        cleanup();
        reject(err);
      }
      function onEnd(): void {
        cleanup();
        resolve("");
      }
      function onReadable(): void {
        const chunk = stream.read(length);
        if (chunk !== null) {
          cleanup();
          resolve(chunk.toString());
        }
      }
      stream.on("error", onError);
      stream.on("end", onEnd);
      stream.on("readable", onReadable);
      // Try immediate read in case data is already buffered
      onReadable();
    });
  }

  throw new Error("Unable to extract body");
}

/**
 * Set URL parameter name and value. If name exists in URL parameters, old value
 * will be replaced by name key. If not provide value, the parameter will be deleted.
 *
 * @param url - Source URL string
 * @param name - Parameter name
 * @param value - Parameter value
 * @returns An updated URL string
 */
export function setURLParameter(url: string, name: string, value?: string): string {
  const urlParsed = new URL(url);
  const encodedName = encodeURIComponent(name);
  const encodedValue = value ? encodeURIComponent(value) : undefined;
  // mutating searchParams will change the encoding, so we have to do this ourselves
  const searchString = urlParsed.search === "" ? "?" : urlParsed.search;

  const searchPieces: string[] = [];

  for (const pair of searchString.slice(1).split("&")) {
    if (pair) {
      const [key] = pair.split("=", 2);
      if (key !== encodedName) {
        searchPieces.push(pair);
      }
    }
  }
  if (encodedValue) {
    searchPieces.push(`${encodedName}=${encodedValue}`);
  }

  urlParsed.search = searchPieces.length ? `?${searchPieces.join("&")}` : "";

  return urlParsed.toString();
}

/**
 * Escape the blobName but keep path separator ('/').
 */
export function EscapePath(blobName: string): string {
  const split = blobName.split("/");
  for (let i = 0; i < split.length; i++) {
    split[i] = encodeURIComponent(split[i]);
  }
  return split.join("/");
}

/**
 * Append a string to URL path. Will remove duplicated "/" in front of the string
 * when URL path ends with a "/".
 *
 * @param url - Source URL string
 * @param name - String to be appended to URL
 * @returns An updated URL string
 */
export function appendToURLPath(url: string, name: string): string {
  const urlParsed = new URL(url);

  let path = urlParsed.pathname;
  path = path ? (path.endsWith("/") ? `${path}${name}` : `${path}/${name}`) : name;
  urlParsed.pathname = path;

  return urlParsed.toString();
}

export function shouldRunObjectReplicationTests(): boolean {
  return false;
}
