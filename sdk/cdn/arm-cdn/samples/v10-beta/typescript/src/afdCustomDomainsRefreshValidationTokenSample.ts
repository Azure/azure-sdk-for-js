// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the domain validation token.
 *
 * @summary updates the domain validation token.
 * x-ms-original-file: 2025-12-01/AFDCustomDomains_RefreshValidationToken.json
 */
async function afdCustomDomainsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.afdCustomDomains.refreshValidationToken("RG", "profile1", "domain1");
}

async function main(): Promise<void> {
  await afdCustomDomainsDelete();
}

main().catch(console.error);
