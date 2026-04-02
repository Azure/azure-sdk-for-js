// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a network security perimeter configuration.
 *
 * @summary gets a network security perimeter configuration.
 * x-ms-original-file: 2026-03-01-preview/NetworkSecurityPerimeterConfigurationsGet.json
 */
async function getAnNSPConfigByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "rg1",
    "mysearchservice",
    "00000001-2222-3333-4444-111144444444.assoc1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnNSPConfigByName();
}

main().catch(console.error);
