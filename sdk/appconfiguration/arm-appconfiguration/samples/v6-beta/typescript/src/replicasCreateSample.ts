// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a replica with the specified parameters.
 *
 * @summary creates a replica with the specified parameters.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateReplica.json
 */
async function replicasCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.replicas.create("myResourceGroup", "contoso", "myReplicaEus", {
    location: "eastus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await replicasCreate();
}

main().catch(console.error);
