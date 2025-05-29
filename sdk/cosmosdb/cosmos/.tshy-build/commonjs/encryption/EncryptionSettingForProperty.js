"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionSettingForProperty = void 0;
const index_js_1 = require("./AeadAes256CbcHmacSha256Algorithm/index.js");
/**
 * Represents the encryption setting for a specific property in an item.
 * @hidden
 */
class EncryptionSettingForProperty {
    constructor(clientEncryptionIncludedPath) {
        this.encryptionKeyId = clientEncryptionIncludedPath.clientEncryptionKeyId;
        this.encryptionType = clientEncryptionIncludedPath.encryptionType;
        this.encryptionAlgorithm = clientEncryptionIncludedPath.encryptionAlgorithm;
    }
    async buildEncryptionAlgorithm(clientEncryptionKeyProperties, encryptionManager, forceRefresh) {
        const protectedDataEncryptionKey = await this.buildProtectedDataEncryptionKey(clientEncryptionKeyProperties, encryptionManager, forceRefresh);
        const encryptionAlgorithm = new index_js_1.AeadAes256CbcHmacSha256Algorithm(protectedDataEncryptionKey, this.encryptionType);
        return encryptionAlgorithm;
    }
    async buildProtectedDataEncryptionKey(clientEncryptionKeyProperties, encryptionManager, forceRefresh) {
        const keyEncryptionKey = encryptionManager.keyEncryptionKeyCache.getOrCreate(clientEncryptionKeyProperties.encryptionKeyWrapMetadata.name, clientEncryptionKeyProperties.encryptionKeyWrapMetadata.value, encryptionManager.encryptionKeyStoreProvider);
        const protectedDataEncryptionKey = await encryptionManager.protectedDataEncryptionKeyCache.getOrCreate(this.encryptionKeyId, keyEncryptionKey, clientEncryptionKeyProperties.wrappedDataEncryptionKey, forceRefresh);
        return protectedDataEncryptionKey;
    }
}
exports.EncryptionSettingForProperty = EncryptionSettingForProperty;
//# sourceMappingURL=EncryptionSettingForProperty.js.map