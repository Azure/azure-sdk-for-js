// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all private link resources on an application gateway.
 *
 * @summary lists all private link resources on an application gateway.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayPrivateLinkResourceList.json
 */
async function listsAllPrivateLinkResourcesOnApplicationGateway() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationGatewayPrivateLinkResources.list("rg1", "appgw")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllPrivateLinkResourcesOnApplicationGateway();
}

main().catch(console.error);
