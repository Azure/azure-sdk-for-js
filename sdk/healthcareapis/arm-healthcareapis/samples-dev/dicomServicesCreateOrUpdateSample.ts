// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a DICOM Service resource with the specified parameters.
 *
 * @summary Creates or updates a DICOM Service resource with the specified parameters.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/dicomservices/DicomServices_Create.json
 */

import type { DicomService } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateADicomService(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const workspaceName = "workspace1";
  const dicomServiceName = "blue";
  const dicomservice: DicomService = {
    enableDataPartitions: false,
    location: "westus",
    storageConfiguration: {
      fileSystemName: "fileSystemName",
      storageResourceId:
        "/subscriptions/ab309d4e-4c2e-4241-be2e-08e1c8dd4246/resourceGroups/rgname/providers/Microsoft.Storage/storageAccounts/accountname",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.dicomServices.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    dicomServiceName,
    dicomservice,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateADicomService();
}

main().catch(console.error);
