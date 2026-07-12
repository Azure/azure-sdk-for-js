// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AuthenticationSetting
 *
 * @summary get a AuthenticationSetting
 * x-ms-original-file: 2026-05-01-preview/AuthenticationSettings_Get.json
 */
async function authenticationSettingsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.authenticationSettings.get(
    "online-store-rg",
    "online-store",
    "default-auth",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await authenticationSettingsGet();
}

main().catch(console.error);
