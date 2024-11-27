// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: getOperationStatus for a virtual machine
 *
 * @summary virtualMachinesGetOperationStatus: getOperationStatus for a virtual machine
 * x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesGetOperationStatusGeneratedByMinimumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DE84A209-5715-43E7-BC76-3E208A9A82C5";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationStatus(
    "htxxasfxaesuecem",
    {
      operationIds: ["01080d2f-1dca-4610-afb4-dd25eec1f3df"],
      correlationid: "01080d2f-1dca-4610-afb4-dd25eec1f3c1",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: getOperationStatus for a virtual machine
 *
 * @summary virtualMachinesGetOperationStatus: getOperationStatus for a virtual machine
 * x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesGetOperationStatus_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesGetOperationStatusGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DE84A209-5715-43E7-BC76-3E208A9A82C5";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationStatus("csay", {
    operationIds: ["01080d2f-1dca-4610-afb4-dd25eec1f3df"],
    correlationid: "01080d2f-1dca-4610-afb4-dd25eec1f3c1",
  });
  console.log(result);
}

async function main() {
  scheduledActionsVirtualMachinesGetOperationStatusGeneratedByMinimumSetRuleGeneratedByMaximumSetRule();
  scheduledActionsVirtualMachinesGetOperationStatusGeneratedByMinimumSetRule();
}

main().catch(console.error);
