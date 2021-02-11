// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function getIdentityTokenEndpointSuffix(tenantId: string): string {
  if (tenantId === "adfs") {
    return "oauth2/token";
  } else {
    return "oauth2/v2.0/token";
  }
}
