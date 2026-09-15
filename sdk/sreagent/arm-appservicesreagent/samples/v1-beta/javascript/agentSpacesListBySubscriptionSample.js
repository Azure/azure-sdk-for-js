// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all agent spaces for a subscription
 *
 * @summary get all agent spaces for a subscription
 * x-ms-original-file: 2026-01-01/AgentSpaces_ListBySubscription.json
 */
async function agentSpacesListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentSpaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await agentSpacesListBySubscription();
}

main().catch(console.error);
