// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Reimage asynchronous operation reinstalls the operating system on instances of web roles or worker roles.
 *
 * @summary Reimage asynchronous operation reinstalls the operating system on instances of web roles or worker roles.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceRoleInstance_Reimage_ByCloudService.json
 */

import type { CloudServicesReimageParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { getLongRunningPoller } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reimageCloudServiceRoleInstancesInACloudService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const options: CloudServicesReimageParameters = {
    body: { roleInstances: ["ContosoFrontend_IN_0", "ContosoBackend_IN_1"] },
    queryParameters: { "api-version": "2022-04-04" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/reimage",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

reimageCloudServiceRoleInstancesInACloudService().catch(console.error);
