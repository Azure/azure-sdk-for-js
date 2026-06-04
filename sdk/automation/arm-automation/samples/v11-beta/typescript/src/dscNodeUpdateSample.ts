// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the dsc node.
 *
 * @summary update the dsc node.
 * x-ms-original-file: 2024-10-23/updateDscNode.json
 */
async function updateANode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscNode.update("rg", "myAutomationAccount33", "nodeId", {
    nodeId: "nodeId",
    properties: { name: "SetupServer.localhost" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateANode();
}

main().catch(console.error);
