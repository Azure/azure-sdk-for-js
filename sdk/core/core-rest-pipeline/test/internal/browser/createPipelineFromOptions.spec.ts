// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { Agent, TlsSettings } from "../../../src/interfaces.js";
import { createPipelineFromOptions } from "../../../src/index.js";

describe("createPipelineFromOptions (browser)", function () {
  it("creates a pipeline without Node-only policies in browser", function () {
    const pipeline = createPipelineFromOptions({});
    const policies = pipeline.getOrderedPolicies();
    const policyNames = policies.map((p) => p.name);

    // In browser, Node-only policies should not be present
    assert.notInclude(policyNames, "agentPolicy");
    assert.notInclude(policyNames, "tlsPolicy");
    assert.notInclude(policyNames, "proxyPolicy");
    assert.notInclude(policyNames, "decompressResponsePolicy");
    assert.notInclude(policyNames, "redirectPolicy");

    // Common policies should still be present
    assert.include(policyNames, "userAgentPolicy");
    assert.include(policyNames, "setClientRequestIdPolicy");
    assert.include(policyNames, "tracingPolicy");
  });

  it("ignores agent and tlsOptions in browser", function () {
    const pipeline = createPipelineFromOptions({
      agent: { maxSockets: 10 } as unknown as Agent,
      tlsOptions: { ca: "test" } as unknown as TlsSettings,
    });
    const policies = pipeline.getOrderedPolicies();
    const policyNames = policies.map((p) => p.name);

    // Even with agent/tlsOptions provided, those policies shouldn't exist in browser
    assert.notInclude(policyNames, "agentPolicy");
    assert.notInclude(policyNames, "tlsPolicy");
  });
});
