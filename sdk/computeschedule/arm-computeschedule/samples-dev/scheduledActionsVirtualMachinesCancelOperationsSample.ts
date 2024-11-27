// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: cancelOperations for a virtual machine
 *
 * @summary virtualMachinesCancelOperations: cancelOperations for a virtual machine
 * x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DE84A209-5715-43E7-BC76-3E208A9A82C5";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations("tdxypnse", {
    operationIds: ["23480d2f-1dca-4610-afb4-dd25eec1f34r"],
    correlationid: "01080d2f-1dca-4610-afb4-dd25eec1f3c1",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: cancelOperations for a virtual machine
 *
 * @summary virtualMachinesCancelOperations: cancelOperations for a virtual machine
 * x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsGeneratedByMaximumSetRuleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DE84A209-5715-43E7-BC76-3E208A9A82C5";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations("lwapkjsbltcqp", {
    operationIds: ["23480d2f-1dca-4610-afb4-dd25eec1f34r"],
    correlationid: "01080d2f-1dca-4610-afb4-dd25eec1f3c1",
  });
  console.log(result);
}

async function main() {
  scheduledActionsVirtualMachinesCancelOperationsGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  scheduledActionsVirtualMachinesCancelOperationsGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
