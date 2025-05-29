"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionAlgorithm = void 0;
/** Encryption Algorithms supported for data encryption */
var EncryptionAlgorithm;
(function (EncryptionAlgorithm) {
    /**  Represents the authenticated encryption algorithm with associated data as described in
          http://tools.ietf.org/html/draft-mcgrew-aead-aes-cbc-hmac-sha2-05. */
    EncryptionAlgorithm["AEAD_AES_256_CBC_HMAC_SHA256"] = "AEAD_AES_256_CBC_HMAC_SHA256";
})(EncryptionAlgorithm || (exports.EncryptionAlgorithm = EncryptionAlgorithm = {}));
//# sourceMappingURL=EncryptionAlgorithm.js.map