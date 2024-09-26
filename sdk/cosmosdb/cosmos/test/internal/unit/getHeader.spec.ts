// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import assert from "assert";
import { Constants } from "../../../src/common/constants";
import { getHeaders } from "../../../src/request/request";
import { CosmosHeaders, FeedOptions } from "../../../src";

describe("getHeader Test", function () {
  const mockedEndpoint = "https://localhost:8081";
  function getHeadersFunc (feedOptions:FeedOptions) : Promise<CosmosHeaders> {
    return getHeaders({
      clientOptions: {endpoint:mockedEndpoint},
      defaultHeaders:null,
      verb:null,
      path:null,
      resourceId:null,
      resourceType:null,
      options: feedOptions,
      partitionKeyRangeId:null,
      useMultipleWriteLocations:null,
      partitionKey:null,
    });
  }
  it("When maxDegreeOfParallelism > 1 , headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] should be true", async function () {
    const headers = await getHeadersFunc({maxDegreeOfParallelism:2});
    assert.equal(headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery],true,"incorrect header");
  });
  it("When maxDegreeOfParallelism == 0 , headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] should be null", async function () {
    const headers = await getHeadersFunc({maxDegreeOfParallelism:0});
    assert.equal(headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery],null,"incorrect header");
  });
  it("When maxDegreeOfParallelism < 0 , headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery] should be null", async function () {
    const headers = await getHeadersFunc({maxDegreeOfParallelism:-1});
    assert.equal(headers[Constants.HttpHeaders.ParallelizeCrossPartitionQuery],null,"incorrect header");
  });
});
