// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  NamedKeyCredential,
  SASCredential,
  TokenCredential,
  isNamedKeyCredential,
  isSASCredential,
  isTokenCredential,
} from "@azure/core-auth";

export function isCredential(
  credential: unknown
): credential is NamedKeyCredential | SASCredential | TokenCredential {
  return (
    isSASCredential(credential) || isNamedKeyCredential(credential) || isTokenCredential(credential)
  );
}
