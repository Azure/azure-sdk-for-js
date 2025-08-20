// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Constants } from "$internal/common/constants.js";
import { getHeaders } from "$internal/request/request.js";
import type { CosmosHeaders, FeedOptions } from "@azure/cosmos";
import { describe, it, assert } from "vitest";

describe("Test x-ms-documentdb-query-parallelizecrosspartitionquery header value", () => {
  const mockedEndpoint = "https://localhost:8081";
  function getHeadersFunc(feedOptions: FeedOptions): Promise<CosmosHeaders> {
    return getHeaders({
      clientOptions: { endpoint: mockedEndpoint },
      defaultHeaders: null,
      verb: null,
      path: null,
      resourceId: null,
      resourceType: null,
      options: feedOptions,
      partitionKeyRangeId: null,
      useMultipleWriteLocations: null,
      partitionKey: null,
    });
  }

  it("If maxDegreeOfParallelism > 1 then x-ms-documentdb-query-parallelizecrosspartitionquery header should be true", async () => {
    const headers = await getHeadersFunc({ maxDegreeOfParallelism: 2 });
    assert.equal(
      headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery],
      true,
      "incorrect header value",
    );
  });

  it("If maxDegreeOfParallelism == 0 then x-ms-documentdb-query-parallelizecrosspartitionquery header should be null", async () => {
    const headers = await getHeadersFunc({ maxDegreeOfParallelism: 0 });
    assert.equal(
      headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery],
      null,
      "incorrect header value",
    );
  });
});
