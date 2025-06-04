// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AuthenticationSetting
 *
 * @summary get a AuthenticationSetting
 * x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_Get.json
 */
async function authenticationSettingsGet(): Promise<void> {
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

async function main(): Promise<void> {
  await authenticationSettingsGet();
}

main().catch(console.error);
