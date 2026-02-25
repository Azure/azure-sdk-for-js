// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect } from "vitest";
import {
  createEmptyPipeline,
  createPipelineRequest,
  createDefaultHttpClient,
  type PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { audienceErrorHandlingPolicy } from "../../src/internal/audienceErrorHandlingPolicy.js";

describe("audienceErrorHandlingPolicy", () => {
  function buildPipelineWithThrowingPolicy(isAudienceConfigured: boolean, thrownError: Error) {
    const pipeline = createEmptyPipeline();

    const throwingPolicy: PipelinePolicy = {
      name: "throwingPolicy",
      async sendRequest() {
        throw thrownError;
      },
    };

    // audienceErrorHandlingPolicy should wrap errors coming from later policies
    pipeline.addPolicy(audienceErrorHandlingPolicy(isAudienceConfigured));
    pipeline.addPolicy(throwingPolicy);

    return pipeline;
  }

  it("throws helpful RestError when AAD audience error occurs and audience is not configured", async () => {
    const originalError = new Error(
      "Some auth failure including AADSTS500011: No resource matches the audience",
    );

    const pipeline = buildPipelineWithThrowingPolicy(false, originalError);
    const httpClient = createDefaultHttpClient();
    const request = createPipelineRequest({ url: "https://example.com" });

    await expect(pipeline.sendRequest(httpClient, request)).rejects.toMatchObject({
      message: expect.stringMatching(/No authentication token audience was provided/),
      name: "RestError",
    });
  });

  it("throws helpful RestError when AAD audience error occurs and audience is configured", async () => {
    const originalError = new Error(
      "Some auth failure including AADSTS500011: Invalid resource for this tenant",
    );

    const pipeline = buildPipelineWithThrowingPolicy(true, originalError);
    const httpClient = createDefaultHttpClient();
    const request = createPipelineRequest({ url: "https://example.com" });

    await expect(pipeline.sendRequest(httpClient, request)).rejects.toMatchObject({
      message: expect.stringMatching(/An incorrect token audience was provided/),
      name: "RestError",
    });
  });

  it("rethrows non-AAD audience errors unchanged", async () => {
    const originalError = new Error("Network timeout, no AADSTS code here");

    const pipeline = buildPipelineWithThrowingPolicy(true, originalError);
    const httpClient = createDefaultHttpClient();
    const request = createPipelineRequest({ url: "https://example.com" });

    await expect(pipeline.sendRequest(httpClient, request)).rejects.toBe(originalError);
  });
});
