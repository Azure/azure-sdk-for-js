// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the proactive log collection settings on a Data Box Edge/Data Box Gateway device.
 *
 * @summary updates the proactive log collection settings on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/UpdateDiagnosticProactiveLogCollectionSettings.json
 */
async function updateDiagnosticProactiveLogCollectionSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.diagnosticSettings.updateDiagnosticProactiveLogCollectionSettings(
    "testedgedevice",
    "GroupForEdgeAutomation",
    { userConsent: "Enabled" },
  );
  console.log(result);
}

async function main() {
  await updateDiagnosticProactiveLogCollectionSettings();
}

main().catch(console.error);
