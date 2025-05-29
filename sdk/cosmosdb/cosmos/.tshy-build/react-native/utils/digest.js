// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHash } from "node:crypto";
export async function digest(str) {
    const hash = createHash("sha256");
    hash.update(str, "utf8");
    return hash.digest("hex");
}
//# sourceMappingURL=digest.js.map