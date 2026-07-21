// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementClient } from "@azure/arm-resiliencemanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this initiates a new Failover operation on this Drill Run.
 *
 * @summary this initiates a new Failover operation on this Drill Run.
 * x-ms-original-file: 2026-04-01-preview/DrillRuns_FailOver_MaximumSet_Gen.json
 */
async function drillRunsFailOverMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  await client.drillRuns.failOver(
    "sampleServiceGroupName",
    "qmn",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
    {
      failoverProperties: {
        failoverDirection: "FromSpecificLocations",
        failoverRequestProperties: { sourceLocations: ["westus"] },
      },
      autoFailover: "Enable",
    },
  );
}

async function main(): Promise<void> {
  await drillRunsFailOverMaximumSet();
}

main().catch(console.error);
