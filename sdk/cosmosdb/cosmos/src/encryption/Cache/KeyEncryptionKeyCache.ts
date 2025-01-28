// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionKeyStoreProvider } from "../EncryptionKeyStoreProvider";
import { KeyEncryptionKey } from "../KeyEncryptionKey";

/**
 * The cache used to store the key encryption keys.
 * see {@link KeyEncryptionKey}
 * @hidden
 */
export class KeyEncryptionKeyCache {
  // key is JSON.stringify([name, path])
  public cache: Map<string, KeyEncryptionKey>;

  constructor() {
    this.cache = new Map<string, KeyEncryptionKey>();
  }

  public getOrCreate(
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
    return this.cache.get(key);
  }
  private set(key: string, keyEncryptionKey: KeyEncryptionKey): void {
    this.cache.set(key, keyEncryptionKey);
  }
}
