// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import { Constants } from "../../../src/common/constants";
import { getHeaders } from "../../../src/request/request";
import { CosmosHeaders, FeedOptions } from "../../../src";

describe("Test x-ms-documentdb-query-parallelizecrosspartitionquery header value", function () {
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
  it("If maxDegreeOfParallelism > 1 then x-ms-documentdb-query-parallelizecrosspartitionquery header should be true", async function () {
    const headers = await getHeadersFunc({ maxDegreeOfParallelism: 2 });
    assert.equal(
      headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery],
      true,
      "incorrect header value",
    );
  });
  it("If maxDegreeOfParallelism == 0 then x-ms-documentdb-query-parallelizecrosspartitionquery header should be null", async function () {
    const headers = await getHeadersFunc({ maxDegreeOfParallelism: 0 });
    assert.equal(
      headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery],
      null,
      "incorrect header value",
    );
  });
});
