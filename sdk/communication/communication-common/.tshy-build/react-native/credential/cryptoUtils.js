// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHash, createHmac } from "node:crypto";
export const shaHash = async (content) => createHash("sha256").update(content).digest("base64");
export const shaHMAC = async (secret, content) => {
    const decodedSecret = Buffer.from(secret, "base64");
    return createHmac("sha256", decodedSecret).update(content).digest("base64");
};
//# sourceMappingURL=cryptoUtils.js.map