// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function isCosmosEndpoint(url: string): boolean {
  const parsedURL = new URL(url);
  if (parsedURL.hostname.indexOf(".table.cosmosdb.") !== -1) {
    return true;
  }

  if (parsedURL.hostname.indexOf(".table.cosmos.") !== -1) {
    return true;
  }

  if (parsedURL.hostname === "localhost" && parsedURL.port !== "10002") {
    return true;
  }

  return false;
}
