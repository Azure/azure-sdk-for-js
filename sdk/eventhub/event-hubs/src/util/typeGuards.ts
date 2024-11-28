// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { isNamedKeyCredential, isSASCredential, isTokenCredential } from "@azure/core-auth";

/**
 * Typeguard that checks if the input is a credential type the clients accept.
 * @param thing - Any object.
 * @internal
 */
export function isCredential(
  thing: unknown,
): thing is TokenCredential | NamedKeyCredential | SASCredential {
  return isTokenCredential(thing) || isNamedKeyCredential(thing) || isSASCredential(thing);
}
