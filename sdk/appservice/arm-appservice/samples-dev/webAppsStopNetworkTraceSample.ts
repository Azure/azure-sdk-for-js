// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Stop ongoing capturing network packets for the site.
 *
 * @summary description for Stop ongoing capturing network packets for the site.
 * x-ms-original-file: 2025-05-01/StopWebSiteNetworkTrace_StopNetworkTrace.json
 */
async function stopACurrentlyRunningNetworkTraceOperationForASite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.stopNetworkTrace("testrg123", "SampleApp");
}

async function main(): Promise<void> {
  await stopACurrentlyRunningNetworkTraceOperationForASite();
}

main().catch(console.error);
