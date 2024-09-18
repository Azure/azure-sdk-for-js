// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { paginate } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets a list of all roles in a cloud service. Use nextLink property in the response to get the next page of roles. Do this till nextLink is null to fetch all the roles.
 *
 * @summary Gets a list of all roles in a cloud service. Use nextLink property in the response to get the next page of roles. Do this till nextLink is null to fetch all the roles.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/CloudserviceRP/stable/2022-04-04/examples/CloudServiceRole_List.json
 */
async function listRolesInACloudService() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "ConstosoRG";
  const cloudServiceName = "{cs-name}";
  const options = {
    queryParameters: { "api-version": "2022-04-04" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/cloudServices/{cloudServiceName}/roles",
      subscriptionId,
      resourceGroupName,
      cloudServiceName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listRolesInACloudService().catch(console.error);
