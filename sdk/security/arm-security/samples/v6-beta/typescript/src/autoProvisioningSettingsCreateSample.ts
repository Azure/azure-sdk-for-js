// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to details of a specific setting
 *
 * @summary details of a specific setting
 * x-ms-original-file: 2017-08-01-preview/AutoProvisioningSettings/CreateAutoProvisioningSettingsSubscription_example.json
 */
async function createAutoProvisioningSettingsForSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.autoProvisioningSettings.create("default", { autoProvision: "On" });
  console.log(result);
}

async function main(): Promise<void> {
  await createAutoProvisioningSettingsForSubscription();
}

main().catch(console.error);
