// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified DICOM Service.
 *
 * @summary gets the properties of the specified DICOM Service.
 * x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Get.json
 */
async function getADicomservice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.dicomServices.get("testRG", "workspace1", "blue");
  console.log(result);
}

async function main(): Promise<void> {
  await getADicomservice();
}

main().catch(console.error);
