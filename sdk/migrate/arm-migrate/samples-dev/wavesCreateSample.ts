// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MigrateClient } from "@azure/arm-migrate";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Wave
 *
 * @summary create a Wave
 * x-ms-original-file: 2026-06-01-preview/Waves_Create_MaximumSet_Gen.json
 */
async function wavesCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F628DFC8-CF82-400F-A6A9-ED3CEC3ECEAD";
  const client = new MigrateClient(credential, subscriptionId);
  const result = await client.waves.create("rgwaves", "project1", "wave1", {
    properties: {
      description: "xajbtsvcadsmuttrdphivryx",
      displayName: "gbrjctlozlwfftuzxov",
      arg: { query: "wivfwbmo" },
      plannedStartDate: new Date("2026-02-12T12:54:26.848Z"),
      plannedCompletionDate: new Date("2026-02-12T12:54:26.848Z"),
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await wavesCreateMaximumSet();
}

main().catch(console.error);
