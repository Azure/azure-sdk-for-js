// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteHibernateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteHibernate(
    "zydcprtgybcyilgugfwtfp",
    {
      executionParameters: {
        optimizationPreference: "Cost",
        retryPolicy: { retryCount: 19, retryWindowInMinutes: 3, onFailureAction: "Unknown" },
      },
      resources: {
        ids: [
          "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/vm1",
        ],
      },
      correlationId: "miqcvaudnngdedocspkthnoo",
    },
  );
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesExecuteHibernateMaximumSet();
}

main().catch(console.error);
