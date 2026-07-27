// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete setting of the product.
 *
 * @summary delete setting of the product.
 * x-ms-original-file: 2025-07-01-preview/settings/DeleteEyesOnSetting.json
 */
async function deleteEyesOnSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.productSettings.delete("myRg", "myWorkspace", "EyesOn");
}

async function main(): Promise<void> {
  await deleteEyesOnSettings();
}

main().catch(console.error);
