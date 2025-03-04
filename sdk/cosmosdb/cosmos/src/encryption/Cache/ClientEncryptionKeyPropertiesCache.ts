// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientEncryptionKeyProperties } from "../ClientEncryptionKey";

/**
 * The cache used to store the properties of the client encryption key
 * see {@link ClientEncryptionKeyProperties}
 * @hidden
 */

export class ClientEncryptionKeyPropertiesCache {
  // key is database rid + '/'+ clientEncryptionKeyId
  private clientEncryptionKeyPropertiesCache: Map<string, ClientEncryptionKeyProperties>;

  public constructor() {
    this.clientEncryptionKeyPropertiesCache = new Map<string, ClientEncryptionKeyProperties>();
  }

  public get(key: string): ClientEncryptionKeyProperties | undefined {
    return this.clientEncryptionKeyPropertiesCache.get(key);
  }
  public set(key: string, clientEncryptionKeyProperties: ClientEncryptionKeyProperties): void {
    this.clientEncryptionKeyPropertiesCache.set(key, clientEncryptionKeyProperties);
  }
}
