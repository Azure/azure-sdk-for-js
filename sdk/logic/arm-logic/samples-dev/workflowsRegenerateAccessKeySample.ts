// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RegenerateActionParameter } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Regenerates the callback URL access key for request triggers.
 *
 * @summary Regenerates the callback URL access key for request triggers.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/Workflows_RegenerateAccessKey.json
 */
async function regenerateTheCallbackUrlAccessKeyForRequestTriggers(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const workflowName = "testWorkflowName";
  const keyType: RegenerateActionParameter = { keyType: "Primary" };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.workflows.regenerateAccessKey(
    resourceGroupName,
    workflowName,
    keyType,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateTheCallbackUrlAccessKeyForRequestTriggers();
}

main().catch(console.error);
