// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets a named operation for a network trace capturing (or deployment slot, if specified).
 *
 * @summary description for Gets a named operation for a network trace capturing (or deployment slot, if specified).
 * x-ms-original-file: 2025-05-01/GetWebSiteNetworkTraceOperation_SlotV2.json
 */
async function getTheCurrentStatusOfANetworkTraceOperationForASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getNetworkTraceOperationSlotV2(
    "testrg123",
    "SampleApp",
    "c291433b-53ad-4c49-8cae-0a293eae1c6d",
    "Production",
  );
  console.log(result);
}

async function main() {
  await getTheCurrentStatusOfANetworkTraceOperationForASite();
}

main().catch(console.error);
