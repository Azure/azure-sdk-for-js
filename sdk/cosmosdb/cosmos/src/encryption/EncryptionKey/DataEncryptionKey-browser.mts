// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export abstract class DataEncryptionKey {
  public encryptionKeyBuffer!: Buffer;
  public macKeyBuffer!: Buffer;
  public ivKeyBuffer!: Buffer;
  public name!: string;

  constructor(_rootKey: Buffer, _name: string) {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export function createHmac(_algorithm: string, _key: Buffer): Promise<Buffer> {
  throw new Error("Client-side hmac generator not supported in browser environment");
}
