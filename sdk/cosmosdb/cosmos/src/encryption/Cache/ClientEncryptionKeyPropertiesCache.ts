// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionKeyProperties } from "../ClientEncryptionKey";

/**
 * The cache used to store the properties of the client encryption key
 * @hidden
 */

export class ClientEncryptionKeyPropertiesCache {
  private static instance: ClientEncryptionKeyPropertiesCache;
  // key is database id + '/'+ clientEncryptionKeyId
  private clientEncryptionKeyPropertiesCache: Map<string, ClientEncryptionKeyProperties>;

  private constructor() {
    this.clientEncryptionKeyPropertiesCache = new Map<string, ClientEncryptionKeyProperties>();
  }

  public static getInstance(): ClientEncryptionKeyPropertiesCache {
    if (!ClientEncryptionKeyPropertiesCache.instance) {
      ClientEncryptionKeyPropertiesCache.instance = new ClientEncryptionKeyPropertiesCache();
    }
    return ClientEncryptionKeyPropertiesCache.instance;
  }

  public getClientEncryptionKeyProperties(key: string): ClientEncryptionKeyProperties | undefined {
    return this.clientEncryptionKeyPropertiesCache.get(key);
  }
  public setClientEncryptionKeyProperties(
    key: string,
    clientEncryptionKeyProperties: ClientEncryptionKeyProperties,
  ): void {
    this.clientEncryptionKeyPropertiesCache.set(key, clientEncryptionKeyProperties);
  }
}
