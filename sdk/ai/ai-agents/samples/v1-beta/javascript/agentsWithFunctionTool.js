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

const { AgentsClient, ToolUtility, isOutputOfType } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");

require("dotenv/config");

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
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
      const functionMap = new Map(
        this.functionTools.map((tool) => [tool.definition.function.name, tool.func]),
      );
      const result = functionMap.get(toolCall.function.name)?.(...args);
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
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-agent",
    instructions:
      "You are a weather bot. Use the provided functions to help answer questions. Customize your responses to the user's preferences as much as possible and use friendly nicknames for cities whenever possible.",
    tools: functionTools,
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create thread
  const thread = await client.threads.create();
  console.log(`Created Thread, thread ID:  ${thread.id}`);

  // Create message
  const message = await client.messages.create(
    thread.id,
    "user",
    "What's the weather like in my favorite city?",
  );
  console.log(`Created message, message ID ${message.id}`);

  async function onResponse(response) {
    if (!response || !response.parsedBody) return;

    const run = response.parsedBody;
    console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);

    // Ensure we have a run with requires_action status and requiredAction object
    if (run.status === "requires_action" && run.requiredAction) {
      console.log("Run requires action");

      // Check if the required_action is of type submit_tool_outputs and has the expected structure
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
          try {
            await client.runs.submitToolOutputs(thread.id, run.id, toolResponses);
            console.log(`Submitted tool responses successfully`);
          } catch (err) {
            console.error("Error submitting tool outputs:", err);
          }
        }
      }
    }
  }

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
    onResponse: onResponse,
  });
  console.log(`Run finished with status: ${run.status}`);

  console.log(`Run status - ${run.status}, run ID: ${run.id}`);
  const messages = client.messages.list(thread.id);
  for await (const threadMessage of messages) {
    console.log(
      `Thread Message Created at  - ${threadMessage.createdAt} - Role - ${threadMessage.role}`,
    );
    threadMessage.content.forEach((content) => {
      if (isOutputOfType(content, "text")) {
        console.log(`Text Message Content - ${content.text.value}`);
      } else if (isOutputOfType(content, "image_file")) {
        console.log(`Image Message Content - ${content.imageFile.fileId}`);
      }
    });
  }
  // Delete agent
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
