// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists logic app's connections for web site, or a deployment slot.
 *
 * @summary lists logic app's connections for web site, or a deployment slot.
 * x-ms-original-file: 2025-05-01/ListWorkflowsConfigurationConnections_Slot.json
 */
async function listTheInstanceWorkflowsConfigurationConnectionsSlot(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.listWorkflowsConnectionsSlot(
    "testrg123",
    "testsite2",
    "staging",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listTheInstanceWorkflowsConfigurationConnectionsSlot();
}

main().catch(console.error);
