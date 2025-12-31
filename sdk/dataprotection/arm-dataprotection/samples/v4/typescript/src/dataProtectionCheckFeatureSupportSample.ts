// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates if a feature is supported
 *
 * @summary validates if a feature is supported
 * x-ms-original-file: 2025-07-01/CheckfeatureSupport.json
 */
async function checkAzureVmBackupFeatureSupport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dataProtection.checkFeatureSupport("WestUS", {
    featureType: "DataSourceType",
    objectType: "FeatureValidationRequest",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkAzureVmBackupFeatureSupport();
}

main().catch(console.error);
