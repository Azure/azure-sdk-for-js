// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyEncryptionKey } from "../KeyEncryptionKey";

export class KeyEncryptionKeyCache {
  private static instance: KeyEncryptionKeyCache;
  // key is JSON.stringify([name, path])
  private keyEncryptionKeyCache: Map<string, KeyEncryptionKey>;

  private constructor() {
    this.keyEncryptionKeyCache = new Map<string, KeyEncryptionKey>();
  }

  public static getInstance(): KeyEncryptionKeyCache {
    if (!KeyEncryptionKeyCache.instance) {
      KeyEncryptionKeyCache.instance = new KeyEncryptionKeyCache();
    }
    return KeyEncryptionKeyCache.instance;
  }

  public getKeyEncryptionKey(key: string): KeyEncryptionKey | undefined {
    return this.keyEncryptionKeyCache.get(key);
  }
  public setKeyEncryptionKey(key: string, keyEncryptionKey: KeyEncryptionKey): void {
    this.keyEncryptionKeyCache.set(key, keyEncryptionKey);
  }
  public clearCache(): void {
    this.keyEncryptionKeyCache.clear();
  }
}
