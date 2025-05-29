// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import crypto from "node:crypto";
/**
 * @internal
 */
export async function generateKey(secret, stringToSign) {
    const result = encodeURIComponent(crypto.createHmac("sha256", secret).update(stringToSign).digest("base64"));
    return result;
}
//# sourceMappingURL=crypto.js.map