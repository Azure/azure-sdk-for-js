// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesSubmitDeallocate: submitDeallocate for a virtual machine
 *
 * @summary virtualMachinesSubmitDeallocate: submitDeallocate for a virtual machine
 * x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesSubmitDeallocate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitDeallocateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DE84A209-5715-43E7-BC76-3E208A9A82C5";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitDeallocate(
    "ibfxsvilwrgqttuslbduzdtxcckdet",
    {
      schedule: {
        deadLine: "2024-07-12T18:06:53.361Z",
        timeZone: "zlcujrtgxtgyik",
        deadlineType: "Unknown",
      },
      executionParameters: {
        optimizationPreference: "Cost",
        retryPolicy: { retryCount: 30, retryWindowInMinutes: 27 },
      },
      resources: {
        ids: [
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource2",
        ],
      },
      correlationid: "23519o2f-1dca-4610-afb4-dd25eec1f34",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesSubmitDeallocate: submitDeallocate for a virtual machine
 *
 * @summary virtualMachinesSubmitDeallocate: submitDeallocate for a virtual machine
 * x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesSubmitDeallocate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitDeallocateGeneratedByMaximumSetRuleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DE84A209-5715-43E7-BC76-3E208A9A82C5";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitDeallocate(
    "qwfcdtmshnlownbkyh",
    {
      schedule: {
        deadLine: "2024-07-12T18:06:53.361Z",
        timeZone: "zlcujrtgxtgyik",
        deadlineType: "Unknown",
      },
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource2",
        ],
      },
      correlationid: "23519o2f-1dca-4610-afb4-dd25eec1f34",
    },
  );
  console.log(result);
}

async function main() {
  scheduledActionsVirtualMachinesSubmitDeallocateGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  scheduledActionsVirtualMachinesSubmitDeallocateGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
