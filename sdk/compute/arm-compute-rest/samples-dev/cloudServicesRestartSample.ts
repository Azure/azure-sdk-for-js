// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudServicesRestartParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Restarts one or more role instances in a cloud service.
 *
 * @summary Restarts one or more role instances in a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceRoleInstance_Restart_ByCloudService.json
 */
async function restartCloudServiceRoleInstancesInACloudService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const options: CloudServicesRestartParameters = {
    body: { roleInstances: ["ContosoFrontend_IN_0", "ContosoBackend_IN_1"] },
    queryParameters: { "api-version": "2022-04-04" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/restart",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

restartCloudServiceRoleInstancesInACloudService().catch(console.error);
