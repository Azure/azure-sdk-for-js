// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { EncryptionKeyResolver } from "./EncryptionKeyResolver";
import { KeyClient } from "@azure/keyvault-keys";

export class AzureKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  private client: KeyClient;

  constructor(credentials: TokenCredential, url: string) {
    this.client = new KeyClient(url, credentials);
  }

  public async wrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer> {
    console.log(algorithm);
    const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
    const cryptographyClient = this.client.getCryptographyClient(keyName, {
      keyVersion: keyVersion,
    });
    const res = await cryptographyClient.wrapKey("RSA-OAEP", key);
    return Buffer.from(res.result);
  }

  public async unwrapKey(
    encryptionKeyId: string,
    algorithm: string,
    wrappedKey: Buffer,
  ): Promise<Buffer> {
    console.log(algorithm);
    const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
    const cryptographyClient = this.client.getCryptographyClient(keyName, {
      keyVersion: keyVersion ? keyVersion : "",
    });
    const res = await cryptographyClient.unwrapKey("RSA-OAEP", wrappedKey);
    return Buffer.from(res.result);
  }
  //TODO: improve this
  private getKeyDetails(encryptionKeyId: string): [string, string] {
    const url = new URL(encryptionKeyId);
    const parts = url.pathname.split("/");
    if (parts.length === 4 || parts.length === 5) {
      return [parts[2], parts[3]];
    }
    if (parts.length === 3) {
      return [parts[2], undefined];
    }
    return [undefined, undefined];
  }
}
