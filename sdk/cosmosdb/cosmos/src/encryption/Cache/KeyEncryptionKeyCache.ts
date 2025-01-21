// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyStoreProvider } from "../EncryptionKeyStoreProvider";
import { KeyEncryptionKey } from "../KeyEncryptionKey";

export class KeyEncryptionKeyCache {
  // key is JSON.stringify([name, path])
  public keyEncryptionKeyCache: Map<string, KeyEncryptionKey>;

  constructor() {
    this.keyEncryptionKeyCache = new Map<string, KeyEncryptionKey>();
  }

  public getOrCreateKeyEncryptionKey(
    name: string,
    path: string,
    keyStoreProvider: EncryptionKeyStoreProvider,
  ): KeyEncryptionKey {
    const key = JSON.stringify([name, path]);
    let keyEncryptionKey = this.get(key);
    if (!keyEncryptionKey) {
      keyEncryptionKey = new KeyEncryptionKey(name, path, keyStoreProvider);
      this.set(key, keyEncryptionKey);
    }
    return keyEncryptionKey;
  }

  private get(key: string): KeyEncryptionKey | undefined {
    return this.keyEncryptionKeyCache.get(key);
  }
  private set(key: string, keyEncryptionKey: KeyEncryptionKey): void {
    this.keyEncryptionKeyCache.set(key, keyEncryptionKey);
  }
}
