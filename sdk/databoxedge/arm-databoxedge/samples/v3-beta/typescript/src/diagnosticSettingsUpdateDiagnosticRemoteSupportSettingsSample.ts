// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the diagnostic remote support settings on a Data Box Edge/Data Box Gateway device.
 *
 * @summary updates the diagnostic remote support settings on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/UpdateDiagnosticRemoteSupportSettings.json
 */
async function updateDiagnosticRemoteSupportSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.diagnosticSettings.updateDiagnosticRemoteSupportSettings(
    "testedgedevice",
    "GroupForEdgeAutomation",
    {
      remoteSupportSettingsList: [
        {
          accessLevel: "ReadWrite",
          expirationTimeStampInUTC: new Date("2021-07-07T00:00:00+00:00"),
          remoteApplicationType: "Powershell",
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDiagnosticRemoteSupportSettings();
}

main().catch(console.error);
