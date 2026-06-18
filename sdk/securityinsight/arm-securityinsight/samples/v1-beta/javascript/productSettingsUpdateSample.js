// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates setting.
 *
 * @summary updates setting.
 * x-ms-original-file: 2025-07-01-preview/settings/UpdateEyesOnSetting.json
 */
async function updateEyesOnSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.productSettings.update("myRg", "myWorkspace", "EyesOn", {
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    kind: "EyesOn",
  });
  console.log(result);
}

async function main() {
  await updateEyesOnSettings();
}

main().catch(console.error);
