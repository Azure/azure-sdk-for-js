// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to updating settings about different configurations in Microsoft Defender for Cloud
 *
 * @summary updating settings about different configurations in Microsoft Defender for Cloud
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2022-05-01/examples/Settings/UpdateSetting_example.json
 */

import type { DataExportSettings } from "@azure/arm-security";
import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateASettingForSubscription(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const settingName = "WDATP";
  const setting: DataExportSettings = {
    enabled: true,
    kind: "DataExportSettings",
  };
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.settings.update(settingName, setting);
  console.log(result);
}

async function main(): Promise<void> {
  await updateASettingForSubscription();
}

main().catch(console.error);
