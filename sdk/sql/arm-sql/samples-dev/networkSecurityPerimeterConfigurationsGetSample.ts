// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a network security perimeter configuration.
 *
 * @summary gets a network security perimeter configuration.
 * x-ms-original-file: 2025-02-01-preview/NetworkSecurityPerimeterConfigurationsGet.json
 */
async function getAnNSPConfigByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "sqlcrudtest-7398",
    "sqlcrudtest-7398",
    "00000001-2222-3333-4444-111144444444.assoc1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAnNSPConfigByName();
}

main().catch(console.error);
