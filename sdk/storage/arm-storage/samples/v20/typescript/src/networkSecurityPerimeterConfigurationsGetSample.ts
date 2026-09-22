// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets effective NetworkSecurityPerimeterConfiguration for association
 *
 * @summary gets effective NetworkSecurityPerimeterConfiguration for association
 * x-ms-original-file: 2026-04-01/NetworkSecurityPerimeterConfigurationGet.json
 */
async function networkSecurityPerimeterConfigurationGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterConfigurations.get(
    "res4410",
    "sto8607",
    "dbedb4e0-40e6-4145-81f3-f1314c150774.resourceAssociation1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkSecurityPerimeterConfigurationGet();
}

main().catch(console.error);
