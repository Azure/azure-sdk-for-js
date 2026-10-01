// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to exposes the auto provisioning settings of the subscriptions
 *
 * @summary exposes the auto provisioning settings of the subscriptions
 * x-ms-original-file: 2017-08-01-preview/AutoProvisioningSettings/GetAutoProvisioningSettingsSubscription_example.json
 */
async function getAutoProvisioningSettingsForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.autoProvisioningSettings.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAutoProvisioningSettingsForSubscription();
}

main().catch(console.error);
