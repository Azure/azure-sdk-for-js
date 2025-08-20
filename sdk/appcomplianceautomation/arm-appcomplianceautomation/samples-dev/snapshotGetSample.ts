// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the AppComplianceAutomation snapshot and its properties.
 *
 * @summary Get the AppComplianceAutomation snapshot and its properties.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_Get.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function snapshotGet(): Promise<void> {
  const reportName = "testReportName";
  const snapshotName = "testSnapshot";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.snapshot.get(reportName, snapshotName);
  console.log(result);
}

async function main(): Promise<void> {
  await snapshotGet();
}

main().catch(console.error);
