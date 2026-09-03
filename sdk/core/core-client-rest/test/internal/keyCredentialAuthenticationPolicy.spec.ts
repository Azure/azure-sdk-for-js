// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  keyCredentialAuthenticationPolicy,
  keyCredentialAuthenticationPolicyName,
} from "../../src/keyCredentialAuthenticationPolicy.js";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";

describe("keyCredentialAuthenticationPolicy", () => {
  it("should set the api key header on the request", async () => {
    const credential = { key: "test-api-key" };
    const headerName = "x-api-key";
    const policy = keyCredentialAuthenticationPolicy(credential, headerName);

    assert.equal(policy.name, keyCredentialAuthenticationPolicyName);

    const request = createPipelineRequest({
      url: "https://example.org",
      headers: createHttpHeaders(),
    });

    const response = await policy.sendRequest(request, async (req) => {
      assert.equal(req.headers.get(headerName), "test-api-key");
      return { headers: createHttpHeaders(), status: 200, request: req };
    });

    assert.equal(response.status, 200);
  });
});
