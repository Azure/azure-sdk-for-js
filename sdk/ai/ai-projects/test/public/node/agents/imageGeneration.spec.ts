// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../../src/index.js";
import type OpenAI from "openai";
import * as fs from "node:fs/promises";
import * as path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("agents - image generation tool", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;
  let openAIClient: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create agent with image generation tool and generate image", async function () {
    const imageDeploymentName =
      process.env["IMAGE_GENERATION_MODEL_DEPLOYMENT_NAME"] || "gpt-image-1";

    const agent = await agents.createVersion("agent-image-generation", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions: "Generate images based on user prompts",
      tools: [
        {
          type: "image_generation",
          quality: "low",
          size: "1024x1024",
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "agent-image-generation");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    const response = await openAIClient.responses.create(
      {
        input: "Generate an image of Microsoft logo.",
      },
      {
        body: {
          agent: { name: agent.name, type: "agent_reference" },
        },
        headers: { "x-ms-oai-image-generation-deployment": imageDeploymentName },
      },
    );

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(`Response created: ${response.id}`);

    // Extract generated image data
    const imageData = response.output?.filter(
      (output) => output.type === "image_generation_call",
    );

    if (imageData && imageData.length > 0 && imageData[0].result) {
      console.log("Image was generated successfully");
      assert.isString(imageData[0].result, "Expected base64 image data");

      // Save the generated image (node-only operation)
      const filePath = path.join(__dirname, "generated_microsoft.png");
      const imageBuffer = Buffer.from(imageData[0].result, "base64");
      await fs.writeFile(filePath, imageBuffer);
      console.log(`Image saved to: ${filePath}`);

      // Clean up the saved image
      await fs.unlink(filePath).catch(() => {
        // Ignore cleanup errors
      });
    } else {
      console.log("No image data in response (may be expected in playback mode)");
    }

    // Clean up agent
    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });
});
