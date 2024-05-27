// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EncryptionKeyStoreProvider } from "../EncryptionKeyStoreProvider";
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
    let keyEncryptionKey = this.getKeyEncryptionKey(key);
    if (!keyEncryptionKey) {
      keyEncryptionKey = new KeyEncryptionKey(name, path, keyStoreProvider);
      this.setKeyEncryptionKey(key, keyEncryptionKey);
    }
    return keyEncryptionKey;
  }

  private getKeyEncryptionKey(key: string): KeyEncryptionKey | undefined {
    return this.keyEncryptionKeyCache.get(key);
  }
  private setKeyEncryptionKey(key: string, keyEncryptionKey: KeyEncryptionKey): void {
    this.keyEncryptionKeyCache.set(key, keyEncryptionKey);
  }
}
