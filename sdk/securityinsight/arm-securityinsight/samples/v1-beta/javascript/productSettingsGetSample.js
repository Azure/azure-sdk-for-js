// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a setting.
 *
 * @summary gets a setting.
 * x-ms-original-file: 2025-07-01-preview/settings/GetEyesOnSetting.json
 */
async function getEyesOnSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.productSettings.get("myRg", "myWorkspace", "EyesOn");
  console.log(result);
}

async function main() {
  await getEyesOnSettings();
}

main().catch(console.error);
