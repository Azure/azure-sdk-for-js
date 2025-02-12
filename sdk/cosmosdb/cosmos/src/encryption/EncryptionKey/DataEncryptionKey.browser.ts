// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class DataEncryptionKey {}

export function createHmac(_algorithm: string, _key: Buffer): Promise<Buffer> {
  throw new Error("Client-side hmac generator not supported in browser environment");
}
