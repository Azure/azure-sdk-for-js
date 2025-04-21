// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  bearerTokenAuthenticationPolicyName,
  createEmptyPipeline,
} from "@azure/core-rest-pipeline";
import { keyCredentialAuthenticationPolicyName } from "../src/keyCredentialAuthenticationPolicy.js";
import type { TokenCredential } from "@azure/core-auth";
import { addCredentialPipelinePolicy } from "../src/clientHelpers.js";

describe("addCredentialPipelinePolicy", () => {
  const mockBaseUrl = "https://example.org";

  it("should add keyCredentialPolicy for KeyCredential", () => {
    const pipeline = createEmptyPipeline();
    addCredentialPipelinePolicy(pipeline, mockBaseUrl, {
      clientOptions: { credentials: { apiKeyHeaderName: "apiHeader" } },
      credential: { key: "mockKey" },
    });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "pipeline should contain policies");

    assert.isUndefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline shouldn't have bearerTokenAuthenticationPolicyName",
    );

    assert.isDefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn have keyCredentialAuthenticationPolicyName",
    );
  });

  it("should add bearerTokenAuthenticationPolicy for TokenCredential", () => {
    const mockCredential: TokenCredential = {
      getToken: async () => ({ expiresOnTimestamp: 0, token: "mockToken" }),
    };

    const pipeline = createEmptyPipeline();
    addCredentialPipelinePolicy(pipeline, mockBaseUrl, { credential: mockCredential });
    const policies = pipeline.getOrderedPolicies();

    assert.isDefined(policies, "default pipeline should contain policies");

    assert.isDefined(
      policies.find((p) => p.name === bearerTokenAuthenticationPolicyName),
      "pipeline should have bearerTokenAuthenticationPolicyName",
    );

    assert.isUndefined(
      policies.find((p) => p.name === keyCredentialAuthenticationPolicyName),
      "pipeline shouldn have keyCredentialAuthenticationPolicyName",
    );
  });
});
