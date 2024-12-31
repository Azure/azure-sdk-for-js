// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { paginate } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets a list of service tag information resources with pagination.
 *
 * @summary Gets a list of service tag information resources with pagination.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceTagInformationListResult.json
 */
async function getListOfServiceTags() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const location = "westeurope";
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/serviceTagDetails",
      subscriptionId,
      location
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getListOfServiceTags().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of service tag information resources with pagination.
 *
 * @summary Gets a list of service tag information resources with pagination.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceTagInformationListResultWithNoAddressPrefixes.json
 */
async function getListOfServiceTagsWithNoAddressPrefixes() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const location = "westeurope";
  const options = {
    queryParameters: { "api-version": "2022-05-01", noAddressPrefixes: true },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/serviceTagDetails",
      subscriptionId,
      location
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getListOfServiceTagsWithNoAddressPrefixes().catch(console.error);
/**
 * This sample demonstrates how to Gets a list of service tag information resources with pagination.
 *
 * @summary Gets a list of service tag information resources with pagination.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ServiceTagInformationListResultWithTagname.json
 */
async function getListOfServiceTagsWithTagName() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const location = "westeurope";
  const options = {
    queryParameters: { "api-version": "2022-05-01", tagName: "ApiManagement" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/locations/{location}/serviceTagDetails",
      subscriptionId,
      location
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getListOfServiceTagsWithTagName().catch(console.error);
