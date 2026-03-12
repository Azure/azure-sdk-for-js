// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists the service topologies in the resource group.
 *
 * @summary Lists the service topologies in the resource group.
 * x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopologies_list.json
 */

import { AzureDeploymentManager } from "@azure/arm-deploymentmanager";
import { DefaultAzureCredential } from "@azure/identity";

async function listTopologies(): Promise<void> {
  const subscriptionId = "caac1590-e859-444f-a9e0-62091c0f5929";
  const resourceGroupName = "myResourceGroup";
  const credential = new DefaultAzureCredential();
  const client = new AzureDeploymentManager(credential, subscriptionId);
  const result = await client.serviceTopologies.list(resourceGroupName);
  console.log(result);
}

listTopologies().catch(console.error);
