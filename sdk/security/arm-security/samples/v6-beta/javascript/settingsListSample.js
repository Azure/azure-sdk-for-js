// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to settings about different configurations in Microsoft Defender for Cloud
 *
 * @summary settings about different configurations in Microsoft Defender for Cloud
 * x-ms-original-file: 2022-05-01/Settings/GetSettings_example.json
 */
async function getSettingsOfSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.settings.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getSettingsOfSubscription();
}

main().catch(console.error);
