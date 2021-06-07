// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureKeyCredential } from "@azure/core-auth";
import { MixedRealityAccountKeyCredential } from "../../src/models/auth";

export function createTokenCredentialFromMRKeyCredential(
  accountId: string,
  accountKey: string | AzureKeyCredential
) {
  return new MixedRealityAccountKeyCredential(accountId, accountKey);
}
