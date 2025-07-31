// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { delay } from "@azure-tools/test-recorder";
import type {
  AgentsClient,
  FunctionToolDefinition,
  MessageContent,
  MessageImageFileContent,
  MessageTextContent,
  SubmitToolOutputsAction,
} from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { isOutputOfType } from "../../../src/utils/utils.js";

describe("Agents - function tool", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;
  let getCurrentDateTimeTool: FunctionToolDefinition;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    getCurrentDateTimeTool = {
      type: "function",
      function: {
        name: "getCurrentDateTime",
        description: "Get current date time",
        parameters: {},
      },
    };
  });

  afterEach(async function () {
    await recorder.stop();
  });

  function getCurrentDateTime(): {} {
    return { currentDateTime: "2024-10-10 12:30:19" };
  }

  it("should create agent with function tool", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [getCurrentDateTimeTool],
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotEmpty(agent.tools);
    assert.equal((agent.tools[0] as FunctionToolDefinition).function.name, "getCurrentDateTime");

    // Delete agent
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("should create agent with run function tool", async function () {
    // Create agent
    const agent = await projectsClient.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [getCurrentDateTimeTool],
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotEmpty(agent.tools);
    assert.equal((agent.tools[0] as FunctionToolDefinition).function.name, "getCurrentDateTime");

    // Create thread
    const thread = await projectsClient.threads.create();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await projectsClient.messages.create(
      thread.id,
      "user",
      "Hello, what's the time?",
    );
    assert.isNotNull(message.id);
    console.log(`Created message, message ID ${message.id}`);

    // Create run
    let run = await projectsClient.runs.create(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);
    let toolCalled = false;
    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
      await delay(1000);
      run = await projectsClient.runs.get(thread.id, run.id);
      if (run.status === "failed") {
        console.log(`Run failed - ${run.lastError?.code} - ${run.lastError?.message}`);
        break;
      }
      console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
      if (run.status === "requires_action" && run.requiredAction) {
        console.log(`Run requires action - ${run.requiredAction}`);
        if (isOutputOfType<SubmitToolOutputsAction>(run.requiredAction, "submit_tool_outputs")) {
          const submitToolOutputsActionOutput = run.requiredAction as SubmitToolOutputsAction;
          const toolCalls = submitToolOutputsActionOutput.submitToolOutputs.toolCalls;
          for (const toolCall of toolCalls) {
            if (isOutputOfType<FunctionToolDefinition>(toolCall, "function")) {
              const functionOutput = toolCall as FunctionToolDefinition;
              console.log(`Function tool call - ${functionOutput.function.name}`);
              const toolResponse = getCurrentDateTime();
              toolCalled = true;
              run = await projectsClient.runs.submitToolOutputs(thread.id, run.id, [
                { toolCallId: toolCall.id, output: JSON.stringify(toolResponse) },
              ]);
              console.log(`Submitted tool response - ${run.status}`);
            }
          }
        }
      }
    }
    assert.oneOf(run.status, ["cancelled", "failed", "completed", "expired"]);
    assert.isTrue(toolCalled);
    console.log(`Run status - ${run.status}, run ID: ${run.id}`);
    const messages = projectsClient.messages.list(thread.id);
    for await (const threadMessage of messages) {
      console.log(
        `Thread Message Created at  - ${threadMessage.createdAt} - Role - ${threadMessage.role}`,
      );
      threadMessage.content.forEach((content: MessageContent) => {
        if (isOutputOfType<MessageTextContent>(content, "text")) {
          const textContent = content as MessageTextContent;
          console.log(`Text Message Content - ${textContent.text.value}`);
        } else if (isOutputOfType<MessageImageFileContent>(content, "image_file")) {
          const imageContent = content as MessageImageFileContent;
          console.log(`Image Message Content - ${imageContent.imageFile.fileId}`);
        }
      });
    }

    // Delete agent
    await projectsClient.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });
});
