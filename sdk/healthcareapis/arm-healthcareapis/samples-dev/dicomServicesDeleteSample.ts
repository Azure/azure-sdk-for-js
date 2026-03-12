// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a DICOM Service.
 *
 * @summary Deletes a DICOM Service.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/dicomservices/DicomServices_Delete.json
 */

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteADicomservice(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const dicomServiceName = "blue";
  const workspaceName = "workspace1";
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.dicomServices.beginDeleteAndWait(
    resourceGroupName,
    dicomServiceName,
    workspaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteADicomservice();
}

main().catch(console.error);
