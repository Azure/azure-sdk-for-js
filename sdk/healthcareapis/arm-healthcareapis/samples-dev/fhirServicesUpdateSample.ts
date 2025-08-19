// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patch FHIR Service details.
 *
 * @summary Patch FHIR Service details.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/fhirservices/FhirServices_Patch.json
 */

import type { FhirServicePatchResource } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAFhirService(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const fhirServiceName = "fhirservice1";
  const workspaceName = "workspace1";
  const fhirservicePatchResource: FhirServicePatchResource = {
    tags: { tagKey: "tagValue" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.fhirServices.beginUpdateAndWait(
    resourceGroupName,
    fhirServiceName,
    workspaceName,
    fhirservicePatchResource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAFhirService();
}

main().catch(console.error);
