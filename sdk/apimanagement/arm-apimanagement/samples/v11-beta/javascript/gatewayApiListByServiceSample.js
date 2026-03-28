// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of the APIs associated with a gateway.
 *
 * @summary lists a collection of the APIs associated with a gateway.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGatewayApis.json
 */
async function apiManagementListGatewayApis() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gatewayApi.listByService("rg1", "apimService1", "gw1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListGatewayApis();
}

main().catch(console.error);
