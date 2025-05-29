// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DataEncryptionKey } from "./DataEncryptionKey.js";
/**
 * A wrapper class around `DataEncryptionKey` that stores it in a protected form.
 * The `ProtectedDataEncryptionKey` class extends `DataEncryptionKey` and holds both the raw key and its encrypted form.
 * It also includes information about the `KeyEncryptionKey` used to encrypt the data encryption key.
 * @hidden
 */
export class ProtectedDataEncryptionKey extends DataEncryptionKey {
    constructor(name, keyEncryptionKey, rawKey, encryptedKey) {
        super(rawKey, name);
        this.name = name;
        this.keyEncryptionKey = keyEncryptionKey;
        this.encryptedValue = encryptedKey;
    }
}
//# sourceMappingURL=ProtectedDataEncryptionKey.js.map