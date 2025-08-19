// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Download compliance needs from snapshot, like: Compliance Report, Resource List.
 *
 * @summary Download compliance needs from snapshot, like: Compliance Report, Resource List.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_Download_Snapshot_Download_Compliance_Detailed_Pdf_Report.json
 */
async function snapshotDownloadComplianceDetailedPdfReport(): Promise<void> {
  const reportName = "testReportName";
  const snapshotName = "testSnapshotName";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.snapshot.beginDownloadAndWait(reportName, snapshotName, {
    downloadType: "ComplianceDetailedPdfReport",
    offerGuid: "00000000-0000-0000-0000-000000000000",
    reportCreatorTenantId: "00000000-0000-0000-0000-000000000000",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to Download compliance needs from snapshot, like: Compliance Report, Resource List.
 *
 * @summary Download compliance needs from snapshot, like: Compliance Report, Resource List.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_Download_Snapshot_Download_Compliance_Pdf_Report.json
 */
async function snapshotDownloadCompliancePdfReport(): Promise<void> {
  const reportName = "testReportName";
  const snapshotName = "testSnapshotName";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.snapshot.beginDownloadAndWait(reportName, snapshotName, {
    downloadType: "CompliancePdfReport",
    offerGuid: "00000000-0000-0000-0000-000000000001",
    reportCreatorTenantId: "00000000-0000-0000-0000-000000000000",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to Download compliance needs from snapshot, like: Compliance Report, Resource List.
 *
 * @summary Download compliance needs from snapshot, like: Compliance Report, Resource List.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_Download_Snapshot_Download_Compliance_Report.json
 */
async function snapshotDownloadComplianceReport(): Promise<void> {
  const reportName = "testReportName";
  const snapshotName = "testSnapshotName";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.snapshot.beginDownloadAndWait(reportName, snapshotName, {
    downloadType: "ComplianceReport",
    offerGuid: "00000000-0000-0000-0000-000000000001",
    reportCreatorTenantId: "00000000-0000-0000-0000-000000000000",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to Download compliance needs from snapshot, like: Compliance Report, Resource List.
 *
 * @summary Download compliance needs from snapshot, like: Compliance Report, Resource List.
 * x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_Download_Snapshot_Download_Resource_List.json
 */
async function snapshotDownloadResourceList(): Promise<void> {
  const reportName = "testReportName";
  const snapshotName = "testSnapshotName";
  const credential = new DefaultAzureCredential();
  const client = new AppComplianceAutomationToolForMicrosoft365(credential);
  const result = await client.snapshot.beginDownloadAndWait(reportName, snapshotName, {
    downloadType: "ResourceList",
    offerGuid: "00000000-0000-0000-0000-000000000001",
    reportCreatorTenantId: "00000000-0000-0000-0000-000000000000",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await snapshotDownloadComplianceDetailedPdfReport();
  await snapshotDownloadCompliancePdfReport();
  await snapshotDownloadComplianceReport();
  await snapshotDownloadResourceList();
}

main().catch(console.error);
