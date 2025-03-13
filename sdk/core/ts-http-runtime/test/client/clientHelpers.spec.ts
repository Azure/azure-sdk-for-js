// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { apiVersionPolicyName } from "../../src/client/apiVersionPolicy.js";
import type {
  BearerTokenCredential,
  OAuth2TokenCredential,
  BasicCredential,
} from "../../src/auth/credentials.js";
import { createDefaultPipeline } from "../../src/client/clientHelpers.js";
import { bearerAuthenticationPolicyName } from "../../src/policies/auth/bearerAuthenticationPolicy.js";
import { basicAuthenticationPolicyName } from "../../src/policies/auth/basicAuthenticationPolicy.js";
import { apiKeyAuthenticationPolicyName } from "../../src/policies/auth/apiKeyAuthenticationPolicy.js";
import { oauth2AuthenticationPolicyName } from "../../src/policies/auth/oauth2AuthenticationPolicy.js";
import type { OAuth2Flow } from "../../src/index.js";

describe("clientHelpers", () => {
  it("should create a default pipeline with no credentials", () => {
    const pipeline = createDefaultPipeline({ credential: undefined, authSchemes: [] });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    const authPolicyNames = [
      bearerAuthenticationPolicyName,
      basicAuthenticationPolicyName,
      apiKeyAuthenticationPolicyName,
      oauth2AuthenticationPolicyName,
    ];

    for (const policyName of authPolicyNames) {
      assert.isUndefined(
        policies.find((p) => p.name === policyName),
        `pipeline shouldn't have ${policyName}`,
      );
    }
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

  it("should create a default pipeline with apiKeyCredential", () => {
    const pipeline = createDefaultPipeline({
      credential: { key: "mockKey" },
    });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === apiKeyAuthenticationPolicyName),
      "pipeline should have apiKeyAuthenticationPolicyName",
    );
  });

  it("should create a default pipeline with BearerTokenCredential", () => {
    const mockCredential: BearerTokenCredential = {
      getBearerToken: async () => "mockToken",
    };
    const pipeline = createDefaultPipeline({
      credential: mockCredential,
    });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === bearerAuthenticationPolicyName),
      "pipeline should have bearerAuthenticationPolicyName",
    );
  });

  it("should create a default pipeline with OAuth2TokenCredential", () => {
    const mockCredential: OAuth2TokenCredential<OAuth2Flow> = {
      getOAuth2Token: async (_flows: OAuth2Flow[]) => "mockToken",
    };
    const pipeline = createDefaultPipeline({
      credential: mockCredential,
    });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === oauth2AuthenticationPolicyName),
      "pipeline should have oauth2AuthenticationPolicyName",
    );
  });

  it("should create a default pipeline with BasicCredential", () => {
    const mockCredential: BasicCredential = {
      username: "mockUser",
      password: "mockPassword",
    };
    const pipeline = createDefaultPipeline({
      credential: mockCredential,
    });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === basicAuthenticationPolicyName),
      "pipeline should have basicAuthenticationPolicyName",
    );
  });
});
