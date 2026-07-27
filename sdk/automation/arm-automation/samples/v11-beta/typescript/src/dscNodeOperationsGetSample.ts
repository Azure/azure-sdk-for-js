// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the dsc node identified by node id.
 *
 * @summary retrieve the dsc node identified by node id.
 * x-ms-original-file: 2024-10-23/getDscNode.json
 */
async function getANode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscNodeOperations.get("rg", "myAutomationAccount33", "nodeId");
  console.log(result);
}

async function main(): Promise<void> {
  await getANode();
}

main().catch(console.error);
