// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a AuthenticationSetting
 *
 * @summary delete a AuthenticationSetting
 * x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_Delete.json
 */
async function authenticationSettingsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.authenticationSettings.delete(
    "my-resource-group",
    "my-health-model",
    "my-auth-setting",
  );
}

async function main() {
  await authenticationSettingsDelete();
}

main().catch(console.error);
