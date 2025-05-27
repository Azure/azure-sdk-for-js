// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import { isUnexpected } from "../../../src/index.js";

describe("inference - chatCompletions", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let deploymentName: string;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);

    // Get deployment name from environment variable or use a default for recording
    deploymentName = assertEnvironmentVariable("DEPLOYMENT_NAME");
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and chat completion operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(projectsClient.inference);
  });

  it("should get a chat completion response", async function () {
    const client = projectsClient.inference.chatCompletions(
      recorder.configureClientOptions({
        apiVersion: "2024-05-01-preview",
      }),
    );

    const response = await client.post({
      body: {
        model: deploymentName,
        messages: [
          { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
          { role: "user", content: "How many feet are in a mile?" },
        ],
      },
    });

    assert.isNotNull(response);
    if (isUnexpected(response)) {
      throw new Error(`Chat completion failed with status ${response.status}`);
    }

    const content = response.body.choices[0].message.content;
    assert.isNotNull(content);
    assert.isString(content);
    console.log("Chat completion content:", content);
    // Don't assert exact content as it may vary, but ensure we got a response
    assert.isTrue(content.length > 0);
  });
});
