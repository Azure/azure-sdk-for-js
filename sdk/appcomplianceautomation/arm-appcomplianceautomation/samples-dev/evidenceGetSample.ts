// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the evidence metadata
 *
 * @summary Get the evidence metadata
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_Get.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function evidenceGet(): Promise<void> {
  const reportName = "testReportName";
  const evidenceName = "evidence1";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.evidence.get(reportName, evidenceName);
  console.log(result);
}

async function main(): Promise<void> {
  await evidenceGet();
}

main().catch(console.error);
