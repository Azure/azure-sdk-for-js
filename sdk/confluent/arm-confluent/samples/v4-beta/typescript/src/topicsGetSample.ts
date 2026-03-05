// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get confluent topic by Name
 *
 * @summary get confluent topic by Name
 * x-ms-original-file: 2025-08-18-preview/Topics_Get_MaximumSet_Gen.json
 */
async function topicsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.topics.get(
    "rgconfluent",
    "mwvtthpz",
    "gjcsgothfog",
    "cbgic",
    "bspwihoyrewjny",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await topicsGetMaximumSet();
}

main().catch(console.error);
