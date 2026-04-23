// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-computebulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsVirtualMachinesGetOperationStatusMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.virtualMachinesGetOperationStatus(
    "nvqntfatevevaguuejtkseft",
    { operationIds: ["wfrelkkjfzzlktrpmekcmwbiolto"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesGetOperationStatus_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsVirtualMachinesGetOperationStatusMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.virtualMachinesGetOperationStatus(
    "bxvxospqjdkugnatlllrvjrud",
    { operationIds: ["wfrelkkjfzzlktrpmekcmwbiolto"] },
  );
  console.log(result);
}

async function main() {
  await virtualMachineBulkOperationsVirtualMachinesGetOperationStatusMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await virtualMachineBulkOperationsVirtualMachinesGetOperationStatusMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
