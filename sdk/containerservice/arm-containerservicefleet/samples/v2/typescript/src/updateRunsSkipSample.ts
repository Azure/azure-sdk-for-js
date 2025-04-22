// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to skips one or a combination of member/group/stage/afterStageWait(s) of an update run.
 *
 * @summary skips one or a combination of member/group/stage/afterStageWait(s) of an update run.
 * x-ms-original-file: 2025-03-01/UpdateRuns_Skip.json
 */
async function skipsOneOrMoreMemberOrGroupOrStageOrAfterStageWaitSOfAnUpdateRun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.skip("rg1", "fleet1", "run1", {
    targets: [
      { type: "Member", name: "member-one" },
      { type: "AfterStageWait", name: "stage1" },
    ],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to skips one or a combination of member/group/stage/afterStageWait(s) of an update run.
 *
 * @summary skips one or a combination of member/group/stage/afterStageWait(s) of an update run.
 * x-ms-original-file: 2025-03-01/UpdateRuns_Skip_MaximumSet_Gen.json
 */
async function skipsOneOrMoreMemberOrGroupOrStageOrAfterStageWaitSOfAnUpdateRunGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.skip(
    "rgfleets",
    "fleet1",
    "fleet1",
    {
      targets: [
        { type: "Member", name: "member-one" },
        { type: "AfterStageWait", name: "stage1" },
      ],
    },
    { ifMatch: "rncfubdzrhcihvpqflbsjvoau" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await skipsOneOrMoreMemberOrGroupOrStageOrAfterStageWaitSOfAnUpdateRun();
  await skipsOneOrMoreMemberOrGroupOrStageOrAfterStageWaitSOfAnUpdateRunGeneratedByMaximumSetRule();
}

main().catch(console.error);
