// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { RouterWorker, RouterClient } from "../../../src";
import {
  workerRequest,
  queueRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest
} from "../../internal/utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../../internal/utils/constants";

describe("RouterClient", function() {
  let recorder: Recorder;
  let client: RouterClient;
  let request: RouterWorker = workerRequest;

  // Order matters (registration idempotency)
  describe("Worker Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({ client, recorder } = createRecordedRouterClientWithConnectionString(this));

      await client.createDistributionPolicy(distributionPolicyRequest.id!, {
        patch: distributionPolicyRequest
      });
      await client.createExceptionPolicy(exceptionPolicyRequest.id!, {
        patch: exceptionPolicyRequest
      });
      await client.createQueue(queueRequest.id!, { patch: queueRequest });
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        // unused
      }
    });

    this.afterAll(async function(this: Context) {
      await client.deleteQueue(queueRequest.id!, {});
      await client.deleteExceptionPolicy(exceptionPolicyRequest.id!, {});
      await client.deleteDistributionPolicy(distributionPolicyRequest.id!, {});
    });

    it("should create a worker", async function() {
      const result = await client.createWorker(request.id!, { patch: request });

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.totalCapacity, request.totalCapacity);
    }).timeout(timeoutMs);

    it("should get a worker", async function() {
      const response: RouterWorker = await client.createWorker(request.id!, { patch: request });

      const result = await client.getWorker(request.id!);

      assert.equal(result.id, response.id);
      assert.equal(result.totalCapacity, response.totalCapacity);
      assert.deepEqual(result.channelConfigurations, response.channelConfigurations);

      // Should we just do this instead?
      //     assert.deepEqual(result, response);
    }).timeout(timeoutMs);

    it("should update a worker", async function() {
      var response: RouterWorker = await client.createWorker(request.id!, { patch: request });

      const patch = { ...response, totalCapacity: 1010 };
      const result = await client.updateWorker(response.id!, { patch });

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.totalCapacity, patch.totalCapacity);
    }).timeout(timeoutMs);

    it("should register and deregister a worker", async function() {
      var response: RouterWorker = await client.createWorker(request.id!, {
        patch: request
      });

      // const patch = { ...response, totalCapacity: 1010 };
      let result = await client.registerWorker(response.id!);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.availableForOffers, true);

      result = await client.deregisterWorker(response.id!, {});

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.availableForOffers, false);
    }).timeout(timeoutMs);

    it("should delete a worker", async function() {
      await client.deregisterWorker(request.id!, {});
      const result = await client.deleteWorker(request.id!, {});

      assert.isDefined(result); // TODO: What validation criteria are there for a delete call?
    }).timeout(timeoutMs);
  });
});
