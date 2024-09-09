// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createNetworkManagementClient = require("@azure-rest/arm-network").default,
  { paginate } = require("@azure-rest/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Lists all of the available Network Rest API operations.
 *
 * @summary Lists all of the available Network Rest API operations.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/OperationList.json
 */
async function getAListOfOperationsForAResourceProvider() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const options = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client.path("/providers/Microsoft.Network/operations").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getAListOfOperationsForAResourceProvider().catch(console.error);
