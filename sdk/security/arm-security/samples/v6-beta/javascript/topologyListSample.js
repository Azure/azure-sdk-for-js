// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list that allows to build a topology view of a subscription.
 *
 * @summary gets a list that allows to build a topology view of a subscription.
 * x-ms-original-file: 2020-01-01/Topology/GetTopologySubscription_example.json
 */
async function getTopologyOnASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3eeab341-f466-499c-a8be-85427e154bad";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topology.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTopologyOnASubscription();
}

main().catch(console.error);
