// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Print the total of dedicated nodes in a node pool. Using the classic Azure SDK Client
 * @azsdk-weight 3
 */

import { BatchServiceClientClient } from "@azure/batch";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "dotenv";

config();

const endpoint = process.env.BATCH_ENDPOINT || "<endpoint>";

const client = new BatchServiceClientClient(endpoint, new DefaultAzureCredential());

const poolNodeCounts = await client.account.listPoolNodeCounts();

for await (const poolNodeCount of poolNodeCounts) {
  console.log(`PoolId: ${poolNodeCount.poolId} Total Dedicated: ${poolNodeCount.dedicated?.total}`);
}
