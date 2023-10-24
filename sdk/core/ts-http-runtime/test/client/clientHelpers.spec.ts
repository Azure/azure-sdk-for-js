// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createDefaultPipeline } from "../../src/client/clientHelpers";
import { assert } from "chai";
import { bearerTokenAuthenticationPolicyName } from "../../src/policies/bearerTokenAuthenticationPolicy";
import { keyCredentialAuthenticationPolicyName } from "../../src/client/keyCredentialAuthenticationPolicy";
import { TokenCredential } from "../../src/auth/tokenCredential";
import { fail } from "assert";
import { apiVersionPolicyName } from "../../src/client/apiVersionPolicy";
describe("clientHelpers", () => {
  const mockBaseUrl = "https://example.org";
  it("should create a default pipeline with no credentials", () => {
    const pipeline = createDefaultPipeline(mockBaseUrl);
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isUndefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline shouldn't have bearerTokenAuthenticationPolicyName"
    );

    assert.isUndefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn't have keyCredentialAuthenticationPolicyName"
    );
  });

  it("should create a default pipeline with apiVersion policy", () => {
    const pipeline = createDefaultPipeline(mockBaseUrl);
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === apiVersionPolicyName),
      `Pipeline policy not found in the default pipeline: ${apiVersionPolicyName}`
    );
  });

  it("should throw if key credentials but no Api Header Name", () => {
    try {
      createDefaultPipeline(mockBaseUrl, { key: "mockKey" });
      fail("Expected to throw an error");
    } catch (error: any) {
      assert.equal((error as Error).message, "Missing API Key Header Name");
    }
  });

  it("should create a default pipeline with key credentials", () => {
    const pipeline = createDefaultPipeline(
      mockBaseUrl,
      { key: "mockKey" },
      { credentials: { apiKeyHeaderName: "apiHeader" } }
    );
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isUndefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline shouldn't have bearerTokenAuthenticationPolicyName"
    );

    assert.isDefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn have keyCredentialAuthenticationPolicyName"
    );
  });

  it("should create a default pipeline with TokenCredential", () => {
    const mockCredential: TokenCredential = {
      getToken: async () => ({ expiresOnTimestamp: 0, token: "mockToken" }),
    };
    const pipeline = createDefaultPipeline(mockBaseUrl, mockCredential);
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline should have bearerTokenAuthenticationPolicyName"
    );

    assert.isUndefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn have keyCredentialAuthenticationPolicyName"
    );
  });
});
