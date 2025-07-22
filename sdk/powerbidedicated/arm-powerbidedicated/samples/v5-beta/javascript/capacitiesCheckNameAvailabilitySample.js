// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PowerBIDedicatedClient } = require("@azure/arm-powerbidedicated");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to check the name availability in the target location.
 *
 * @summary check the name availability in the target location.
 * x-ms-original-file: 2021-01-01/checkNameAvailability.json
 */
async function checkNameAvailabilityOfACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new PowerBIDedicatedClient(credential, subscriptionId);
  const result = await client.capacities.checkNameAvailability("West US", {
    name: "azsdktest",
    type: "Microsoft.PowerBIDedicated/capacities",
  });
  console.log(result);
}

async function main() {
  await checkNameAvailabilityOfACapacity();
}

main().catch(console.error);
