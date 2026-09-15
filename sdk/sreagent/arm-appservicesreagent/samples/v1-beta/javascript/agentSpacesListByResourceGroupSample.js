// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppClient } = require("@azure/arm-appservicesreagent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the agent spaces in a resource group
 *
 * @summary get all the agent spaces in a resource group
 * x-ms-original-file: 2026-01-01/AgentSpaces_ListByResourceGroup.json
 */
async function agentSpacesListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new AppClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.agentSpaces.listByResourceGroup("examplerg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await agentSpacesListByResourceGroup();
}

main().catch(console.error);
