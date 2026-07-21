// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all private endpoint connections on a Automation account.
 *
 * @summary list all private endpoint connections on a Automation account.
 * x-ms-original-file: 2024-10-23/privateEndpointConnection/PrivateEndpointConnectionListGet.json
 */
async function getsPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AutomationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByAutomationAccount(
    "rg1",
    "automationAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
