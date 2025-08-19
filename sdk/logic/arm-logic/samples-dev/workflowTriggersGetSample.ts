// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a workflow trigger.
 *
 * @summary Gets a workflow trigger.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/WorkflowTriggers_Get.json
 */

import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAWorkflowTrigger(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "test-resource-group";
  const workflowName = "test-workflow";
  const triggerName = "manual";
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflowTriggers.get(resourceGroupName, workflowName, triggerName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflowTrigger();
}

main().catch(console.error);
