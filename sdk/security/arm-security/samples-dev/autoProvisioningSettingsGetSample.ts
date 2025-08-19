// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Details of a specific setting
 *
 * @summary Details of a specific setting
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2017-08-01-preview/examples/AutoProvisioningSettings/GetAutoProvisioningSettingSubscription_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAnAutoProvisioningSettingForSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const settingName = "default";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.autoProvisioningSettings.get(settingName);
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAutoProvisioningSettingForSubscription();
}

main().catch(console.error);
