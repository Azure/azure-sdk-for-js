// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface EncryptionKeyResolver {
  wrapKey(encryptionKeyId: string, algorithm: string, key: Buffer): Promise<Buffer>;
  unwrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Buffer): Promise<Buffer>;
}
