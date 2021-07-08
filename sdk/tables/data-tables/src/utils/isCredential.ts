// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isNamedKeyCredential,
  isSASCredential,
  isTokenCredential,
  NamedKeyCredential,
  SASCredential,
  TokenCredential
} from "@azure/core-auth";

export function isCredential(
  credential: unknown
): credential is NamedKeyCredential | SASCredential | TokenCredential {
  return (
    isSASCredential(credential) || isNamedKeyCredential(credential) || isTokenCredential(credential)
  );
}
