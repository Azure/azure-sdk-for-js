// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Fix the AppComplianceAutomation report error. e.g: App Compliance Automation Tool service unregistered, automation removed.
 *
 * @summary Fix the AppComplianceAutomation report error. e.g: App Compliance Automation Tool service unregistered, automation removed.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Fix.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function reportFix(): Promise<void> {
  const reportName = "testReport";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.report.beginFixAndWait(reportName);
  console.log(result);
}

async function main(): Promise<void> {
  await reportFix();
}

main().catch(console.error);
