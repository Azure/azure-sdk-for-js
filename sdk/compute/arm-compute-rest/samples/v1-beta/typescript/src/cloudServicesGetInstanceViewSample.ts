// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  CloudServicesGetInstanceViewParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the status of a cloud service.
 *
 * @summary Gets the status of a cloud service.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudService_Get_InstanceViewWithMultiRole.json
 */
async function getCloudServiceInstanceViewWithMultipleRoles() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const options: CloudServicesGetInstanceViewParameters = {
    queryParameters: { "api-version": "2022-04-04" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/instanceView",
      subscriptionId,
      resourceGroupName,
      cloudServiceName
    )
    .get(options);
  console.log(result);
}

getCloudServiceInstanceViewWithMultipleRoles().catch(console.error);
