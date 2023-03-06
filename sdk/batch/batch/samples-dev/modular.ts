// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Print the total of dedicated nodes in a node pool. Using the Modular Azure SDK Client
 * @azsdk-weight 2
 */

import { DefaultAzureCredential } from "@azure/identity";
import { createBatchServiceClient, listPoolNodeCounts } from "@azure/batch/api";
import { config } from "dotenv";

config();

const endpoint = process.env.BATCH_ENDPOINT || "<endpoint>";

const context = createBatchServiceClient(endpoint, new DefaultAzureCredential());
const poolNodeCounts = await listPoolNodeCounts(context);

for await (const poolNodeCount of poolNodeCounts) {
  console.log(`PoolId: ${poolNodeCount.poolId} Total Dedicated: ${poolNodeCount.dedicated?.total}`);
}
