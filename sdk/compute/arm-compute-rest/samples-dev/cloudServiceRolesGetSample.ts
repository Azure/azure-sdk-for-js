// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a role from a cloud service.
 *
 * @summary Gets a role from a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceRole_Get.json
 */

import type { CloudServiceRolesGetParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCloudServiceRole(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const roleName = "{role-name}";
  const options: CloudServiceRolesGetParameters = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roles/{roleName}",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
      roleName,
    )
    .get(options);
  console.log(result);
}

getCloudServiceRole().catch(console.error);
