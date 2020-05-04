// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { HttpsPipeline, PipelinePolicy } from "../src/pipeline";
import { HttpsClient } from "../src/interfaces";

describe("HttpsPipeline", function() {
  it("Newly created pipeline has no policies", function() {
    const pipeline = HttpsPipeline.create();
    assert.isEmpty(pipeline.getOrderedPolicies());
  });

  it("addPolicy adds policy to the list", function() {
    const pipeline = HttpsPipeline.create();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    pipeline.addPolicy(testPolicy);
    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 1);
    assert.strictEqual(testPolicy, policies[0]);
  });

  it("addPolicy adds policies in order", function() {
    const pipeline = HttpsPipeline.create();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test2"
    };
    pipeline.addPolicy(testPolicy);
    pipeline.addPolicy(testPolicy2);
    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 2);
    assert.strictEqual(testPolicy, policies[0]);
    assert.strictEqual(testPolicy2, policies[1]);
  });

  // TODO: add policies into phases, add before/after rules
  // negative test cases: circular loops, bad phase names,

  it("removePolicy removes named policy", function() {
    const pipeline = HttpsPipeline.create();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test2"
    };
    const testPolicy3: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test3"
    };
    pipeline.addPolicy(testPolicy);
    pipeline.addPolicy(testPolicy2);
    pipeline.addPolicy(testPolicy3);

    const removedPolicies = pipeline.removePolicy({ name: testPolicy2.name });
    assert.strictEqual(removedPolicies.length, 1);
    assert.strictEqual(testPolicy2, removedPolicies[0]);

    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 2);
    assert.strictEqual(testPolicy, policies[0]);
    assert.strictEqual(testPolicy3, policies[1]);
  });

  it("removePolicy removes policies in phase", function() {
    const pipeline = HttpsPipeline.create();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test2"
    };
    const testPolicy3: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test3"
    };
    pipeline.addPolicy(testPolicy, { duringPhase: "Retry" });
    pipeline.addPolicy(testPolicy2);
    pipeline.addPolicy(testPolicy3, { duringPhase: "Retry" });

    const removedPolicies = pipeline.removePolicy({ phase: "Retry" });
    assert.strictEqual(removedPolicies.length, 2);
    assert.strictEqual(testPolicy, removedPolicies[0]);
    assert.strictEqual(testPolicy3, removedPolicies[1]);

    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 1);
    assert.strictEqual(testPolicy2, policies[0]);
  });

  it("clone creates separate copy of pipeline", function() {
    const pipeline = HttpsPipeline.create();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    pipeline.addPolicy(testPolicy);

    const pipeline2 = pipeline.clone();

    pipeline.removePolicy({ name: testPolicy.name });

    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test2"
    };
    pipeline.addPolicy(testPolicy2);

    const testPolicy3: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test3"
    };

    pipeline2.addPolicy(testPolicy3);

    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 1);
    assert.strictEqual(testPolicy2, policies[0]);

    const pipeline2Policies = pipeline2.getOrderedPolicies();
    assert.strictEqual(pipeline2Policies.length, 2);
    assert.strictEqual(testPolicy, pipeline2Policies[0]);
    assert.strictEqual(testPolicy3, pipeline2Policies[1]);
  });

  it("Send request composes policies in order", async function() {
    const pipeline = HttpsPipeline.create();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => {
        assert.strictEqual(request.url, "initialUrl");
        return next({ ...request, url: "afterTest" });
      },
      name: "test"
    };
    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => {
        assert.strictEqual(request.url, "afterTest");
        return next({ ...request, url: "afterTest2" });
      },
      name: "test2"
    };
    const testPolicy3: PipelinePolicy = {
      sendRequest: (request, next) => {
        assert.strictEqual(request.url, "afterTest2");
        return next({ ...request, url: "afterTest3" });
      },
      name: "test3"
    };

    pipeline.addPolicy(testPolicy);
    pipeline.addPolicy(testPolicy2);
    pipeline.addPolicy(testPolicy3);

    const testHttpsClient: HttpsClient = {
      sendRequest: async (request) => {
        assert.strictEqual(request.url, "afterTest3");
        return {
          request,
          status: 200
        };
      }
    };

    const response = await pipeline.sendRequest(testHttpsClient, { url: "initialUrl" });
    assert.strictEqual(response.request.url, "afterTest3");
    assert.strictEqual(response.status, 200);
  });
});
