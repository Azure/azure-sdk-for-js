// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a list of Capability Type resources for given Target Type and location.
 *
 * @summary get a list of Capability Type resources for given Target Type and location.
 * x-ms-original-file: 2025-01-01/CapabilityTypes_List.json
 */
async function listAllCapabilityTypesForAVirtualMachineTargetResourceOnWestus2Location() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilityTypes.list("westus2", "Microsoft-VirtualMachine")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllCapabilityTypesForAVirtualMachineTargetResourceOnWestus2Location();
}

main().catch(console.error);
