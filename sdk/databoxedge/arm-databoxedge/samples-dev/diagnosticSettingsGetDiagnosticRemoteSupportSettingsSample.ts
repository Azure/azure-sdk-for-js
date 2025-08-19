// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the diagnostic remote support settings of the specified Data Box Edge/Data Box Gateway device.
 *
 * @summary Gets the diagnostic remote support settings of the specified Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2021-06-01/examples/GetDiagnosticRemoteSupportSettings.json
 */
async function getDiagnosticRemoteSupportSettings(): Promise<void> {
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const resourceGroupName = "GroupForEdgeAutomation";
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.diagnosticSettings.getDiagnosticRemoteSupportSettings(
    deviceName,
    resourceGroupName,
  );
  console.log(result);
}

getDiagnosticRemoteSupportSettings().catch(console.error);
