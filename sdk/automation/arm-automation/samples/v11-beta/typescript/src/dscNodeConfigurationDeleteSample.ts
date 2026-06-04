// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the Dsc node configurations by node configuration.
 *
 * @summary delete the Dsc node configurations by node configuration.
 * x-ms-original-file: 2024-10-23/deleteDscNodeConfiguration.json
 */
async function deleteADSCNodeConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.dscNodeConfiguration.delete(
    "rg",
    "myAutomationAccount20",
    "configName.nodeConfigName",
  );
}

async function main(): Promise<void> {
  await deleteADSCNodeConfiguration();
}

main().catch(console.error);
