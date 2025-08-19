// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the AppComplianceAutomation report and its properties.
 *
 * @summary Get the AppComplianceAutomation report and its properties.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Get.json
 */
async function reportGet(): Promise<void> {
  const reportName = "testReport";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.report.get(reportName);
  console.log(result);
}

async function main(): Promise<void> {
  await reportGet();
}

main().catch(console.error);
