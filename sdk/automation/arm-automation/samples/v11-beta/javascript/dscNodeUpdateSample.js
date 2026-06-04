// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the dsc node.
 *
 * @summary update the dsc node.
 * x-ms-original-file: 2024-10-23/updateDscNode.json
 */
async function updateANode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscNode.update("rg", "myAutomationAccount33", "nodeId", {
    nodeId: "nodeId",
    properties: { name: "SetupServer.localhost" },
  });
  console.log(result);
}

async function main() {
  await updateANode();
}

main().catch(console.error);
