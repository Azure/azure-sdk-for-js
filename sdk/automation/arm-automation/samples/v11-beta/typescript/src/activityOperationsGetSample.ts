// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the activity in the module identified by module name and activity name.
 *
 * @summary retrieve the activity in the module identified by module name and activity name.
 * x-ms-original-file: 2024-10-23/getActivityInAModule.json
 */
async function getActivityInAModule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.activityOperations.get(
    "rg",
    "myAutomationAccount33",
    "OmsCompositeResources",
    "Add-AzureRmAccount",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getActivityInAModule();
}

main().catch(console.error);
