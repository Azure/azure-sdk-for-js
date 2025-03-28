// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-unsafe-function-type
 */

/**
 * This sample demonstrates how to use basic agent operations with function tool from the Azure Agents service.
 *
 * @summary demonstrates how to use basic agent operations using function tool.
 *
 */

const { AIProjectsClient, ToolUtility, isOutputOfType } = require("@azure/ai-projects");
const { delay } = require("@azure/core-util");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv/config");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );
  const agents = client.agents;
  class FunctionToolExecutor {
    functionTools;

    constructor() {
      this.functionTools = [
        {
          func: this.getUserFavoriteCity,
          ...ToolUtility.createFunctionTool({
            name: "getUserFavoriteCity",
            description: "Gets the user's favorite city.",
            parameters: {},
          }),
        },
        {
          func: this.getCityNickname,
          ...ToolUtility.createFunctionTool({
            name: "getCityNickname",
            description: "Gets the nickname of a city, e.g. 'LA' for 'Los Angeles, CA'.",
            parameters: {
              type: "object",
              properties: {
                location: { type: "string", description: "The city and state, e.g. Seattle, Wa" },
              },
            },
          }),
        },
        {
          func: this.getWeather,
          ...ToolUtility.createFunctionTool({
            name: "getWeather",
            description: "Gets the weather for a location.",
            parameters: {
              type: "object",
              properties: {
                location: { type: "string", description: "The city and state, e.g. Seattle, Wa" },
                unit: { type: "string", enum: ["c", "f"] },
              },
            },
          }),
        },
      ];
    }

    getUserFavoriteCity() {
      return { location: "Seattle, WA" };
    }

    getCityNickname(_location) {
      return { nickname: "The Emerald City" };
    }

    getWeather(_location, unit) {
      return { weather: unit === "f" ? "72f" : "22c" };
    }

    invokeTool(toolCall) {
      console.log(`Function tool call - ${toolCall.function.name}`);
      const args = [];
      if (toolCall.function.parameters) {
        try {
          const params = JSON.parse(toolCall.function.parameters);
          for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
              args.push(params[key]);
            }
          }
        } catch (error) {
          console.error(`Failed to parse parameters: ${toolCall.function.parameters}`, error);
          return undefined;
        }
      }
      const result = this.functionTools
        .find((tool) => tool.definition.function.name === toolCall.function.name)
        ?.func(...args);
      return result
        ? {
            toolCallId: toolCall.id,
            output: JSON.stringify(result),
          }
        : undefined;
    }

    getFunctionDefinitions() {
      return this.functionTools.map((tool) => {
        return tool.definition;
      });
    }
  }

  const functionToolExecutor = new FunctionToolExecutor();
  const functionTools = functionToolExecutor.getFunctionDefinitions();
  const agent = await agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions:
      "You are a weather bot. Use the provided functions to help answer questions. Customize your responses to the user's preferences as much as possible and use friendly nicknames for cities whenever possible.",
    tools: functionTools,
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create thread
  const thread = await agents.createThread();
  console.log(`Created Thread, thread ID:  ${thread.id}`);

  // Create message
  const message = await agents.createMessage(thread.id, {
    role: "user",
    content: "What's the weather like in my favorite city?",
  });
  console.log(`Created message, message ID ${message.id}`);

  // Create run
  let run = await agents.createRun(thread.id, agent.id);
  console.log(`Created Run, Run ID:  ${run.id}`);

  while (["queued", "in_progress", "requires_action"].includes(run.status)) {
    await delay(1000);
    run = await agents.getRun(thread.id, run.id);
    console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
    if (run.status === "requires_action" && run.requiredAction) {
      console.log(`Run requires action - ${run.requiredAction}`);
      if (isOutputOfType(run.requiredAction, "submit_tool_outputs")) {
        const submitToolOutputsActionOutput = run.requiredAction;
        const toolCalls = submitToolOutputsActionOutput.submitToolOutputs.toolCalls;
        const toolResponses = [];
        for (const toolCall of toolCalls) {
          if (isOutputOfType(toolCall, "function")) {
            const toolResponse = functionToolExecutor.invokeTool(toolCall);
            if (toolResponse) {
              toolResponses.push(toolResponse);
            }
          }
        }
        if (toolResponses.length > 0) {
          run = await agents.submitToolOutputsToRun(thread.id, run.id, toolResponses);
          console.log(`Submitted tool response - ${run.status}`);
        }
      }
    }
  }

  console.log(`Run status - ${run.status}, run ID: ${run.id}`);
  const messages = await agents.listMessages(thread.id);
  await messages.data.forEach((threadMessage) => {
    console.log(
      `Thread Message Created at  - ${threadMessage.createdAt} - Role - ${threadMessage.role}`,
    );
    threadMessage.content.forEach((content) => {
      if (isOutputOfType(content, "text")) {
        const textContent = content;
        console.log(`Text Message Content - ${textContent.text.value}`);
      } else if (isOutputOfType(content, "image_file")) {
        const imageContent = content;
        console.log(`Image Message Content - ${imageContent.imageFile.fileId}`);
      }
    });
  });
  // Delete agent
  await agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
