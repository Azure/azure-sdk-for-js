// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createPipelineFromOptions } from "../../../src/createPipelineFromOptions.js";

describe("createPipelineFromOptions", function () {
  it("creates a pipeline with agent option", function () {
    const pipeline = createPipelineFromOptions({
      agent: { http: undefined, https: undefined },
    });
    assert.isDefined(pipeline);
    // agentPolicy should be in the pipeline
    const policies = pipeline.getOrderedPolicies();
    const agentPol = policies.find((p) => p.name === "agentPolicy");
    assert.isDefined(agentPol);
  });

  it("creates a pipeline with tlsOptions", function () {
    const pipeline = createPipelineFromOptions({
      tlsOptions: { certificateThumbprint: "test-thumbprint" },
    });
    assert.isDefined(pipeline);
    const policies = pipeline.getOrderedPolicies();
    const tlsPol = policies.find((p) => p.name === "tlsPolicy");
    assert.isDefined(tlsPol);
  });

  it("creates a pipeline with both agent and tls options", function () {
    const pipeline = createPipelineFromOptions({
      agent: { http: undefined },
      tlsOptions: { certificateThumbprint: "abc" },
    });
    assert.isDefined(pipeline);
    const policies = pipeline.getOrderedPolicies();
    assert.isDefined(policies.find((p) => p.name === "agentPolicy"));
    assert.isDefined(policies.find((p) => p.name === "tlsPolicy"));
  });
});
