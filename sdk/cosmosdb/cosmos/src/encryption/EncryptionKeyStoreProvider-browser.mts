// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @hidden
 * Client-side Encryption not supported in browser environment.
 */
export class EncryptionKeyStoreProvider {
  cacheRefresher!: ReturnType<typeof setTimeout>;
  unwrappedEncryptionKeyCache: Record<string, [Date, Uint8Array]> = {};

  constructor(_encryptionKeyResolver?: unknown, _cacheTtlInMs?: number) {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public async wrapKey(
    _encryptionKeyId: string,
    _algorithm: unknown,
    _key: Uint8Array,
  ): Promise<Uint8Array> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public async unwrapKey(
    _encryptionKeyId: string,
    _algorithm: unknown,
    _wrappedKey: Uint8Array,
  ): Promise<Uint8Array> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}
