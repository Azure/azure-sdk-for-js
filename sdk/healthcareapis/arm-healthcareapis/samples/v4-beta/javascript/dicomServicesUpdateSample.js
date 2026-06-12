// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch DICOM Service details.
 *
 * @summary patch DICOM Service details.
 * x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Patch.json
 */
async function updateADicomservice() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.dicomServices.update("testRG", "blue", "workspace1", {
    tags: { tagKey: "tagValue" },
  });
  console.log(result);
}

async function main() {
  await updateADicomservice();
}

main().catch(console.error);
