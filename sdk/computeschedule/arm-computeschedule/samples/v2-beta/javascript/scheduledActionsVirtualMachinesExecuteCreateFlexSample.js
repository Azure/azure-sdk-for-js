// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesExecuteCreateFlex: Execute create operation for a batch of virtual machines with flex properties, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteCreateFlex: Execute create operation for a batch of virtual machines with flex properties, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesExecuteCreateFlex_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateFlexMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreateFlex(
    "bnadpwmpjyfduxue",
    {
      resourceConfigParameters: {
        baseProfile: {},
        resourceOverrides: [{}],
        resourceCount: 24,
        resourcePrefix: "irskthgchddyuddpqaxlw",
        flexProperties: {
          vmSizeProfiles: [
            { name: "bmzylbvz", rank: 24 },
            { name: "bmzylbvz", rank: 24 },
          ],
          osType: "Windows",
          priorityProfile: { type: "Regular", allocationStrategy: "LowestPrice" },
          zoneAllocationPolicy: {
            distributionStrategy: "BestEffortSingleZone",
            zonePreferences: [{ zone: "kmcvkimwmqwrhfznrqs", rank: 21 }],
          },
        },
      },
      executionParameters: {
        optimizationPreference: "Cost",
        retryPolicy: { retryCount: 19, retryWindowInMinutes: 3, onFailureAction: "Unknown" },
      },
      correlationId: "dnncbbqrhnrwcfqrathnexdpcryo",
    },
  );
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesExecuteCreateFlexMaximumSet();
}

main().catch(console.error);
