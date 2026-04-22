// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconcile network security perimeter configuration for the Azure AI Search resource provider. This triggers a manual resync with network security perimeter configurations by ensuring the search service carries the latest configuration.
 *
 * @summary reconcile network security perimeter configuration for the Azure AI Search resource provider. This triggers a manual resync with network security perimeter configurations by ensuring the search service carries the latest configuration.
 * x-ms-original-file: 2026-03-01-preview/NetworkSecurityPerimeterConfigurationsReconcile.json
 */
async function reconcileNSPConfig(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  await client.networkSecurityPerimeterConfigurations.reconcile(
    "rg1",
    "mysearchservice",
    "00000001-2222-3333-4444-111144444444.assoc1",
  );
}

async function main(): Promise<void> {
  await reconcileNSPConfig();
}

main().catch(console.error);
