// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns list of connector which connects to the resource, which supports to config the target service during the resource provision.
 *
 * @summary returns list of connector which connects to the resource, which supports to config the target service during the resource provision.
 * x-ms-original-file: 2024-07-01-preview/ConnectorList.json
 */
async function connectorList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connector.list("test-rg", "westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await connectorList();
}

main().catch(console.error);
