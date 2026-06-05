// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../../src/index.js";
import type OpenAI from "openai";
import * as fs from "node:fs";
import * as path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("agents - computer use tool", () => {
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

  it("should create computer use agent and process browser search simulation", async function () {
    const deploymentName =
      process.env["COMPUTER_USE_MODEL_DEPLOYMENT_NAME"] || "computer-use-preview";

    // Upload screenshot assets
    const screenshotPaths = {
      browser_search: path.join(__dirname, "data", "cua_browser_search.png"),
      search_typed: path.join(__dirname, "data", "cua_search_typed.png"),
      search_results: path.join(__dirname, "data", "cua_search_results.png"),
    };

    const uploadedFiles: Record<string, string> = {};
    for (const [key, filePath] of Object.entries(screenshotPaths)) {
      const uploadedFile = await openAIClient.files.create({
        file: fs.createReadStream(filePath),
        purpose: "assistants",
      });
      uploadedFiles[key] = uploadedFile.id;
      console.log(`Uploaded ${key}: ${uploadedFile.id}`);
    }

    const agent = await agents.createVersion("ComputerUseAgent", {
      kind: "prompt" as const,
      model: deploymentName,
      instructions: `
You are a computer automation assistant.
Be direct and efficient. When you reach the search results page, read and describe the actual search result titles and descriptions you can see.
      `.trim(),
      tools: [
        {
          type: "computer_use_preview",
          display_width: 1026,
          display_height: 769,
          environment: "windows" as const,
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "ComputerUseAgent");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Initial request with browser search screenshot
    let response = await openAIClient.responses.create(
      {
        input: [
          {
            role: "user" as const,
            content: [
              {
                type: "input_text",
                text: "I need you to help me search for 'OpenAI news'. Please type 'OpenAI news' and submit the search. Once you see search results, the task is complete.",
              },
              {
                type: "input_image",
                file_id: uploadedFiles["browser_search"],
                detail: "high",
              },
            ],
          },
        ],
        truncation: "auto",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );

    assert.isNotNull(response);
    assert.isNotNull(response.id);
    console.log(`Initial response ID: ${response.id}`);

    // Process agent iterations up to a maximum count
    const maxIterations = 10;
    let iteration = 0;

    while (iteration < maxIterations) {
      iteration++;
      const computerCalls = response.output.filter((item) => item.type === "computer_call");

      if (computerCalls.length === 0) {
        console.log("No more computer calls — agent completed the task");
        break;
      }

      const computerCall = computerCalls[0];
      if (!computerCall.action || !computerCall.call_id) {
        break;
      }

      const action = computerCall.action;
      const callId = computerCall.call_id;

      // Determine which screenshot to return based on action type
      let screenshotFileId = uploadedFiles["search_results"];
      if (action.type === "type") {
        screenshotFileId = uploadedFiles["search_typed"];
      }

      response = await openAIClient.responses.create(
        {
          previous_response_id: response.id,
          input: [
            {
              call_id: callId,
              type: "computer_call_output",
              output: {
                type: "computer_screenshot",
                file_id: screenshotFileId,
              },
            },
          ],
          truncation: "auto",
        },
        {
          body: { agent: { name: agent.name, type: "agent_reference" } },
        },
      );
      console.log(`Follow-up response ID: ${response.id}`);
    }

    assert.isNotNull(response.id, "Expected a final response");
    console.log(`Total iterations: ${iteration}`);

    // Clean up uploaded files
    for (const fileId of Object.values(uploadedFiles)) {
      await openAIClient.files.delete(fileId);
    }

    // Clean up agent
    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });
});
