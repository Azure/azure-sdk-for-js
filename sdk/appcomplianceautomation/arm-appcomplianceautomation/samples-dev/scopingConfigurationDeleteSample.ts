// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Clean the AppComplianceAutomation scoping configuration of the specific report.
 *
 * @summary Clean the AppComplianceAutomation scoping configuration of the specific report.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ScopingConfiguration_Delete.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scopingConfigurationDelete(): Promise<void> {
  const reportName = "testReportName";
  const scopingConfigurationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.scopingConfiguration.delete(reportName, scopingConfigurationName);
  console.log(result);
}

async function main(): Promise<void> {
  await scopingConfigurationDelete();
}

main().catch(console.error);
