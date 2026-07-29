// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updating settings about different configurations in Microsoft Defender for Cloud
 *
 * @summary updating settings about different configurations in Microsoft Defender for Cloud
 * x-ms-original-file: 2022-05-01/Settings/UpdateSetting_example.json
 */
async function updateASettingForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.settings.update("WDATP", {
    kind: "DataExportSettings",
    enabled: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateASettingForSubscription();
}

main().catch(console.error);
