"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedDataEncryptionKey = void 0;
const DataEncryptionKey_js_1 = require("./DataEncryptionKey.js");
/**
 * A wrapper class around `DataEncryptionKey` that stores it in a protected form.
 * The `ProtectedDataEncryptionKey` class extends `DataEncryptionKey` and holds both the raw key and its encrypted form.
 * It also includes information about the `KeyEncryptionKey` used to encrypt the data encryption key.
 * @hidden
 */
class ProtectedDataEncryptionKey extends DataEncryptionKey_js_1.DataEncryptionKey {
    constructor(name, keyEncryptionKey, rawKey, encryptedKey) {
        super(rawKey, name);
        this.name = name;
        this.keyEncryptionKey = keyEncryptionKey;
        this.encryptedValue = encryptedKey;
    }
}
exports.ProtectedDataEncryptionKey = ProtectedDataEncryptionKey;
//# sourceMappingURL=ProtectedDataEncryptionKey.js.map