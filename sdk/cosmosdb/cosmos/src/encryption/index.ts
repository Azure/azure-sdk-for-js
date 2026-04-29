// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export * from "./ClientEncryptionKey/index.js";
export * from "./enums/index.js";
export * from "./EncryptionKeyResolver/index.js";
export type { ClientEncryptionIncludedPath } from "./ClientEncryptionIncludedPath.js";
export type { ClientEncryptionPolicy } from "./ClientEncryptionPolicy.js";
export type { EncryptionKeyWrapMetadata } from "./EncryptionKeyWrapMetadata.js";
export { EncryptionKeyStoreProvider } from "#platform/encryption/EncryptionKeyStoreProvider";
export { EncryptionSettings } from "./EncryptionSettings.js";
export { KeyEncryptionKey } from "#platform/encryption/KeyEncryptionKey";
export { EncryptionSettingForProperty } from "./EncryptionSettingForProperty.js";
export { ProtectedDataEncryptionKey } from "./EncryptionKey/index.js";
export { EncryptionProcessor } from "#platform/encryption/EncryptionProcessor";
export { EncryptionQueryBuilder } from "./EncryptionQueryBuilder.js";
export type { ClientEncryptionOptions } from "./ClientEncryptionOptions.js";
export { type CosmosEncryptedNumber, CosmosEncryptedNumberType } from "./CosmosEncryptedNumber.js";
