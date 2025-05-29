// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHmac } from "node:crypto";
export async function hmac(key, message) {
    return createHmac("sha256", Buffer.from(key, "base64")).update(message).digest("base64");
}
//# sourceMappingURL=hmac.js.map