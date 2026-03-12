// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Display information about a cloud service.
 *
 * @summary Display information about a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudService_Get_WithMultiRoleAndRDP.json
 */

import type { CloudServicesGetParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCloudServiceWithMultipleRolesAndRdpExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const options: CloudServicesGetParameters = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
    )
    .get(options);
  console.log(result);
}

getCloudServiceWithMultipleRolesAndRdpExtension().catch(console.error);
