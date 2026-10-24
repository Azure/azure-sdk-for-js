// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the active diagnostic settings for the specified resource.
 *
 * @summary gets the active diagnostic settings for the specified resource.
 * x-ms-original-file: 2021-05-01-preview/getDiagnosticSetting.json
 */
async function getsTheDiagnosticSetting() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.diagnosticSettings.get(
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6",
    "mysetting",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the active diagnostic settings for the specified resource.
 *
 * @summary gets the active diagnostic settings for the specified resource.
 * x-ms-original-file: 2021-05-01-preview/getDiagnosticSettingCategory.json
 */
async function getsTheDiagnosticSettingForCategory() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.diagnosticSettings.get(
    "subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourcegroups/viruela1/providers/microsoft.logic/workflows/viruela6",
    "mysetting",
  );
  console.log(result);
}

async function main() {
  await getsTheDiagnosticSetting();
  await getsTheDiagnosticSettingForCategory();
}

main().catch(console.error);
