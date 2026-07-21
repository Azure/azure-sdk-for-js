// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the properties of the specified DICOM Service.
 *
 * @summary gets the properties of the specified DICOM Service.
 * x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Get.json
 */
async function getADicomservice() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.dicomServices.get("testRG", "workspace1", "blue");
  console.log(result);
}

async function main() {
  await getADicomservice();
}

main().catch(console.error);
