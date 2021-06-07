// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// typed implementation of jwsDecode, copied from here: https://github.com/auth0/node-jws/blob/master/lib/verify-stream.js
/* eslint-disable */

import { Buffer } from "./Buffer";

export function decode(
  jwsSig: string,
  opts: {
    complete?: boolean;
    json?: boolean;
    encoding?: (this: any, key: string, value: any) => any;
  }
): {
  header: { alg: string; typ: string; jku: string };
  payload: string;
  signature: string;
} | null {
  opts = opts || {};
  jwsSig = toString(jwsSig);

  if (!isValidJws(jwsSig)) return null;

  var header = headerFromJWS(jwsSig);

  if (!header) return null;

  var payload = payloadFromJWS(jwsSig);
  if (header.typ === "JWT" || opts.json) payload = JSON.parse(payload, opts.encoding);

  return {
    header: header,
    payload: payload,
    signature: signatureFromJWS(jwsSig)
  };
}

function signatureFromJWS(jwsSig: string): string {
  return jwsSig.split(".")[2];
}

function payloadFromJWS(jwsSig: string, encoding?: string) {
  encoding = encoding || "utf8";
  var payload = jwsSig.split(".")[1];
  return Buffer.from(payload, "base64").toString(encoding);
}

function isValidJws(string: string) {
  return JWS_REGEX.test(string) && !!headerFromJWS(string);
}

function isObject(thing: any) {
  return Object.prototype.toString.call(thing) === "[object Object]";
}

function safeJsonParse(thing: any) {
  if (isObject(thing)) return thing;
  try {
    return JSON.parse(thing);
  } catch (e) {
    return undefined;
  }
}

function headerFromJWS(jwsSig: string) {
  var encodedHeader = jwsSig.split(".", 1)[0];
  return safeJsonParse(Buffer.from(encodedHeader, "base64").toString("binary"));
}

var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

function toString(obj: any) {
  if (typeof obj === "string") return obj;
  if (typeof obj === "number" || Buffer.isBuffer(obj)) return obj.toString();
  return JSON.stringify(obj);
}
