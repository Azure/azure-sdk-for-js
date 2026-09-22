// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

declare global {
  var process: { env?: Record<string, string | undefined> } | undefined;
}

export function getAzuriteAccounts(): string | undefined {
  return globalThis.process?.env?.AZURITE_ACCOUNTS;
}
