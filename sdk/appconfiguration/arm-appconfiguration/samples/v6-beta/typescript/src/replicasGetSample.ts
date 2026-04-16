// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified replica.
 *
 * @summary gets the properties of the specified replica.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresGetReplica.json
 */
async function replicasGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.replicas.get("myResourceGroup", "contoso", "myReplicaEus");
  console.log(result);
}

async function main(): Promise<void> {
  await replicasGet();
}

main().catch(console.error);
