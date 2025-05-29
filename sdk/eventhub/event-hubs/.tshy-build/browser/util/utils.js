// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { randomUUID } from "@azure/core-util";
/**
 * Returns a random name by appending a guid to the input string as follows:
 * `{name}-{uuid}`.
 * @internal
 */
export function getRandomName(prefix) {
    const str = randomUUID();
    return prefix ? `${prefix}-${str}` : str;
}
//# sourceMappingURL=utils.js.map