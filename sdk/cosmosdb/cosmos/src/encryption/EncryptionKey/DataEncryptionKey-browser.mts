// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export abstract class DataEncryptionKey {
  public encryptionKeyBuffer!: Uint8Array;
  public macKeyBuffer!: Uint8Array;
  public ivKeyBuffer!: Uint8Array;
  public name!: string;

  constructor(_rootKey: Uint8Array, _name: string) {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export function createHmac(_algorithm: string, _key: Uint8Array): Promise<Uint8Array> {
  throw new Error("Client-side hmac generator not supported in browser environment");
}
