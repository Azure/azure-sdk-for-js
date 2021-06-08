// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  isNamedKeyCredential,
  isSASCredential,
  NamedKeyCredential,
  SASCredential
} from "@azure/core-auth";

export function isCredential(
  credential: unknown
): credential is NamedKeyCredential | SASCredential {
  return isSASCredential(credential) || isNamedKeyCredential(credential);
}
