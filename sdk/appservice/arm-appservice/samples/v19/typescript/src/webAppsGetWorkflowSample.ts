// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get workflow information by its ID for web site, or a deployment slot.
 *
 * @summary get workflow information by its ID for web site, or a deployment slot.
 * x-ms-original-file: 2025-05-01/GetWorkflow.json
 */
async function getAWorkflow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getWorkflow("testrg123", "testsite2", "stateful1");
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkflow();
}

main().catch(console.error);
