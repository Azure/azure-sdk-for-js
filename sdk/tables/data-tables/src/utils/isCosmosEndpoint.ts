// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function isCosmosEndpoint(url: string): boolean {
  const parsedURL = new URL(url);
  if (parsedURL.hostname.indexOf(".table.cosmosdb.") !== -1) {
    return true;
  }

  if (parsedURL.hostname.indexOf(".table.cosmos.") !== -1) {
    return true;
  }

  // Azurite emulator IP-style URL for table?
  if (
    (parsedURL.hostname === "localhost" || parsedURL.hostname === "127.0.0.1") &&
    parsedURL.pathname.startsWith("/devstoreaccount1")
  ) {
    return false;
  }

  const azuriteAccounts = globalThis.process?.env?.AZURITE_ACCOUNTS?.split(":");
  if (azuriteAccounts?.[0] && parsedURL.hostname.includes(azuriteAccounts[0])) {
    return false;
  }

  if (parsedURL.hostname === "localhost") {
    return true;
  }

  return false;
}
