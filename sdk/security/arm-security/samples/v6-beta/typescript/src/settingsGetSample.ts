// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to settings of different configurations in Microsoft Defender for Cloud
 *
 * @summary settings of different configurations in Microsoft Defender for Cloud
 * x-ms-original-file: 2022-05-01/Settings/GetSetting_example.json
 */
async function getASettingOnSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.settings.get("WDATP");
  console.log(result);
}

async function main(): Promise<void> {
  await getASettingOnSubscription();
}

main().catch(console.error);
