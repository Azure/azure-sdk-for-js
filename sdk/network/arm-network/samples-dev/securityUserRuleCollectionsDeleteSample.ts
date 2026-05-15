// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Security User Rule collection.
 *
 * @summary deletes a Security User Rule collection.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserRuleCollectionDelete.json
 */
async function deletesASecurityUserRuleCollection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityUserRuleCollections.delete(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    { force: false },
  );
}

async function main(): Promise<void> {
  await deletesASecurityUserRuleCollection();
}

main().catch(console.error);
