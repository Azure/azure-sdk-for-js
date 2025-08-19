// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the dsc node.
 *
 * @summary Update the dsc node.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/preview/2020-01-13-preview/examples/updateDscNode.json
 */

import type { DscNodeUpdateParameters } from "@azure/arm-automation";
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateANode(): Promise<void> {
  const subscriptionId = process.env["AUTOMATION_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "rg";
  const automationAccountName = "myAutomationAccount33";
  const nodeId = "nodeId";
  const dscNodeUpdateParameters: DscNodeUpdateParameters = {
    nodeId: "nodeId",
    properties: { name: "SetupServer.localhost" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscNodeOperations.update(
    resourceGroupName,
    automationAccountName,
    nodeId,
    dscNodeUpdateParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateANode();
}

main().catch(console.error);
