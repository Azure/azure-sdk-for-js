// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";

export function getAzuriteAccounts(): string | undefined {
  return process.env.AZURITE_ACCOUNTS;
}
