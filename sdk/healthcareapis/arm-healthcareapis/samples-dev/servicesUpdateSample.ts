// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the metadata of a service instance.
 *
 * @summary Update the metadata of a service instance.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/legacy/ServicePatch.json
 */

import type { ServicesPatchDescription } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchService(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "rg1";
  const resourceName = "service1";
  const servicePatchDescription: ServicesPatchDescription = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.beginUpdateAndWait(
    resourceGroupName,
    resourceName,
    servicePatchDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchService();
}

main().catch(console.error);
