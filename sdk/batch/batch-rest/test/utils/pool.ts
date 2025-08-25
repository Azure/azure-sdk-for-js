// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import type { BatchClient, BatchNodeOutput } from "@azure-rest/batch";
import { isUnexpected, paginate } from "@azure-rest/batch";
import { waitForNotNull } from "./helpers.js";

export function waitForNodesToStart(
  poolId: string,
  batchClient: BatchClient,
): Promise<BatchNodeOutput[]> {
  const listNodes = async (): Promise<BatchNodeOutput[] | null> => {
    const listResult = await batchClient.path("/pools/{poolId}/nodes", poolId).get();
    if (isUnexpected(listResult)) {
      assert.fail(`Received unexpected status code from list compute nodes: ${listResult.status}
          Response Body: ${listResult.body.message}`);
    }

    const paginateResponse = paginate(batchClient, listResult);
    const nodeList = [];
    for await (const node of paginateResponse) {
      nodeList.push(node);
    }
    if (nodeList.length > 0) {
      return nodeList;
    }
    return null;
  };

  return waitForNotNull(listNodes);
}
