// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  CloudServicesListParameters,
  paginate,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a list of all cloud services under a resource group. Use nextLink property in the response to get the next page of Cloud Services. Do this till nextLink is null to fetch all the Cloud Services.
 *
 * @summary Gets a list of all cloud services under a resource group. Use nextLink property in the response to get the next page of Cloud Services. Do this till nextLink is null to fetch all the Cloud Services.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudService_List_ByResourceGroup.json
 */
async function listCloudServicesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const options: CloudServicesListParameters = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices",
      subscriptionId,
      resourceGroupName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listCloudServicesInAResourceGroup().catch(console.error);
