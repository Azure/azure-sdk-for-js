// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import {
  createEmptyPipeline,
  PipelinePolicy,
  HttpsClient,
  createPipelineRequest,
  createHttpHeaders,
  createPipelineFromOptions
} from "../src";

describe("HttpsPipeline", function() {
  it("Newly created pipeline has no policies", function() {
    const pipeline = createEmptyPipeline();
    assert.isEmpty(pipeline.getOrderedPolicies());
  });

  it("addPolicy adds policy to the list", function() {
    const pipeline = createEmptyPipeline();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    pipeline.addPolicy(testPolicy);
    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 1);
    assert.strictEqual(policies[0], testPolicy);
  });

  it("addPolicy adds policies in order", function() {
    const pipeline = createEmptyPipeline();
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
    assert.strictEqual(policies[0], testPolicy);
    assert.strictEqual(policies[1], testPolicy2);
  });

  it("addPolicy honors beforePolicies", function() {
    const pipeline = createEmptyPipeline();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test2"
    };
    pipeline.addPolicy(testPolicy);
    pipeline.addPolicy(testPolicy2, { beforePolicies: [testPolicy.name] });
    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 2);
    assert.strictEqual(policies[0], testPolicy2);
    assert.strictEqual(policies[1], testPolicy);
  });

  it("getOrderedPolicies honors afterPolicies", function() {
    const pipeline = createEmptyPipeline();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test2"
    };
    pipeline.addPolicy(testPolicy, { afterPolicies: [testPolicy2.name] });
    pipeline.addPolicy(testPolicy2);
    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 2);
    assert.strictEqual(policies[0], testPolicy2);
    assert.strictEqual(policies[1], testPolicy);
  });

  it("addPolicy throws on duplicate policy name", function() {
    const pipeline = createEmptyPipeline();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    const testPolicy2: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };
    pipeline.addPolicy(testPolicy);
    pipeline.addPolicy(testPolicy2);
    assert.throws(() => {
      pipeline.getOrderedPolicies();
    }, /Duplicate policy/);
  });

  it("getOrderedPolicies throws on circular reference", function() {
    const pipeline = createEmptyPipeline();
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
    pipeline.addPolicy(testPolicy, { afterPolicies: [testPolicy2.name] });
    pipeline.addPolicy(testPolicy2, { afterPolicies: [testPolicy3.name] });
    pipeline.addPolicy(testPolicy3, { afterPolicies: [testPolicy.name] });
    assert.throws(() => {
      pipeline.getOrderedPolicies();
    }, /cycle/);
  });

  it("addPolicy orders within a phase correctly", function() {
    const pipeline = createEmptyPipeline();
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
    pipeline.addPolicy(testPolicy, { phase: "Retry" });
    pipeline.addPolicy(testPolicy2, { afterPhase: "Retry" });
    pipeline.addPolicy(testPolicy3, { phase: "Retry" });

    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 3);
    assert.strictEqual(policies[0], testPolicy);
    assert.strictEqual(policies[1], testPolicy3);
    assert.strictEqual(policies[2], testPolicy2);
  });

  it("phases are ordered correctly", function() {
    const pipeline = createEmptyPipeline();
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
    pipeline.addPolicy(testPolicy, { phase: "Retry" });
    pipeline.addPolicy(testPolicy2, { phase: "Serialize" });
    pipeline.addPolicy(testPolicy3);

    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 3);
    assert.strictEqual(policies[0], testPolicy3);
    assert.strictEqual(policies[1], testPolicy2);
    assert.strictEqual(policies[2], testPolicy);
  });

  it("addPolicy throws on both phase and afterPhase specified", function() {
    const pipeline = createEmptyPipeline();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };

    assert.throws(() => {
      pipeline.addPolicy(testPolicy, { phase: "Retry", afterPhase: "Serialize" });
    }, /inside a phase cannot specify afterPhase/);
  });

  it("addPolicy throws on invalid phase name", function() {
    const pipeline = createEmptyPipeline();
    const testPolicy: PipelinePolicy = {
      sendRequest: (request, next) => next(request),
      name: "test"
    };

    assert.throws(() => {
      pipeline.addPolicy(testPolicy, { phase: "Cerealize" as any });
    }, /Invalid phase name/);

    assert.throws(() => {
      pipeline.addPolicy(testPolicy, { afterPhase: "Cerealize" as any });
    }, /Invalid phase name/);
  });

  // bad phase name should throw

  it("removePolicy removes named policy", function() {
    const pipeline = createEmptyPipeline();
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
    assert.strictEqual(policies[0], testPolicy);
    assert.strictEqual(policies[1], testPolicy3);
  });

  it("removePolicy removes policies in phase", function() {
    const pipeline = createEmptyPipeline();
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
    pipeline.addPolicy(testPolicy, { phase: "Retry" });
    pipeline.addPolicy(testPolicy2);
    pipeline.addPolicy(testPolicy3, { phase: "Retry" });

    const removedPolicies = pipeline.removePolicy({ phase: "Retry" });
    assert.strictEqual(removedPolicies.length, 2);
    assert.strictEqual(removedPolicies[0], testPolicy);
    assert.strictEqual(removedPolicies[1], testPolicy3);

    const policies = pipeline.getOrderedPolicies();
    assert.strictEqual(policies.length, 1);
    assert.strictEqual(policies[0], testPolicy2);
  });

  it("clone creates separate copy of pipeline", function() {
    const pipeline = createEmptyPipeline();
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
    assert.strictEqual(policies[0], testPolicy2);

    const pipeline2Policies = pipeline2.getOrderedPolicies();
    assert.strictEqual(pipeline2Policies.length, 2);
    assert.strictEqual(pipeline2Policies[0], testPolicy);
    assert.strictEqual(pipeline2Policies[1], testPolicy3);
  });

  it("Send request composes policies in order", async function() {
    const pipeline = createEmptyPipeline();
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
          headers: createHttpHeaders(),
          status: 200
        };
      }
    };

    const response = await pipeline.sendRequest(
      testHttpsClient,
      createPipelineRequest({ url: "initialUrl" })
    );
    assert.strictEqual(response.request.url, "afterTest3");
    assert.strictEqual(response.status, 200);
  });

  describe("createPipelineFromOptions", function() {
    it("can issue successful requests", async function() {
      const testHttpsClient: HttpsClient = {
        sendRequest: async (request) => {
          assert.strictEqual(request.url, "https://example.com");
          return {
            request,
            headers: createHttpHeaders(),
            status: 200
          };
        }
      };

      const pipeline = createPipelineFromOptions({});
      const request = createPipelineRequest({ url: "https://example.com" });
      const response = await pipeline.sendRequest(testHttpsClient, request);
      assert.strictEqual(response.status, 200);
    });
  });
});
