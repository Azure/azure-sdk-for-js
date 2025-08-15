// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDeploymentManager } from "@azure/arm-deploymentmanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Lists the services in the service topology.
 *
 * @summary Lists the services in the service topology.
 * x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/services_list.json
 */
async function listServices(): Promise<void> {
  const subscriptionId = "caac1590-e859-444f-a9e0-62091c0f5929";
  const resourceGroupName = "myResourceGroup";
  const serviceTopologyName = "myTopology";
  const credential = new DefaultAzureCredential();
  const client = new AzureDeploymentManager(credential, subscriptionId);
  const result = await client.services.list(resourceGroupName, serviceTopologyName);
  console.log(result);
}

listServices().catch(console.error);
