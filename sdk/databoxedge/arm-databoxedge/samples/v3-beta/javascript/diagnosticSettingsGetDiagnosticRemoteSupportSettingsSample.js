// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the diagnostic remote support settings of the specified Data Box Edge/Data Box Gateway device.
 *
 * @summary gets the diagnostic remote support settings of the specified Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/GetDiagnosticRemoteSupportSettings.json
 */
async function getDiagnosticRemoteSupportSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.diagnosticSettings.getDiagnosticRemoteSupportSettings(
    "testedgedevice",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main() {
  await getDiagnosticRemoteSupportSettings();
}

main().catch(console.error);
