// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyEncryptionKey } from "../KeyEncryptionKey.js";
import type { ProtectedDataEncryptionKey } from "../EncryptionKey/index.js";

// TODO: add support for browser environment in phase 2
export class ProtectedDataEncryptionKeyCache {
  cacheRefresher!: NodeJS.Timeout;

  constructor(_cacheTimeToLive: number) {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public async getOrCreate(
    _name: string,
    _keyEncryptionKey: KeyEncryptionKey,
    _encryptedValue?: Uint8Array,
    _forceRefresh?: boolean,
  ): Promise<ProtectedDataEncryptionKey> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export function randomBytes(_size: number): Promise<string> {
  throw new Error("Client-side random generator not supported in browser environment");
}
export function createHmac(_algorithm: string, _key: string): Promise<string> {
  throw new Error("Client-side random generator not supported in browser environment");
}
