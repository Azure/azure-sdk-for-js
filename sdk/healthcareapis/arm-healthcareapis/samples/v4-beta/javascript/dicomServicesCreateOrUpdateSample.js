// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a DICOM Service resource with the specified parameters.
 *
 * @summary creates or updates a DICOM Service resource with the specified parameters.
 * x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Create.json
 */
async function createOrUpdateADicomService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.dicomServices.createOrUpdate("testRG", "workspace1", "blue", {
    location: "westus",
    enableDataPartitions: false,
    storageConfiguration: {
      fileSystemName: "fileSystemName",
      storageIndexingConfiguration: { storageEventQueueName: "storage-events" },
      storageResourceId:
        "/subscriptions/ab309d4e-4c2e-4241-be2e-08e1c8dd4246/resourceGroups/rgname/providers/Microsoft.Storage/storageAccounts/accountname",
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateADicomService();
}

main().catch(console.error);
