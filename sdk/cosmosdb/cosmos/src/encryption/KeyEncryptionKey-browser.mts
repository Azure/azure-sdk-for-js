// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyStoreProvider } from "#platform/encryption/EncryptionKeyStoreProvider";

/**
 * Client-side Encryption not supported in browser environment.
 */
export class KeyEncryptionKey {
  public name: string;
  public path: string;
  public keyStoreProvider: EncryptionKeyStoreProvider;

  constructor(name: string, path: string, keyStoreProvider: EncryptionKeyStoreProvider) {
    this.name = name;
    this.path = path;
    this.keyStoreProvider = keyStoreProvider;
  }

  public async wrapEncryptionKey(_plainTextEncryptionKey: Uint8Array): Promise<Uint8Array> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }

  public async unwrapEncryptionKey(_wrappedEncryptionKey: Uint8Array): Promise<Uint8Array> {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}
