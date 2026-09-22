// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a DICOM Service.
 *
 * @summary deletes a DICOM Service.
 * x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Delete.json
 */
async function deleteADicomservice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  await client.dicomServices.delete("testRG", "blue", "workspace1");
}

async function main(): Promise<void> {
  await deleteADicomservice();
}

main().catch(console.error);
