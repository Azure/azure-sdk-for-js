// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AeadAes256CbcHmacSha256Algorithm } from "./AeadAes256CbcHmacSha256Algorithm/index.js";
/**
 * Represents the encryption setting for a specific property in an item.
 * @hidden
 */
export class EncryptionSettingForProperty {
    constructor(clientEncryptionIncludedPath) {
        this.encryptionKeyId = clientEncryptionIncludedPath.clientEncryptionKeyId;
        this.encryptionType = clientEncryptionIncludedPath.encryptionType;
        this.encryptionAlgorithm = clientEncryptionIncludedPath.encryptionAlgorithm;
    }
    async buildEncryptionAlgorithm(clientEncryptionKeyProperties, encryptionManager, forceRefresh) {
        const protectedDataEncryptionKey = await this.buildProtectedDataEncryptionKey(clientEncryptionKeyProperties, encryptionManager, forceRefresh);
        const encryptionAlgorithm = new AeadAes256CbcHmacSha256Algorithm(protectedDataEncryptionKey, this.encryptionType);
        return encryptionAlgorithm;
    }
    async buildProtectedDataEncryptionKey(clientEncryptionKeyProperties, encryptionManager, forceRefresh) {
        const keyEncryptionKey = encryptionManager.keyEncryptionKeyCache.getOrCreate(clientEncryptionKeyProperties.encryptionKeyWrapMetadata.name, clientEncryptionKeyProperties.encryptionKeyWrapMetadata.value, encryptionManager.encryptionKeyStoreProvider);
        const protectedDataEncryptionKey = await encryptionManager.protectedDataEncryptionKeyCache.getOrCreate(this.encryptionKeyId, keyEncryptionKey, clientEncryptionKeyProperties.wrappedDataEncryptionKey, forceRefresh);
        return protectedDataEncryptionKey;
    }
}
//# sourceMappingURL=EncryptionSettingForProperty.js.map