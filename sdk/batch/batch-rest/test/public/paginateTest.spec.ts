// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createBatchClient, createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import { BatchServiceClient, CertificatesAddParameters, isUnexpected, paginate, PoolAddParameters, PoolListParameters } from "../../src";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets";
import { wait } from "./utils/wait";
import { fail } from "assert";
import { create } from "domain";

const _SUFFIX = Math.random()
  .toString(16)
  .substr(2, 4);

function getPoolName(type: string) {
  return `jssdktest-${type}-${_SUFFIX}`;
}

describe("Pool Operations Test", () => {
  let batchClient = createBatchClient("AAD");

  it.only("List Batch Pools through helper paginate", async function () {
    try {
      let result;

      let queryParams: PoolListParameters = { queryParameters: { maxresults: 2 } }
      result = await batchClient.path("/pools").get(queryParams);

      if (isUnexpected(result)) {
        fail("unexpected response");
      }

      const paginateResponse = paginate(batchClient, result);
      batchClient.pipeline.removePolicy({ name: "ApiVersionPolicy" });
      // let foo;
      // do {
      //   foo = await paginateResponse.next();
      //   console.log(foo);
      // }
      // while (!foo.done)
      
      
      for await (const data of paginateResponse.byPage()) {
        console.log("Passthrough");
        for (const pool of data) {
          console.log(`Pool: ${pool.id}`);
        }
      }
    }
    //assert.equal(result.status, "200");
    catch (error) {
      console.log(error);
      throw error;
    }

  })

  it("List Batch Pools", async function () {
    // Use assert to test your assumptions

    const poolParams: PoolListParameters = {
      queryParameters: {
        maxresults: 4
      },
    }

    try {
      let continuationToken = "";
      let result;

      result = await batchClient.path("/pools").get({
        queryParameters: {
          maxresults: 2
        }
      });

      if (isUnexpected(result)) {
        fail("foo");
      }

      result.body.value?.forEach((element) => console.log(element.id));

      continuationToken = result.body["odata.nextLink"]!;

      // const paginateResponse = paginate(batchClient, result);
      // for await (const data of paginateResponse.byPage({maxPageSize: 2})) {
      //   console.log(data);
      //   } 

      batchClient.pipeline.removePolicy({ name: "ApiVersionPolicy" });
      while (continuationToken != null) {
        result = await batchClient.pathUnchecked(continuationToken).get({
          queryParameters: {
            maxresults: 2
          }
        });

        if (isUnexpected(result)) {
          fail("foo");
        }

        console.log(result.body);
        continuationToken = result.body["odata.nextLink"]!;
      }
    }
    //assert.equal(result.status, "200");
    catch (error) {
      console.log(error);
      throw error;
    }

  })
});
