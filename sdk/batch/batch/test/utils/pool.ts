// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchClient, BatchNode, BatchPool } from "../../src/index.js";
import { waitForNotNull } from "./helpers.js";

export async function waitForNodesToStart(
  poolId: string,
  batchClient: BatchClient,
): Promise<BatchNode[]> {
  const listNodes = async (): Promise<BatchNode[] | null> => {
    const nodeList: BatchNode[] = [];
    for await (const node of batchClient.listNodes(poolId)) {
      nodeList.push(node);
    }
    if (nodeList.length > 0) {
      return nodeList;
    }
    return null;
  };

  return waitForNotNull(listNodes);
}

export async function waitForPoolToBeReady(
  poolId: string,
  batchClient: BatchClient,
): Promise<BatchPool> {
  const getSteadyPool = async (): Promise<BatchPool | null> => {
    const pool = await batchClient.getPool(poolId);
    if (pool.allocationState === "steady") {
      return pool;
    }
    return null;
  };

  return waitForNotNull(getSteadyPool);
}
