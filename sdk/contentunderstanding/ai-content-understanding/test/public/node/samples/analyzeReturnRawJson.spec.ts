// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Sample test for analyzeReturnRawJson.ts - Return raw JSON from analysis using pipeline policy.
 */

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it } from "vitest";
import { createRecorder, getSampleFilePath } from "./sampleTestUtils.js";
import { forEachServiceVersion } from "../../../utils/multiVersion.js";
import fs from "node:fs";
import { ContentUnderstandingClient } from "../../../../src/index.js";
import { AzureKeyCredential } from "@azure/core-auth";
import { createTestCredential } from "@azure-tools/test-credential";
import { EnvVarKeys } from "../../../utils/constants.js";
import type {
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
  PipelineRequest,
} from "@azure/core-rest-pipeline";

forEachServiceVersion("Sample: analyzeReturnRawJson", ({ apiVersion }) => {
  let recorder: Recorder;
  let client: ContentUnderstandingClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    const endpoint = assertEnvironmentVariable(EnvVarKeys.ENDPOINT);
    const key = process.env[EnvVarKeys.KEY];
    client = new ContentUnderstandingClient(
      endpoint,
      key ? new AzureKeyCredential(key) : createTestCredential(),
      recorder.configureClientOptions({ apiVersion }),
    );
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should analyze and capture raw JSON via pipeline policy", async () => {
    // Read the sample invoice file bytes
    const filePath = getSampleFilePath("sample_invoice.pdf");
    const fileBytes = fs.readFileSync(filePath);

    const analyzerId = "prebuilt-documentSearch";

    // Create and add policy to capture raw responses for this operation only
    let rawResponse: PipelineResponse | undefined;
    const capturePolicy: PipelinePolicy = {
      name: "captureRawResponse",
      async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
        const response = await next(request);
        rawResponse = response;
        return response;
      },
    };
    client.pipeline.addPolicy(capturePolicy);

    // Analyze the document
    const poller = client.analyzeBinary(analyzerId, fileBytes);
    await poller.pollUntilDone();

    // Remove the capture policy immediately after the operation
    client.pipeline.removePolicy({ name: "captureRawResponse" });

    // Verify raw response was captured
    assert.ok(rawResponse, "Should have captured raw response");
    assert.ok(rawResponse?.bodyAsText, "Should have raw JSON body");

    // ========== Raw response structural verification ==========
    // . The captured HTTP response must be a 2xx
    // success and the body must be a non-empty, parseable JSON envelope with a
    // Succeeded status and a non-empty result.contents array.
    assert.ok(
      rawResponse!.status >= 200 && rawResponse!.status < 300,
      `Raw response status should be 2xx, but was ${rawResponse!.status}`,
    );

    const rawJson = rawResponse!.bodyAsText!;
    assert.ok(rawJson.length > 0, "Raw JSON body should not be empty");
    const parsedRawJson = JSON.parse(rawJson);

    assert.equal(parsedRawJson.status, "Succeeded", "Parsed raw JSON should have correct status");
    assert.ok(parsedRawJson.result, "Should have result in raw JSON");
    assert.ok(parsedRawJson.result.contents, "Should have contents in result");
    assert.ok(Array.isArray(parsedRawJson.result.contents), "result.contents should be an array");
    assert.ok(
      parsedRawJson.result.contents.length > 0,
      "result.contents should have at least one element",
    );

    console.log(`Result contains ${parsedRawJson.result.contents.length} content(s)`);
  });
});
