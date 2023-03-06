// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Print the total of dedicated nodes in a node pool. Using the Rest Azure SDK Client
 * @azsdk-weight 1
 */

import { DefaultAzureCredential } from "@azure/identity";
import createBatchServiceClient, { isUnexpected, paginate } from "@azure/batch/rest";
import { config } from "dotenv";

config();

const endpoint = process.env.BATCH_ENDPOINT || "<endpoint>";
const client = createBatchServiceClient(endpoint, new DefaultAzureCredential());
const initialResult = await client.path("/nodecounts").get();

if (isUnexpected(initialResult)) {
  throw initialResult.body.error.message;
}

const poolNodeCounts = paginate(client, initialResult);

for await (const poolNodeCount of poolNodeCounts) {
  console.log(`PoolId: ${poolNodeCount.poolId} Total Dedicated: ${poolNodeCount.dedicated?.total}`);
}
