// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates setting.
 *
 * @summary updates setting.
 * x-ms-original-file: 2025-07-01-preview/settings/UpdateEyesOnSetting.json
 */
async function updateEyesOnSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.productSettings.update("myRg", "myWorkspace", "EyesOn", {
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    kind: "EyesOn",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateEyesOnSettings();
}

main().catch(console.error);
