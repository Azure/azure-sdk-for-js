// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { FabricClient } = require("@azure/arm-fabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements local CheckNameAvailability operations
 *
 * @summary implements local CheckNameAvailability operations
 * x-ms-original-file: 2023-11-01/FabricCapacities_CheckNameAvailability.json
 */
async function checkNameAvailabilityOfACapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.checkNameAvailability("westcentralus", {
    name: "azsdktest",
    type: "Microsoft.Fabric/capacities",
  });
  console.log(result);
}

async function main() {
  checkNameAvailabilityOfACapacity();
}

main().catch(console.error);
