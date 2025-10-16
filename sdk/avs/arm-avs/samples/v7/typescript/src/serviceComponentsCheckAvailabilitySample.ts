// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to return service component availability
 *
 * @summary return service component availability
 * x-ms-original-file: 2025-09-01/ServiceComponents_CheckAvailability.json
 */
async function serviceComponentsCheckAvailabilitySpecificComponent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.serviceComponents.checkAvailability("westus2", "all");
}

async function main(): Promise<void> {
  await serviceComponentsCheckAvailabilitySpecificComponent();
}

main().catch(console.error);
