// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a replica.
 *
 * @summary deletes a replica.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresDeleteReplica.json
 */
async function replicasDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  await client.replicas.delete("myResourceGroup", "contoso", "myReplicaEus");
}

async function main() {
  await replicasDelete();
}

main().catch(console.error);
