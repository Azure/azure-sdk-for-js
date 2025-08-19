// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 *
 * @summary Gets all Service Fabric cluster resources created or in the process of being created in the resource group.
 * x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterListByResourceGroupOperation_example.json
 */

import ServiceFabricManagementClient from "@azure-rest/arm-servicefabric";
import { DefaultAzureCredential } from "@azure/identity";

async function listClusterByResourceGroup(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "resRg";
  const credential = new DefaultAzureCredential();
  const client = ServiceFabricManagementClient(credential);
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.ServiceFabric/clusters",
      subscriptionId,
      resourceGroupName,
    )
    .get();
  console.log(result);
}

listClusterByResourceGroup().catch(console.error);
