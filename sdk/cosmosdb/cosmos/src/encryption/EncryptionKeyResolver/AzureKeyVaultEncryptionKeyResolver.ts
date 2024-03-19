// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { EncryptionKeyResolver } from "./EncryptionKeyResolver";
import { KeyClient, KeyWrapAlgorithm } from "@azure/keyvault-keys";

export class AzureKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
  private credentials: TokenCredential;

  constructor(credentials: TokenCredential) {
    this.credentials = credentials;
  }

  public async wrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer> {
    const origin = this.getOrigin(encryptionKeyId);
    const keyClient = new KeyClient(origin, this.credentials);
    const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
    const cryptographyClient = keyClient.getCryptographyClient(keyName, {
      keyVersion: keyVersion,
    });
    const res = await cryptographyClient.wrapKey(algorithm as KeyWrapAlgorithm, key);
    return Buffer.from(res.result);
  }

  public async unwrapKey(
    encryptionKeyId: string,
    algorithm: string,
    wrappedKey: Buffer,
  ): Promise<Buffer> {
    const origin = this.getOrigin(encryptionKeyId);
    const keyClient = new KeyClient(origin, this.credentials);
    const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
    const cryptographyClient = keyClient.getCryptographyClient(keyName, {
      keyVersion: keyVersion ? keyVersion : "",
    });
    const res = await cryptographyClient.unwrapKey(algorithm as KeyWrapAlgorithm, wrappedKey);
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

  private getOrigin(encryptionKeyId: string): string {
    const url = new URL(encryptionKeyId);
    return url.origin;
  }
}
