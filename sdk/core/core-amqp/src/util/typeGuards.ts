// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SasTokenProvider } from "../auth/tokenProvider.js";
import { isObjectWithProperties } from "@azure/core-util";

/**
 * Typeguard that checks if the input is a SasTokenProvider.
 * @param thing - Any object.
 * @hidden
 */
export function isSasTokenProvider(thing: unknown): thing is SasTokenProvider {
  return isObjectWithProperties(thing, ["isSasTokenProvider"]) && thing.isSasTokenProvider === true;
}
