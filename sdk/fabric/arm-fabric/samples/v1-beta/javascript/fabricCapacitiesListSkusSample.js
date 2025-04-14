// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { FabricClient } = require("@azure/arm-fabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list eligible SKUs for Microsoft Fabric resource provider
 *
 * @summary list eligible SKUs for Microsoft Fabric resource provider
 * x-ms-original-file: 2023-11-01/FabricCapacities_ListSkus.json
 */
async function listEligibleSKUsForANewCapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.fabricCapacities.listSkus()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listEligibleSKUsForANewCapacity();
}

main().catch(console.error);
