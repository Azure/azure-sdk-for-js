// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  CloudServiceRoleInstancesGetRemoteDesktopFileParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a remote desktop file for a role instance in a cloud service.
 *
 * @summary Gets a remote desktop file for a role instance in a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceRoleInstance_Get_RemoteDesktopFile.json
 */
async function getCloudServiceRole() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcloudService";
  const cloudServiceName = "aaaa";
  const roleInstanceName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: CloudServiceRoleInstancesGetRemoteDesktopFileParameters = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roleInstances/{roleInstanceName}/remoteDesktopFile",
      subscriptionId,
      resourceGroupName,
      cloudServiceName,
      roleInstanceName,
    )
    .get(options);
  console.log(result);
}

getCloudServiceRole().catch(console.error);
