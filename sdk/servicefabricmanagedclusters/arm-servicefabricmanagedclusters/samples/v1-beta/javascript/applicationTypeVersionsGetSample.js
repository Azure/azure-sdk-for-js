// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Service Fabric managed application type version resource created or in the process of being created in the Service Fabric managed application type name resource.
 *
 * @summary get a Service Fabric managed application type version resource created or in the process of being created in the Service Fabric managed application type name resource.
 * x-ms-original-file: 2025-10-01-preview/ApplicationTypeVersionGetOperation_example.json
 */
async function getAnApplicationTypeVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.applicationTypeVersions.get("resRg", "myCluster", "myAppType", "1.0");
  console.log(result);
}

async function main() {
  await getAnApplicationTypeVersion();
}

main().catch(console.error);
