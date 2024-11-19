// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay, Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { AgentsOperations, AIProjectsClient, FunctionToolDefinition, FunctionToolDefinitionOutput, MessageContentOutput, MessageImageFileContentOutput, MessageTextContentOutput, SubmitToolOutputsActionOutput } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { isOutputOfType } from "../../../src/agents/utils.js";

describe("Agents - function tool", () => {
    let recorder: Recorder;
    let projectsClient: AIProjectsClient;
    let agents: AgentsOperations
    let getCurrentDateTimeTool: FunctionToolDefinition

    beforeEach(async function (context: VitestTestContext) {
        recorder = await createRecorder(context);
        projectsClient = createProjectsClient(recorder);
        agents = projectsClient.agents;
        getCurrentDateTimeTool = { type: "function", function: { name: "getCurrentDateTime", description: "Get current date time", parameters: {} } };
    });

    afterEach(async function () {
        await recorder.stop();
    });


function getCurrentDateTime(): {} {
    const current = Date.now();
    return { "currentDateTime": current };
}

it("should create agent with function tool", async function () {
    // Create agent

    const agent = await agents.createAgent("gpt-4o", { name: "my-agent", instructions: "You are a helpful agent", tools: [getCurrentDateTimeTool] })
    console.log(`Created agent, agent ID: ${agent.id}`);
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotEmpty(agent.tools);
    assert.equal((agent.tools[0] as FunctionToolDefinition).function.name, "getCurrentDateTime");

    // Delete agent
    agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
})

it("should create agent with run function tool", async function () {
    // Create agent

    const agent = await agents.createAgent("gpt-4o", { name: "my-agent", instructions: "You are a helpful agent", tools: [getCurrentDateTimeTool] })
    console.log(`Created agent, agent ID: ${agent.id}`);
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotEmpty(agent.tools);
    assert.equal((agent.tools[0] as FunctionToolDefinition).function.name, "getCurrentDateTime");

    // Create thread
    const thread = await agents.createThread();
    assert.isNotNull(thread);
    assert.isNotNull(thread.id);
    console.log(`Created Thread, thread ID:  ${thread.id}`);

    // Create message
    const message = await agents.createMessage(thread.id, { role: "user", content: "Hello, what's the time?" })
    assert.isNotNull(message.id);
    console.log(`Created message, message ID ${message.id}`);

    // Create run
    let run = await agents.createRun(thread.id, agent.id);
    assert.isNotNull(run);
    assert.isNotNull(run.id);
    console.log(`Created Run, Run ID:  ${run.id}`);

    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
        await delay(1000);
        run = await agents.getRun(thread.id, run.id);
        console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
        if (run.status === "requires_action" && run.required_action) {

            console.log(`Run requires action - ${run.required_action}`);
            if (isOutputOfType<SubmitToolOutputsActionOutput>(run.required_action, "submit_tool_outputs")) {
                const submitToolOutputsActionOutput = run.required_action as SubmitToolOutputsActionOutput;
                const toolCalls = submitToolOutputsActionOutput.submit_tool_outputs.tool_calls;
                for (const toolCall of toolCalls) {
                    if (isOutputOfType<FunctionToolDefinitionOutput>(toolCall, "function")) {
                        const functionOutput = toolCall as FunctionToolDefinitionOutput;
                        console.log(`Function tool call - ${functionOutput.function.name}`);
                        const toolResponse =  getCurrentDateTime();
                        run = await agents.submitToolOutputsToRun(thread.id, run.id, [{tool_call_id: toolCall.id, output: JSON.stringify(toolResponse)}]);
                        console.log(`Submitted tool response - ${run.status}`);
                    }
                }
            }
        }
    }
    assert.oneOf(run.status, ["cancelled", "failed", "completed", "expired"]);
    console.log(`Run status - ${run.status}, run ID: ${run.id}`);
    const messages = await agents.listMessages(thread.id);
    messages.data.forEach(threadMessage => {
        console.log(`Thread Message Created at  - ${threadMessage.created_at} - Role - ${threadMessage.role}`);
        threadMessage.content.forEach((content: MessageContentOutput) => {
            if (isOutputOfType<MessageTextContentOutput>(content, "text")) {
                const textContent = content as MessageTextContentOutput;
                console.log(`Text Message Content - ${textContent.text.value}`);
            } else if (isOutputOfType<MessageImageFileContentOutput>(content, "image_file")) {
                const imageContent = content as MessageImageFileContentOutput;
                console.log(`Image Message Content - ${imageContent.image_file.file_id}`);
            }
        });
    });
    // Delete agent
    agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
})
});


