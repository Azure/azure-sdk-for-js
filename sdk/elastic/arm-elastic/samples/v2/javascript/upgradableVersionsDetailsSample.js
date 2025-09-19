// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all upgradable versions for your Elastic monitor resource, helping you plan and execute upgrades.
 *
 * @summary list all upgradable versions for your Elastic monitor resource, helping you plan and execute upgrades.
 * x-ms-original-file: 2025-06-01/UpgradableVersions_Details.json
 */
async function upgradableVersionsDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.upgradableVersions.details("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await upgradableVersionsDetails();
}

main().catch(console.error);
