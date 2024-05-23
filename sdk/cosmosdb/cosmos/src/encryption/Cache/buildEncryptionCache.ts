// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ProtectedDataEncryptionKeyCache } from "./ProtectedDataEncryptionKeyCache";
import { KeyEncryptionKeyCache } from "./KeyEncryptionKeyCache";

let protectedDataEncryptionKeyCache: ProtectedDataEncryptionKeyCache;
let keyEncryptionKeyCache: KeyEncryptionKeyCache;

export function buildCache(): void {
  protectedDataEncryptionKeyCache = new ProtectedDataEncryptionKeyCache();
  keyEncryptionKeyCache = new KeyEncryptionKeyCache();
}

export { protectedDataEncryptionKeyCache, keyEncryptionKeyCache };
