// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to details of a specific setting
 *
 * @summary details of a specific setting
 * x-ms-original-file: 2017-08-01-preview/AutoProvisioningSettings/GetAutoProvisioningSettingSubscription_example.json
 */
async function getAnAutoProvisioningSettingForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.autoProvisioningSettings.get("default");
  console.log(result);
}

async function main() {
  await getAnAutoProvisioningSettingForSubscription();
}

main().catch(console.error);
