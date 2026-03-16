// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the availability of a Front Door subdomain.
 *
 * @summary check the availability of a Front Door subdomain.
 * x-ms-original-file: 2025-10-01/CheckFrontdoorNameAvailabilityWithSubscription.json
 */
async function checkNameAvailabilityWithSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.frontDoorNameAvailabilityWithSubscription.check({
    name: "sampleName",
    type: "Microsoft.Network/frontDoors/frontendEndpoints",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailabilityWithSubscription();
}

main().catch(console.error);
