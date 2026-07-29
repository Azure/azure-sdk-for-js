// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AuthenticationSetting
 *
 * @summary delete a AuthenticationSetting
 * x-ms-original-file: 2026-05-01-preview/AuthenticationSettings_Delete.json
 */
async function authenticationSettingsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.authenticationSettings.delete("online-store-rg", "online-store", "default-auth");
}

async function main(): Promise<void> {
  await authenticationSettingsDelete();
}

main().catch(console.error);
