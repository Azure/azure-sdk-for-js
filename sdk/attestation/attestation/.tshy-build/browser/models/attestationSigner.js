// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { pemFromBase64 } from "../utils/helpers.js";
/**
 *
 * @param key  - JsonWebKey for signing key.
 * @returns AttestationSigner created from the JsonWebKey.
 *
 * @internal
 */
export function _attestationSignerFromGenerated(key) {
    var _a, _b;
    return {
        keyId: key === null || key === void 0 ? void 0 : key.kid,
        certificates: (_b = (_a = key === null || key === void 0 ? void 0 : key.x5C) === null || _a === void 0 ? void 0 : _a.map((cert) => pemFromBase64(cert, "CERTIFICATE"))) !== null && _b !== void 0 ? _b : [],
    };
}
//# sourceMappingURL=attestationSigner.js.map