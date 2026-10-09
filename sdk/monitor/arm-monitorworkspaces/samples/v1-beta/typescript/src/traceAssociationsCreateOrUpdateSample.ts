// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces the trace association at the resource scope.
 *
 * @summary creates or replaces the trace association at the resource scope.
 * x-ms-original-file: 2026-09-03-preview/TraceAssociations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function traceAssociationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.traceAssociations.createOrUpdate(
    "rgazuremonitorworkspace",
    "Microsoft.Insights",
    "components",
    "appInsightsComponent",
    {
      properties: {
        azureMonitorWorkspaceResourceId:
          "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/rgazuremonitorworkspace/providers/Microsoft.Monitor/accounts/traceDestination",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await traceAssociationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
