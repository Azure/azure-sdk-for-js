// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list format of the singleton scopingConfiguration for a specified report.
 *
 * @summary Returns a list format of the singleton scopingConfiguration for a specified report.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ScopingConfiguration_List.json
 */

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function scopingConfigurationList(): Promise<void> {
  const reportName = "testReportName";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const resArray = new Array();
  for await (const item of client.scopingConfiguration.list(reportName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await scopingConfigurationList();
}

main().catch(console.error);
