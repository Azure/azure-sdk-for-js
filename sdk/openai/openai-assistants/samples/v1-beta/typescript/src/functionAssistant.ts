// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the AOAI assistants API with local function calls.
 * 
 *
 * @summary assistants code.
 */

import { AssistantsClient, OpenAIKeyCredential } from "@azure/openai-assistants";

// Load the .env file if it exists
import dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
// const endpoint = process.env["ENDPOINT"] || "<endpoint>";
// const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";
const nonAzureKey = process.env["OPENAI_API_KEY"] || "<openai key>";

export async function main() {
  console.log("== Function Assistant Sample ==");

  const assistantsClient = new AssistantsClient(new OpenAIKeyCredential(nonAzureKey));

  // function tools sample code
  const getFavoriteCity = () => "Atlanta, GA";
  const getUserFavoriteCityTool = {
    type: "function",
    function: {
      name: "getUserFavoriteCity",
      description: "Gets the user's favorite city.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  } as const;

  const getCityNickname = (city: string) => {
    switch (city) {
      case "Atlanta, GA":
        return "The ATL";
      case "Seattle, WA":
        return "The Emerald City";
      case "Los Angeles, CA":
        return "LA";
      default:
        return "Unknown";
    }
  };

  const getCityNicknameTool = {
    type: "function",
    function: {
      name: "getCityNickname",
      description: "Gets the nickname for a city, e.g. 'LA' for 'Los Angeles, CA'.",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
        },
      },
    },
  } as const;

  const getWeatherAtLocation = (location: string, temperatureUnit = "f") => {
    switch (location) {
      case "Atlanta, GA":
        return temperatureUnit === "f" ? "84f" : "26c";
      case "Seattle, WA":
        return temperatureUnit === "f" ? "70f" : "21c";
      case "Los Angeles, CA":
        return temperatureUnit === "f" ? "90f" : "28c";
      default:
        return "Unknown";
    }
  };

  const getWeatherAtLocationTool = {
    type: "function",
    function: {
      name: "getWeatherAtLocation",
      description: "Gets the current weather at a provided location.",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and state, e.g. San Francisco, CA",
          },
          temperatureUnit: {
            type: "string",
            enum: ["f", "c"],
          },
        },
        required: ["location"],
      },
    },
  } as const;

  const weatherAssistant = await assistantsClient.assistants.createAssistant({
    model: "gpt-4-0125-Preview",
    name: "JS SDK Test Assistant - Weather",
    instructions: `You are a weather bot. Use the provided functions to help answer questions.
        Customize your responses to the user's preferences as much as possible and use friendly
        nicknames for cities whenever possible.
    `,
    tools: [getUserFavoriteCityTool, getCityNicknameTool, getWeatherAtLocationTool],
  });

  const getResolvedToolOutput = (toolCall: { id: string; function?: any }) => {
    const toolOutput = { toolCallId: toolCall.id, output: "" };
    if (toolCall["function"]) {
      const functionCall = toolCall["function"];
      const functionName = functionCall.name;
      const functionArgs = JSON.parse(functionCall["arguments"] ?? {});
      switch (functionName) {
        case "getUserFavoriteCity":
          toolOutput.output = getFavoriteCity();
          break;
        case "getCityNickname":
          toolOutput.output = getCityNickname(functionArgs["city"]);
          break;
        case "getWeatherAtLocation":
          toolOutput.output = getWeatherAtLocation(
            functionArgs.location,
            functionArgs.temperatureUnit
          );
          break;
        default:
          toolOutput.output = `Unknown function: ${functionName}`;
          break;
      }
    }

    return toolOutput;
  };

  const question = "What's the weather like right now in my favorite city?";
  let runResponse = await assistantsClient.threadRuns.createThreadAndRun({
    assistantId: weatherAssistant.id,
    thread: { messages: [{ role: "user", content: question }] },
    tools: [getUserFavoriteCityTool, getCityNicknameTool, getWeatherAtLocationTool],
  });

  const threadId = runResponse.threadId;

  do {
    await new Promise((r) => setTimeout(r, 500));
    runResponse = await assistantsClient.threadRuns.retrieveRun(threadId, runResponse.id);

    if (
      runResponse.status === "requires_action" &&
      runResponse.requiredAction?.type === "submit_tool_outputs"
    ) {
      const toolOutputs: { output: string }[] = [];

      if (runResponse.requiredAction?.submitToolOutputs?.toolCalls) {
        for (const toolCall of runResponse.requiredAction?.submitToolOutputs.toolCalls) {
          toolOutputs.push(getResolvedToolOutput(toolCall));
        }
        runResponse = await assistantsClient.threadRuns.submitRunToolOutputs(
          threadId,
          runResponse.id,
          toolOutputs
        );
      }
    }
  } while (runResponse.status === "queued" || runResponse.status === "in_progress");

  const runMessages = await assistantsClient.threadMessages.listMessages(threadId);
  for (const runMessageDatum of runMessages.data) {
    for (const item of runMessageDatum.content) {
      if (item.type === "text") {
        console.log(`Assistant message text: ${item.text?.value}`);
      } else if (item.type === "image_file") {
        console.log(`Assistant message file id: ${item.imageFile?.fileId}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
