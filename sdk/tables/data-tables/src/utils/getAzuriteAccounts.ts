// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function getAzuriteAccounts(): string | undefined {
  return process.env.AZURITE_ACCOUNTS;
}
