// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientEncryptionKeyDefinition } from "./ClientEncryptionKeyDefinition";
import { EncryptionKeyWrapMetadata } from "../EncryptionKeyWrapMetadata";

export interface ClientEncryptionKeyRequest extends ClientEncryptionKeyDefinition {
  encryptionAlgorithm: string;
  keyWrapMetadata: EncryptionKeyWrapMetadata;
  wrappedDataEncryptionKey: string;
}
