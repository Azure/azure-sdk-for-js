// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import { isNamedKeyCredential, isSASCredential, isTokenCredential } from "@azure/core-auth";

export function isCredential(
  credential: unknown,
): credential is NamedKeyCredential | SASCredential | TokenCredential {
  return (
    isSASCredential(credential) || isNamedKeyCredential(credential) || isTokenCredential(credential)
  );
}
