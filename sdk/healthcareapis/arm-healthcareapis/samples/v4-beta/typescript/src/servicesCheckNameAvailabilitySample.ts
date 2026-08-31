// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check if a service instance name is available.
 *
 * @summary check if a service instance name is available.
 * x-ms-original-file: 2025-04-01-preview/CheckNameAvailabilityPost.json
 */
async function checkNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.services.checkNameAvailability({
    name: "serviceName",
    type: "Microsoft.HealthcareApis/services",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
