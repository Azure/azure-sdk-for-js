// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all available code versions for Service Fabric cluster resources by location.
 *
 * @summary Gets all available code versions for Service Fabric cluster resources by location.
 * x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterVersionsList_example.json
 */

import { ServiceFabricManagementClient } from "@azure/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listClusterVersions(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const location = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricManagementClient(credential, subscriptionId);
  const result = await client.clusterVersions.list(location);
  console.log(result);
}

async function main(): Promise<void> {
  await listClusterVersions();
}

main().catch(console.error);
