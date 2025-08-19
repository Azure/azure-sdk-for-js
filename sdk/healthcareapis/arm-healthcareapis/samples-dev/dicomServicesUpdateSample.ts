// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DicomServicePatchResource } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patch DICOM Service details.
 *
 * @summary Patch DICOM Service details.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/dicomservices/DicomServices_Patch.json
 */
async function updateADicomservice(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const dicomServiceName = "blue";
  const workspaceName = "workspace1";
  const dicomservicePatchResource: DicomServicePatchResource = {
    tags: { tagKey: "tagValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.dicomServices.beginUpdateAndWait(
    resourceGroupName,
    dicomServiceName,
    workspaceName,
    dicomservicePatchResource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateADicomservice();
}

main().catch(console.error);
