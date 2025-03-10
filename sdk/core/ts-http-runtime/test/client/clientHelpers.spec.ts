// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { createDefaultPipeline } from "../../src/client/clientHelpers.js";
import { bearerTokenAuthenticationPolicyName } from "../../src/policies/bearerTokenAuthenticationPolicy.js";
import { keyCredentialAuthenticationPolicyName } from "../../src/client/keyCredentialAuthenticationPolicy.js";
import { apiVersionPolicyName } from "../../src/client/apiVersionPolicy.js";
import { BearerTokenCredential } from "../../src/auth/credentials.js";
import { bearerTokenPolicyName } from "../../src/policies/auth/bearerTokenPolicy.js";

describe("clientHelpers", () => {
  const mockBaseUrl = "https://example.org";
  it("should create a default pipeline with no credentials", () => {
    const pipeline = createDefaultPipeline();
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isUndefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline shouldn't have bearerTokenAuthenticationPolicyName",
    );

    assert.isUndefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn't have keyCredentialAuthenticationPolicyName",
    );
  });

  it("should create a default pipeline with apiVersion policy", () => {
    const pipeline = createDefaultPipeline();
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === apiVersionPolicyName),
      `Pipeline policy not found in the default pipeline: ${apiVersionPolicyName}`,
    );
  });

  it("should throw if key credentials but no Api Header Name", () => {
    try {
      createDefaultPipeline([{ kind: "apiKey", credential: { key: "mockKey" } }]);
      assert.fail("Expected to throw an error");
    } catch (error: any) {
      assert.equal((error as Error).message, "Missing API Key Header Name");
    }
  });

  it("should create a default pipeline with key credentials", () => {
    const pipeline = createDefaultPipeline([{ kind: "apiKey", credential: { key: "mockKey" } }], {
      authScheme: { kind: "apiKey", apiKeyLocation: "header", name: "apiHeader" },
    });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isUndefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline shouldn't have bearerTokenAuthenticationPolicyName",
    );

    assert.isDefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn have keyCredentialAuthenticationPolicyName",
    );
  });

  it("should create a default pipeline with BearerTokenCredential", () => {
    const mockCredential: BearerTokenCredential = {
      getToken: async () => "mockToken",
    };
    const pipeline = createDefaultPipeline([{ kind: "bearer", credential: mockCredential }]);
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === bearerTokenPolicyName),
      "pipeline should have bearerTokennPolicyName",
    );

    assert.isUndefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn have keyCredentialAuthenticationPolicyName",
    );
  });
});
