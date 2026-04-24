// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets all scale-out instances of an app.
 *
 * @summary description for Gets all scale-out instances of an app.
 * x-ms-original-file: 2025-05-01/GetSiteInstanceInfo_Slot.json
 */
async function getSiteInstanceInfo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getInstanceInfoSlot(
    "testrg123",
    "tests346",
    "134987120",
    "staging",
  );
  console.log(result);
}

async function main() {
  await getSiteInstanceInfo();
}

main().catch(console.error);
