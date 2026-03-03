// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets a named operation for a network trace capturing (or deployment slot, if specified).
 *
 * @summary description for Gets a named operation for a network trace capturing (or deployment slot, if specified).
 * x-ms-original-file: 2025-05-01/GetWebSiteNetworkTraces_SlotV2.json
 */
async function getNetworkTracesForASite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getNetworkTracesV2(
    "testrg123",
    "SampleApp",
    "c291433b-53ad-4c49-8cae-0a293eae1c6d",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkTracesForASite();
}

main().catch(console.error);
