// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * The type of encryption to be performed.
 */
export var EncryptionType;
(function (EncryptionType) {
    /** Deterministic type will always produce same encrypted value for same plaintext. */
    EncryptionType["DETERMINISTIC"] = "Deterministic";
    /** Randomized type will produce different encrypted value for same plaintext. */
    EncryptionType["RANDOMIZED"] = "Randomized";
})(EncryptionType || (EncryptionType = {}));
//# sourceMappingURL=EncryptionType.js.map