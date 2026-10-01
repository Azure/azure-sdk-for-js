// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource that need to be created for a service.
 *
 * @summary gets a private link resource that need to be created for a service.
 * x-ms-original-file: 2025-04-01-preview/legacy/PrivateLinkResourceGet.json
 */
async function privateLinkResourcesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get("rgname", "service1", "fhir");
  console.log(result);
}

async function main(): Promise<void> {
  await privateLinkResourcesGet();
}

main().catch(console.error);
