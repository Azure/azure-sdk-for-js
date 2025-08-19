// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Return list of Azure Traffic Collectors in a Resource Group
 *
 * @summary Return list of Azure Traffic Collectors in a Resource Group
 * x-ms-original-file: specification/networkfunction/resource-manager/Microsoft.NetworkFunction/stable/2022-11-01/examples/AzureTrafficCollectorsByResourceGroupList.json
 */

import { AzureTrafficCollectorClient } from "@azure/arm-networkfunction";
import { DefaultAzureCredential } from "@azure/identity";

async function listOfTrafficCollectorsByResourceGroup(): Promise<void> {
  const subscriptionId = "subid";
  const resourceGroupName = "rg1";
  const credential = new DefaultAzureCredential();
  const client = new AzureTrafficCollectorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureTrafficCollectorsByResourceGroup.list(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

listOfTrafficCollectorsByResourceGroup().catch(console.error);
