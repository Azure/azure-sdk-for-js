// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isObjectWithProperties } from "@azure/core-util";
/**
 * Typeguard that checks if the input is a SasTokenProvider.
 * @param thing - Any object.
 * @hidden
 */
export function isSasTokenProvider(thing) {
    return isObjectWithProperties(thing, ["isSasTokenProvider"]) && thing.isSasTokenProvider === true;
}
//# sourceMappingURL=typeGuards.js.map