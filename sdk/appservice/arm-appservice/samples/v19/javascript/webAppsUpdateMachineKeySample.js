// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the machine key of an app.
 *
 * @summary updates the machine key of an app.
 * x-ms-original-file: 2025-05-01/UpdateMachineKey.json
 */
async function updatesTheMachineKeyForASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateMachineKey("rg", "contoso");
  console.log(result);
}

async function main() {
  await updatesTheMachineKeyForASite();
}

main().catch(console.error);
