// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list what values of endpoint services are available for use.
 *
 * @summary list what values of endpoint services are available for use.
 * x-ms-original-file: 2025-05-01/EndpointServicesList.json
 */
async function endpointServicesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availableEndpointServices.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await endpointServicesList();
}

main().catch(console.error);
