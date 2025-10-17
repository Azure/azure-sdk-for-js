// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available run commands for a subscription in a location.
 *
 * @summary lists all available run commands for a subscription in a location.
 * x-ms-original-file: 2025-04-01/runCommandExamples/RunCommand_List.json
 */
async function virtualMachineRunCommandList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineRunCommandsOperationGroup.list("SoutheastAsia")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineRunCommandList();
}

main().catch(console.error);
