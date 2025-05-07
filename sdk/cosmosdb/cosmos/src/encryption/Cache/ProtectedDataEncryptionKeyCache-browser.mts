// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// TODO: add support for browser environment in phase 2
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ProtectedDataEncryptionKeyCache {
  constructor(_cacheTimeToLive: number) {
    throw new Error("Client-side Encryption not supported in browser environment");
  }
}

export function randomBytes(_size: number): Promise<string> {
  throw new Error("Client-side random generator not supported in browser environment");
}
export function createHmac(_algorithm: string, _key: string): Promise<string> {
  throw new Error("Client-side random generator not supported in browser environment");
}
