// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionKeyProperties } from "../ClientEncryptionKey";

/**
 * The cache used to store the properties of the client encryption key
 * @hidden
 */

export class ClientEncryptionKeyPropertiesCache {
  // key is database rid + '/'+ clientEncryptionKeyId
  private clientEncryptionKeyPropertiesCache: Map<string, ClientEncryptionKeyProperties>;

  public constructor() {
    this.clientEncryptionKeyPropertiesCache = new Map<string, ClientEncryptionKeyProperties>();
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
