// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all DICOM Services for the given workspace
 *
 * @summary lists all DICOM Services for the given workspace
 * x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_List.json
 */
async function listDicomservices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dicomServices.listByWorkspace("testRG", "workspace1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDicomservices();
}

main().catch(console.error);
