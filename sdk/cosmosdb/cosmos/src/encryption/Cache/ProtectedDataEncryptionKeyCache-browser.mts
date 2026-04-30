// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyEncryptionKey } from "#platform/encryption/KeyEncryptionKey";
import type { ProtectedDataEncryptionKey } from "#platform/encryption/EncryptionKey/ProtectedDataEncryptionKey";

// TODO: add support for browser environment in phase 2
export class ProtectedDataEncryptionKeyCache {
  cacheRefresher: (() => void) | undefined;

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
