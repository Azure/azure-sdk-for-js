// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete an AppComplianceAutomation report.
 *
 * @summary Delete an AppComplianceAutomation report.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Delete.json
 */
async function reportDelete(): Promise<void> {
  const reportName = "testReportName";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.report.beginDeleteAndWait(reportName);
  console.log(result);
}

async function main(): Promise<void> {
  await reportDelete();
}

main().catch(console.error);
