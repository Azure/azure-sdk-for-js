// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete an existent evidence from a specified report
 *
 * @summary Delete an existent evidence from a specified report
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_Delete.json
 */
async function evidenceDelete(): Promise<void> {
  const reportName = "testReportName";
  const evidenceName = "evidence1";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.evidence.delete(reportName, evidenceName);
  console.log(result);
}

async function main(): Promise<void> {
  await evidenceDelete();
}

main().catch(console.error);
