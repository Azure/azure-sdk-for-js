// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the trigger schema as JSON.
 *
 * @summary get the trigger schema as JSON.
 * x-ms-original-file: 2025-05-01/WorkflowTriggers_GetSchemaJson.json
 */
async function getTriggerSchema(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.workflowTriggers.getSchemaJson(
    "testResourceGroup",
    "test-name",
    "testWorkflow",
    "testTrigger",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTriggerSchema();
}

main().catch(console.error);
