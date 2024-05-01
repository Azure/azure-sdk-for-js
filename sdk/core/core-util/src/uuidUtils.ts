// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomUUID as v4RandomUUID } from "crypto";
import { generateUUID } from "./uuidUtils.native";

interface Crypto {
  randomUUID(): string;
}

declare const globalThis: {
  crypto: Crypto;
};

// NOTE: This is a workaround until we can use `globalThis.crypto.randomUUID` in Node.js 19+.
let uuidFunction =
  typeof globalThis?.crypto?.randomUUID === "function"
    ? globalThis.crypto.randomUUID.bind(globalThis.crypto)
    : v4RandomUUID;

// Not defined in earlier versions of Node.js 14
if (!uuidFunction) {
  uuidFunction = generateUUID;
}

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */
export function randomUUID(): string {
  return uuidFunction();
}
