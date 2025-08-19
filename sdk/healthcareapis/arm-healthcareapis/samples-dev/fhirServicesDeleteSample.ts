// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a FHIR Service.
 *
 * @summary Deletes a FHIR Service.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/fhirservices/FhirServices_Delete.json
 */

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAFhirService(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const fhirServiceName = "fhirservice1";
  const workspaceName = "workspace1";
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.fhirServices.beginDeleteAndWait(
    resourceGroupName,
    fhirServiceName,
    workspaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAFhirService();
}

main().catch(console.error);
