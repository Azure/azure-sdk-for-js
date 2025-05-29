"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEncryptionKey = void 0;
const KeyEncryptionAlgorithm_js_1 = require("./enums/KeyEncryptionAlgorithm.js");
/**
 * A wrapper class containing the info about the key-protecting key stored in an external key provider
 * and provides interface to wrap and unwrap the key.
 */
class KeyEncryptionKey {
    constructor(name, path, keyStoreProvider) {
        this.name = name;
        this.path = path;
        this.keyStoreProvider = keyStoreProvider;
        this.encryptionAlgorithm = KeyEncryptionAlgorithm_js_1.KeyEncryptionAlgorithm.RSA_OAEP;
    }
    async wrapEncryptionKey(plainTextEncryptionKey) {
        return this.keyStoreProvider.wrapKey(this.path, this.encryptionAlgorithm, plainTextEncryptionKey);
    }
    async unwrapEncryptionKey(wrappedEncryptionKey) {
        return this.keyStoreProvider.unwrapKey(this.path, this.encryptionAlgorithm, wrappedEncryptionKey);
    }
}
exports.KeyEncryptionKey = KeyEncryptionKey;
//# sourceMappingURL=KeyEncryptionKey.js.map