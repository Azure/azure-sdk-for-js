// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if the peering service provider is present within 1000 miles of customer's location
 *
 * @summary checks if the peering service provider is present within 1000 miles of customer's location
 * x-ms-original-file: 2025-05-01/CheckServiceProviderAvailability.json
 */
async function checkIfPeeringServiceProviderIsAvailableInCustomerLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.checkServiceProviderAvailability({
    peeringServiceLocation: "peeringServiceLocation1",
    peeringServiceProvider: "peeringServiceProvider1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkIfPeeringServiceProviderIsAvailableInCustomerLocation();
}

main().catch(console.error);
