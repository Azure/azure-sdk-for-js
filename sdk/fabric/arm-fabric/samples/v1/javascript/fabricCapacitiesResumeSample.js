// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { FabricClient } = require("@azure/arm-fabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resume operation of the specified Fabric capacity instance.
 *
 * @summary resume operation of the specified Fabric capacity instance.
 * x-ms-original-file: 2023-11-01/FabricCapacities_Resume.json
 */
async function resumeCapacity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "548B7FB7-3B2A-4F46-BB02-66473F1FC22C";
  const client = new FabricClient(credential, subscriptionId);
  const result = await client.fabricCapacities.resume("TestRG", "azsdktest");
  console.log(result);
}

async function main() {
  resumeCapacity();
}

main().catch(console.error);
