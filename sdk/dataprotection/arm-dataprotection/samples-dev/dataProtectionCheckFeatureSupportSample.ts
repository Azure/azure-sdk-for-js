// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Validates if a feature is supported
 *
 * @summary Validates if a feature is supported
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/CheckfeatureSupport.json
 */

import type { FeatureValidationRequest } from "@azure/arm-dataprotection";
import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function checkAzureVMBackupFeatureSupport(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const location = "WestUS";
  const parameters: FeatureValidationRequest = {
    featureType: "DataSourceType",
    objectType: "FeatureValidationRequest",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.dataProtection.checkFeatureSupport(
    location,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkAzureVMBackupFeatureSupport();
}

main().catch(console.error);
