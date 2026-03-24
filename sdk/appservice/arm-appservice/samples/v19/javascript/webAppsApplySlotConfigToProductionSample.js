// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Applies the configuration settings from the target slot onto the current slot.
 *
 * @summary description for Applies the configuration settings from the target slot onto the current slot.
 * x-ms-original-file: 2025-05-01/ApplySlotConfig.json
 */
async function applyWebAppSlotConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.applySlotConfigToProduction("testrg123", "sitef6141", {
    preserveVnet: true,
    targetSlot: "staging",
  });
}

async function main() {
  await applyWebAppSlotConfig();
}

main().catch(console.error);
