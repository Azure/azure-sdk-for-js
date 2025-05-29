// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KeyEncryptionAlgorithm } from "./enums/KeyEncryptionAlgorithm.js";
/**
 * A wrapper class containing the info about the key-protecting key stored in an external key provider
 * and provides interface to wrap and unwrap the key.
 */
export class KeyEncryptionKey {
    constructor(name, path, keyStoreProvider) {
        this.name = name;
        this.path = path;
        this.keyStoreProvider = keyStoreProvider;
        this.encryptionAlgorithm = KeyEncryptionAlgorithm.RSA_OAEP;
    }
    async wrapEncryptionKey(plainTextEncryptionKey) {
        return this.keyStoreProvider.wrapKey(this.path, this.encryptionAlgorithm, plainTextEncryptionKey);
    }
    async unwrapEncryptionKey(wrappedEncryptionKey) {
        return this.keyStoreProvider.unwrapKey(this.path, this.encryptionAlgorithm, wrappedEncryptionKey);
    }
}
//# sourceMappingURL=KeyEncryptionKey.js.map