// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves information about the run-time state of a role instance in a cloud service.
 *
 * @summary Retrieves information about the run-time state of a role instance in a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceRoleInstance_Get_InstanceView.json
 */

import type { CloudServiceRoleInstancesGetInstanceViewParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getInstanceViewOfCloudServiceRoleInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const roleInstanceName = "{roleInstance-name}";
  const options: CloudServiceRoleInstancesGetInstanceViewParameters = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/instanceView",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
      roleInstanceName,
    )
    .get(options);
  console.log(result);
}

getInstanceViewOfCloudServiceRoleInstance().catch(console.error);
