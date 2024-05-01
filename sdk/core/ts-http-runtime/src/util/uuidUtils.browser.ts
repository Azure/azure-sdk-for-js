// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUUID } from "./uuidUtils.native";

interface Crypto {
  randomUUID(): string;
}

declare const globalThis: {
  crypto: Crypto;
};

// NOTE: This could be undefined if not used in a secure context
const uuidFunction =
  typeof globalThis?.crypto?.randomUUID === "function"
    ? globalThis.crypto.randomUUID.bind(globalThis.crypto)
    : generateUUID;

/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 */
export function randomUUID(): string {
  return uuidFunction();
}
