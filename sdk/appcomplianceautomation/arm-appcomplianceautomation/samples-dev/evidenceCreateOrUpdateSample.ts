// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or Update an evidence a specified report
 *
 * @summary Create or Update an evidence a specified report
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_CreateOrUpdate.json
 */
async function evidenceCreateOrUpdate(): Promise<void> {
  const reportName = "testReportName";
  const evidenceName = "evidence1";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.evidence.createOrUpdate(reportName, evidenceName, {
    properties: {
      controlId: "Operational_Security_10",
      evidenceType: "File",
      filePath: "/test-byos/evidence1.png",
      responsibilityId: "authorized_ip_ranges_should_be_defined_on_kubernetes_services",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await evidenceCreateOrUpdate();
}

main().catch(console.error);
