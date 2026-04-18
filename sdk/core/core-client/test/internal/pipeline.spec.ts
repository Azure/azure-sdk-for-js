// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createClientPipeline } from "../../src/pipeline.js";

describe("pipeline", () => {
  it("should add bearerTokenAuthenticationPolicy when credentialOptions is provided", () => {
    const pipeline = createClientPipeline({
      credentialOptions: {
        credential: {
          getToken: async () => ({ token: "test", expiresOnTimestamp: Date.now() + 3600000 }),
        },
        credentialScopes: "https://example.com/.default",
      },
    });
    const policies = pipeline.getOrderedPolicies();
    const hasBearerPolicy = policies.some((p) => p.name === "bearerTokenAuthenticationPolicy");
    assert.isTrue(hasBearerPolicy);
  });

  it("should work without credentialOptions", () => {
    const pipeline = createClientPipeline({});
    const policies = pipeline.getOrderedPolicies();
    const hasBearerPolicy = policies.some((p) => p.name === "bearerTokenAuthenticationPolicy");
    assert.isFalse(hasBearerPolicy);
  });
});

describe("pipeline - default options parameter", () => {
  it("should handle being called with no arguments", () => {
    const pipeline = createClientPipeline();
    assert.ok(pipeline);
    const policies = pipeline.getOrderedPolicies();
    assert.isAbove(policies.length, 0);
  });
});
