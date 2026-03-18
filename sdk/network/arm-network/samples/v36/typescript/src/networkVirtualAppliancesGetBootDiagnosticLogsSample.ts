// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  NetworkVirtualApplianceBootDiagnosticParameters} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Retrieves the boot diagnostic logs for a VM instance belonging to the specified Network Virtual Appliance.
 *
 * @summary Retrieves the boot diagnostic logs for a VM instance belonging to the specified Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkVirtualApplianceBootDiagnostics.json
 */
async function retrieveBootDiagnosticLogsForAGivenNvaVmssInstance(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkVirtualApplianceName = "nva";
  const request: NetworkVirtualApplianceBootDiagnosticParameters = {
    consoleScreenshotStorageSasUrl:
      "https://blobcortextesturl.blob.core.windows.net/nvaBootDiagContainer/consoleScreenshot.png?sp=rw&se=2018-01-10T03%3A42%3A04Z&sv=2017-04-17&sig=WvXrT5bDmDFfgHs%2Brz%2BjAu123eRCNE9BO0eQYcPDT7pY%3D&sr=b",
    instanceId: 0,
    serialConsoleStorageSasUrl:
      "https://blobcortextesturl.blob.core.windows.net/nvaBootDiagContainer/serialLogs.txt?sp=rw&se=2018-01-10T03%3A42%3A04Z&sv=2017-04-17&sig=WvXrT5bDmDFfgHs%2Brz%2BjAu123eRCNE9BO0eQYcPDT7pY%3D&sr=b",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.networkVirtualAppliances.beginGetBootDiagnosticLogsAndWait(
      resourceGroupName,
      networkVirtualApplianceName,
      request,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await retrieveBootDiagnosticLogsForAGivenNvaVmssInstance();
}

main().catch(console.error);
