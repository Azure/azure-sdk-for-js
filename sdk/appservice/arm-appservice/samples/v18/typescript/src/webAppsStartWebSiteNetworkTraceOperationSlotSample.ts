// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Start capturing network packets for the site.
 *
 * @summary description for Start capturing network packets for the site.
 * x-ms-original-file: 2025-05-01/StartWebSiteNetworkTraceOperation_Slot.json
 */
async function startANewNetworkTraceOperationForASite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.startWebSiteNetworkTraceOperationSlot(
    "testrg123",
    "SampleApp",
    "Production",
    { durationInSeconds: 60 },
  );
}

async function main(): Promise<void> {
  await startANewNetworkTraceOperationForASite();
}

main().catch(console.error);
