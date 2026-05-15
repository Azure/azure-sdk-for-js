// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the boot diagnostic logs for a VM instance belonging to the specified Network Virtual Appliance.
 *
 * @summary retrieves the boot diagnostic logs for a VM instance belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceBootDiagnostics.json
 */
async function retrieveBootDiagnosticLogsForAGivenNVAVmssInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkVirtualAppliances.getBootDiagnosticLogs("rg1", "nva", {
    consoleScreenshotStorageSasUrl:
      "https://blobcortextesturl.blob.core.windows.net/nvaBootDiagContainer/consoleScreenshot.png?sp=rw&se=2018-01-10T03%3A42%3A04Z&sv=2017-04-17&sig=WvXrT5bDmDFfgHs%2Brz%2BjAu123eRCNE9BO0eQYcPDT7pY%3D&sr=b",
    instanceId: 0,
    serialConsoleStorageSasUrl:
      "https://blobcortextesturl.blob.core.windows.net/nvaBootDiagContainer/serialLogs.txt?sp=rw&se=2018-01-10T03%3A42%3A04Z&sv=2017-04-17&sig=WvXrT5bDmDFfgHs%2Brz%2BjAu123eRCNE9BO0eQYcPDT7pY%3D&sr=b",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveBootDiagnosticLogsForAGivenNVAVmssInstance();
}

main().catch(console.error);
