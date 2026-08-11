// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AuthenticationSetting resources by HealthModel
 *
 * @summary list AuthenticationSetting resources by HealthModel
 * x-ms-original-file: 2026-05-01-preview/AuthenticationSettings_ListByHealthModel.json
 */
async function authenticationSettingsListByHealthModel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authenticationSettings.listByHealthModel(
    "online-store-rg",
    "online-store",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await authenticationSettingsListByHealthModel();
}

main().catch(console.error);
