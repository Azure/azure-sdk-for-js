// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an existing peering with the specified name under the given subscription and resource group.
 *
 * @summary Deletes an existing peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: specification/peering/resource-manager/Microsoft.Peering/stable/2021-06-01/examples/DeletePeering.json
 */

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

async function deleteAPeering(): Promise<void> {
  const subscriptionId = "subId";
  const resourceGroupName = "rgName";
  const peeringName = "peeringName";
  const credential = new DefaultAzureCredential();
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peerings.delete(resourceGroupName, peeringName);
  console.log(result);
}

deleteAPeering().catch(console.error);
