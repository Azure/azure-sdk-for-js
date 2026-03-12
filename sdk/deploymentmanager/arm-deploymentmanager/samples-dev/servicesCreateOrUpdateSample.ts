// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Synchronously creates a new service or updates an existing service.
 *
 * @summary Synchronously creates a new service or updates an existing service.
 * x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/service_createorupdate.json
 */

import type { ServiceResource } from "@azure/arm-deploymentmanager";
import { AzureDeploymentManager } from "@azure/arm-deploymentmanager";
import { DefaultAzureCredential } from "@azure/identity";

async function createService(): Promise<void> {
  const subscriptionId = "caac1590-e859-444f-a9e0-62091c0f5929";
  const resourceGroupName = "myResourceGroup";
  const serviceTopologyName = "myTopology";
  const serviceName = "myService";
  const serviceInfo: ServiceResource = {
    location: "centralus",
    tags: {},
    targetLocation: "centralus",
    targetSubscriptionId: "600c95c5-3ee5-44fe-b190-ca38a19adcd7",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureDeploymentManager(credential, subscriptionId);
  const result = await client.services.createOrUpdate(
    resourceGroupName,
    serviceTopologyName,
    serviceName,
    serviceInfo,
  );
  console.log(result);
}

createService().catch(console.error);
