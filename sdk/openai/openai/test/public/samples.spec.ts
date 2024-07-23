// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "@azure-tools/test-utils";
import { assert, describe, it, afterEach, beforeEach } from "vitest";
import { createClient, startRecorder } from "./utils/createClient.js";
import OpenAI, { AzureOpenAI } from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from "openai/resources/index.mjs";
import { APIMatrix, APIVersion, AuthMethod, authTypes, latestAPIPreview } from "./utils/utils.js";
import { assertAssistantEquality } from "./utils/asserts.js";
import { AssistantTool } from "openai/resources/beta/assistants.mjs";

describe("README samples", () => {
  let recorder: Recorder;
  let client: AzureOpenAI | OpenAI;

  afterEach(async function () {
    await recorder.stop();
  });

  matrix([authTypes] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      describe(`Assistants`, function () {
        const codeAssistant = {
          tools: [{ type: "code_interpreter" }] as AssistantTool[],
          model: "gpt-4-1106-preview",
          name: "JS CI Math Tutor",
          description: "Math Tutor for Math Problems",
          instructions:
            "You are a personal math tutor. Write and run code to answer math questions.",
          metadata: { foo: "bar" },
        };

        beforeEach(async function (context) {
          recorder = await startRecorder(context);
          client = createClient(authMethod, latestAPIPreview, "dalle");
        });

        it("create and run code interpreter scenario", async function () {
          const assistant = await client.beta.assistants.create(codeAssistant);
          assertAssistantEquality(codeAssistant, assistant);
          const thread = await client.beta.threads.create();
          assert.isNotNull(thread.id);
          const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?";
          const role = "user";
          const message = await client.beta.threads.messages.create(thread.id, {
            role,
            content: question,
          });
          const messageContent = message.content[0];
          assert.isNotNull(message.id);
          assert.equal(message.role, role);
          if (messageContent.type === "text") {
            assert.equal(messageContent.text.value, question);
          }
          const instructions =
            "Please address the user as Jane Doe. The user has a premium account.";
          let run = await client.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.id,
            instructions,
          });
          assert.isNotNull(run.id);
          assert.equal(run.thread_id, thread.id);
          assert.equal(run.assistant_id, assistant.id);
          assert.equal(run.instructions, instructions);

          do {
            await new Promise((resolve) => setTimeout(resolve, 20000));
            run = await client.beta.threads.runs.retrieve(thread.id, run.id);
            const listLength = 1;
            const runSteps = await client.beta.threads.runs.steps.list(thread.id, run.id, {
              limit: listLength,
            });
            if (runSteps.data.length > 0) {
              const runStep = runSteps.data[0];
              assert.isNotNull(runStep.id);
              assert.equal(runSteps.data.length, listLength);

              const runMessage = await client.beta.threads.runs.steps.retrieve(
                thread.id,
                run.id,
                runStep.id,
              );
              assert.equal(runStep.id, runMessage.id);
              assert.equal(runMessage.run_id, run.id);
              assert.equal(runMessage.thread_id, thread.id);
              assert.equal(runMessage.assistant_id, assistant.id);
            }
          } while (run.status === "queued" || run.status === "in_progress");
          assert.equal(run.status, "completed");

          const runMessages = await client.beta.threads.messages.list(thread.id);
          for (const runMessageDatum of runMessages.data) {
            for (const item of runMessageDatum.content) {
              assert.equal(item.type, "text");
              if (item.type === "text") {
                assert.isNotEmpty(item.text.value);
              }
            }
          }
          const deleteThreadResponse = await client.beta.threads.del(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.beta.assistants.del(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });

        it("create and run function scenario for assistant", async function () {
          const favoriteCityFunctionName = "getUserFavoriteCity";
          const favoriteCityFunctionDescription = "Gets the user's favorite city.";
          const getFavoriteCity = (): string => "Atlanta, GA";
          const getUserFavoriteCityTool = {
            type: "function",
            function: {
              name: favoriteCityFunctionName,
              description: favoriteCityFunctionDescription,
              parameters: {
                type: "object",
                properties: {},
              },
            },
          };

          const getCityNickname = (city: string): string => {
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

          const getCityNicknameFunctionName = "getCityNickname";
          const getCityNicknameFunctionDescription =
            "Gets the nickname for a city, e.g. 'LA' for 'Los Angeles, CA'.";
          const getCityNicknameTool = {
            type: "function",
            function: {
              name: getCityNicknameFunctionName,
              description: getCityNicknameFunctionDescription,
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
          };

          let favoriteCityCalled = false;
          let nicknameCalled = false;
          const getResolvedToolOutput = (toolCall: {
            id: string;
            function?: any;
          }): { output: string } => {
            const toolOutput = { tool_call_id: toolCall.id, output: "" };
            if (toolCall["function"]) {
              const functionCall = toolCall["function"];
              const functionName = functionCall.name;
              const functionArgs = JSON.parse(functionCall["arguments"] ?? {});
              switch (functionName) {
                case favoriteCityFunctionName:
                  toolOutput.output = getFavoriteCity();
                  favoriteCityCalled = true;
                  break;
                case getCityNicknameFunctionName:
                  toolOutput.output = getCityNickname(functionArgs["city"]);
                  nicknameCalled = true;
                  break;
                default:
                  toolOutput.output = `Unknown function: ${functionName}`;
                  break;
              }
            }

            return toolOutput;
          };

          const instructions = `You are a helpful assistant. Use the provided functions to help answer questions.
            Customize your responses to the user's preferences as much as possible and use friendly
            nicknames for cities whenever possible.
        `;
          const functionAssistant = {
            model: "gpt-4-1106-preview",
            name: "JS SDK Test Assistant - Nickname",
            instructions,
            tools: [getUserFavoriteCityTool, getCityNicknameTool] as AssistantTool[],
          };
          const assistant = await client.beta.assistants.create(functionAssistant);
          assert.isNotNull(assistant.id);
          const thread = await client.beta.threads.create();
          assert.isNotNull(thread.id);
          const content = "What's the nickname of my favorite city?";
          const role = "user";
          const message = await client.beta.threads.messages.create(thread.id, { role, content });
          assert.isNotNull(message.id);
          assert.equal(message.thread_id, thread.id);
          let run = await client.beta.threads.runs.create(
            thread.id,
            {
              assistant_id: assistant.id,
              tools: [getUserFavoriteCityTool, getCityNicknameTool] as AssistantTool[],
            },
            {
              timeout: 10000,
            },
          );

          const runId = run.id;
          assert.isNotNull(runId);

          do {
            await new Promise((resolve) => setTimeout(resolve, 500));
            run = await client.beta.threads.runs.retrieve(thread.id, run.id);
            assert.equal(run.id, runId);
            assert.equal(run.thread_id, thread.id);
            assert.equal(run.assistant_id, assistant.id);
            assert.equal(run.instructions, instructions);

            if (
              run.status === "requires_action" &&
              run.required_action?.type === "submit_tool_outputs"
            ) {
              const toolOutputs = [];

              assert.notEqual(run.required_action?.submit_tool_outputs?.tool_calls, undefined);
              if (run.required_action?.submit_tool_outputs?.tool_calls !== undefined) {
                for (const toolCall of run.required_action.submit_tool_outputs.tool_calls) {
                  toolOutputs.push(getResolvedToolOutput(toolCall));
                }
              }
              run = await client.beta.threads.runs.submitToolOutputs(thread.id, run.id, {
                tool_outputs: toolOutputs,
              });
            }
          } while (run.status === "queued" || run.status === "in_progress");
          assert.equal(favoriteCityCalled, true);
          assert.equal(nicknameCalled, true);

          const runMessages = await client.beta.threads.messages.list(thread.id);
          for (const runMessageDatum of runMessages.data) {
            for (const item of runMessageDatum.content) {
              assert.equal(item.type, "text");
              if (item.type === "text") {
                assert.isNotEmpty(item.text?.value);
              }
            }
          }

          const deleteThreadResponse = await client.beta.threads.del(thread.id);
          assert.equal(deleteThreadResponse.deleted, true);

          const deleteAssistantResponse = await client.beta.assistants.del(assistant.id);
          assert.equal(deleteAssistantResponse.deleted, true);
        });
      });
      matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
        describe(`[${apiVersion}] Completions`, function () {
          beforeEach(async function (context) {
            recorder = await startRecorder(context);
            client = createClient(authMethod, apiVersion, "completions");
          });

          it("Generate Chatbot Response", async function () {
            const deploymentId = "gpt-35-turbo";

            const messages: ChatCompletionMessageParam[] = [
              {
                role: "system",
                content: "You are a helpful assistant. You will talk like a pirate.",
              },
              { role: "user", content: "Can you help me?" },
              { role: "assistant", content: "Arrrr! Of course, me hearty! What can I do for ye?" },
              { role: "user", content: "What's the best way to train a parrot?" },
            ];

            const events = await client.chat.completions.create({
              model: deploymentId,
              messages,
              stream: true,
              max_tokens: 128,
            });
            for await (const event of events) {
              for (const choice of event.choices) {
                const delta = choice.delta?.content;
                if (delta !== undefined) {
                  assert.isDefined(delta);
                }
              }
            }
          });

          it("Generate Multiple Completions", async function () {
            const examplePrompts = [
              "How are you today?",
              "What is Azure OpenAI?",
              "Why do children love dinosaurs?",
              "Generate a proof of Euler's identity",
              "Describe in single words only the good things that come into your mind about your mother.",
            ];

            const deploymentName = "gpt-35-turbo";

            const { choices } = await client.completions.create({
              model: deploymentName,
              prompt: examplePrompts,
              max_tokens: 64,
            });
            for (const choice of choices) {
              const completion = choice.text;
              assert.isDefined(completion);
            }
          });

          it("Summarize Text with Completion", async function () {
            const textToSummarize = ` 
      Two independent experiments reported their results this morning at CERN, Europe's high-energy physics laboratory near Geneva in Switzerland. Both show convincing evidence of a new boson particle weighing around 125 gigaelectronvolts, which so far fits predictions of the Higgs previously made by theoretical physicists.
    
      ""As a layman I would say: 'I think we have it'. Would you agree?"" Rolf-Dieter Heuer, CERN's director-general, asked the packed auditorium. The physicists assembled there burst into applause.
     :`;

            const summarizationPrompt = [
              ` 
      Summarize the following text.
    
      Text:
      """"""
      ${textToSummarize}
      """"""
    
      Summary:
    `,
            ];

            const deploymentName = "gpt-35-turbo";

            const { choices } = await client.completions.create({
              model: deploymentName,
              prompt: summarizationPrompt,
            });
            const completion = choices[0].text;
            assert.isDefined(completion);
          });

          it("Use chat tools", async function () {
            const deploymentName = "gpt-35-turbo-16k";

            const getCurrentWeather = {
              name: "get_current_weather",
              description: "Get the current weather in a given location",
              parameters: {
                type: "object",
                properties: {
                  location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                  },
                  unit: {
                    type: "string",
                    enum: ["celsius", "fahrenheit"],
                  },
                },
                required: ["location"],
              },
            };

            const messages = [
              { role: "user", content: "What is the weather like in Boston?" } as const,
            ];

            const options = {
              tools: [
                {
                  type: "function",
                  function: getCurrentWeather,
                } as const,
              ],
            };
            const result = await client.chat.completions.create({
              model: deploymentName,
              messages,
              ...options,
            });
            function applyToolCall({
              function: call,
              id,
            }: ChatCompletionMessageToolCall): ChatCompletionToolMessageParam {
              if (call.name === "get_current_weather") {
                const { location, unit } = JSON.parse(call.arguments);
                return {
                  role: "tool",
                  content: `The weather in ${location} is 72 degrees ${unit} and sunny.`,
                  tool_call_id: id,
                };
              }
              throw new Error(`Unknown tool call: ${call.name}`);
            }
            const choice = result.choices[0];
            const responseMessage = choice.message;
            if (responseMessage?.role === "assistant") {
              const requestedToolCalls = responseMessage?.tool_calls;
              if (requestedToolCalls?.length) {
                const toolCallResolutionMessages = [
                  ...messages,
                  responseMessage,
                  ...requestedToolCalls.map(applyToolCall),
                ];
                const finalResult = await client.chat.completions.create({
                  model: deploymentName,
                  messages: toolCallResolutionMessages,
                });
                assert.isDefined(finalResult.choices[0].message?.content);
              }
            }
          });
        });

        describe(`[${apiVersion}] Dall-E`, function () {
          beforeEach(async function (context) {
            recorder = await startRecorder(context);
            client = createClient(authMethod, apiVersion, "dalle");
          });

          it("Generate Batch Image", async function () {
            const prompt = "a monkey eating a banana";
            const size = "1024x1024";
            const n = 1;
            const deploymentName = "dall-e-3";

            const results = await client.images.generate({
              model: deploymentName,
              prompt,
              n,
              size,
            });

            for (const image of results.data) {
              assert.isString(image.url);
            }
          });

          it("Chat with images", async function () {
            const url =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";
            const deploymentName = "gpt-4-vision-preview";
            const messages: ChatCompletionUserMessageParam[] = [
              {
                role: "user",
                content: [
                  {
                    type: "image_url",
                    image_url: {
                      url,
                      detail: "auto",
                    },
                  },
                ],
              },
            ];

            const result = await client.chat.completions.create({
              model: deploymentName,
              messages,
            });
            assert.isString(result.choices[0].message?.content);
          });
        });

      });
    });
  });
});
