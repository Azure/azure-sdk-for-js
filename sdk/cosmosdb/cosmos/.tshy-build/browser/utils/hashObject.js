// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { digest } from "./digest.js";
import stableStringify from "fast-json-stable-stringify";
export async function hashObject(object) {
    const stringifiedObject = stableStringify(object);
    return digest(stringifiedObject);
}
//# sourceMappingURL=hashObject.js.map