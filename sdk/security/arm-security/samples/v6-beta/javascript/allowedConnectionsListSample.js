// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of all possible traffic between resources for the subscription
 *
 * @summary gets the list of all possible traffic between resources for the subscription
 * x-ms-original-file: 2020-01-01/AllowedConnections/GetAllowedConnectionsSubscription_example.json
 */
async function getAllowedConnectionsOnASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3eeab341-f466-499c-a8be-85427e154bad";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.allowedConnections.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllowedConnectionsOnASubscription();
}

main().catch(console.error);
