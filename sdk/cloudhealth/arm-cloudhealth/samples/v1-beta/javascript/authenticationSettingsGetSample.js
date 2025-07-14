// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a AuthenticationSetting
 *
 * @summary get a AuthenticationSetting
 * x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_Get.json
 */
async function authenticationSettingsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.authenticationSettings.get(
    "my-resource-group",
    "my-health-model",
    "my-auth-setting",
  );
  console.log(result);
}

async function main() {
  await authenticationSettingsGet();
}

main().catch(console.error);
