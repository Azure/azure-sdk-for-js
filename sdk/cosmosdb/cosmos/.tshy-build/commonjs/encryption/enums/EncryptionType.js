"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionType = void 0;
/**
 * The type of encryption to be performed.
 */
var EncryptionType;
(function (EncryptionType) {
    /** Deterministic type will always produce same encrypted value for same plaintext. */
    EncryptionType["DETERMINISTIC"] = "Deterministic";
    /** Randomized type will produce different encrypted value for same plaintext. */
    EncryptionType["RANDOMIZED"] = "Randomized";
})(EncryptionType || (exports.EncryptionType = EncryptionType = {}));
//# sourceMappingURL=EncryptionType.js.map