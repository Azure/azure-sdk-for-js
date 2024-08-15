// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure-tools/test-utils-vitest";
import { assert, describe, beforeEach, it, beforeAll } from "vitest";
import { createClient } from "./utils/createClient.js";
import { APIMatrix, APIVersion, DeploymentInfo } from "./utils/utils.js";
import OpenAI, { AzureOpenAI } from "openai";
import {
  assertChatCompletions,
  assertChatCompletionsList,
  assertCompletions,
  assertCompletionsStream,
} from "./utils/asserts.js";
import {
  bufferAsyncIterable,
  createAzureSearchExtension,
  getDeployments,
  getSucceeded,
  updateWithSucceeded,
  withDeployments,
} from "./utils/utils.js";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import "@azure/openai/types";
import { functionCallModels } from "./utils/models.js";

describe("Completions", function () {
  let deployments: DeploymentInfo[] = [];

  beforeAll(async function () {
    deployments = await getDeployments("completions");
  });

  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let client: AzureOpenAI | OpenAI;

      beforeEach(async function () {
        client = createClient(apiVersion, "completions");
      });

      describe("completions", function () {
        it("returns completions across all models", async function () {
          const prompt = ["What is Azure OpenAI?"];
          await withDeployments(
            deployments,
            (deploymentName) => client.completions.create({ model: deploymentName, prompt }),
            assertCompletions,
          );
        });
      });

      describe("completions stream", function () {
        it("returns completions stream", async function () {
          const prompt = ["This is Azure OpenAI?"];
          await withDeployments(
            deployments,
            (deploymentName) =>
              client.completions.create({ model: deploymentName, prompt, stream: true }),
            // The API returns an empty choice in the first event for some
            // reason. This should be fixed in the API.
            (result) => assertCompletionsStream(result, { allowEmptyChoices: true }),
          );
        });

        it("stream long completions", async function () {
          const prompt = [
            `##### Translate this code snippet into Python. Use Azure SDKs where possible.
  \`\`\`
  using System.Threading.Tasks;
  using Microsoft.AspNetCore.Mvc;
  using Microsoft.Azure.WebJobs;
  using Microsoft.Azure.WebJobs.Extensions.Http;
  using Microsoft.AspNetCore.Http;
  using Microsoft.Extensions.Logging;
  using System;
  using Azure.Messaging.EventGrid;
  using Azure.Messaging.EventGrid.SystemEvents;
  
  namespace Function1
  {
      public static class Function1
      {
          [FunctionName("Function1")]
          public static async Task<IActionResult> Run(
              [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
              ILogger log)
          {
              log.LogInformation("C# HTTP trigger function processed a request.");
              string response = string.Empty;
              BinaryData events = await BinaryData.FromStreamAsync(req.Body);
              log.LogInformation($"Received events: {events}");
  
              EventGridEvent[] eventGridEvents = EventGridEvent.ParseMany(events);
  
              foreach (EventGridEvent eventGridEvent in eventGridEvents)
              {
                  // Handle system events
                  if (eventGridEvent.TryGetSystemEventData(out object eventData))
                  {
                      // Handle the subscription validation event
                      if (eventData is SubscriptionValidationEventData subscriptionValidationEventData)
                      {
                          log.LogInformation($"Got SubscriptionValidation event data, validation code: {subscriptionValidationEventData.ValidationCode}, topic: {eventGridEvent.Topic}");
                          // Do any additional validation (as required) and then return back the below response
                          var responseData = new
                          {
                              ValidationResponse = subscriptionValidationEventData.ValidationCode
                          };
  
                          return new OkObjectResult(responseData);
                      }
                  }
              }
              return new OkObjectResult(response);
          }
      }
  }
  
  \`\`\`
  `,
          ];
          await withDeployments(
            deployments,
            (deploymentName) =>
              client.completions.create(
                { model: deploymentName, prompt, stream: true, max_tokens: 2048 },
                { timeout: 10000 },
              ),

            // The API returns an empty choice in the first event for some
            // reason. This should be fixed in the API.
            (result) => assertCompletionsStream(result, { allowEmptyChoices: true }),
          );
        });
      });

      describe("chat completions", function () {
        const pirateMessages = [
          {
            role: "system",
            content: "You are a helpful assistant. You will talk like a pirate.",
          } as const,
          { role: "user", content: "Can you help me?" } as const,
          {
            role: "assistant",
            content: "Arrrr! Of course, me hearty! What can I do for ye?",
          } as const,
          { role: "user", content: "What's the best way to train a parrot?" } as const,
        ];
        const byodMessages = [
          {
            role: "user",
            content:
              "What's the most common feedback we received from our customers about the product?",
          } as const,
        ];
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
        const chatCompletionDeployments: DeploymentInfo[] = [];

        describe("getChatCompletions", function () {
          it("returns completions across all models", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                (deploymentName) =>
                  client.chat.completions.create({
                    model: deploymentName,
                    messages: pirateMessages,
                  }),
                assertChatCompletions,
              ),
              chatCompletionDeployments,
            );
          });

          it("calls functions", async function () {
            await withDeployments(
              getSucceeded(deployments, chatCompletionDeployments),
              async (deploymentName) => {
                const weatherMessages: ChatCompletionMessageParam[] = [
                  { role: "user", content: "What's the weather like in Boston?" },
                ];
                const result = await client.chat.completions.create({
                  model: deploymentName,
                  messages: weatherMessages,
                  functions: [getCurrentWeather],
                });
                assertChatCompletions(result, { functions: true });
                const responseMessage = result.choices[0].message;
                if (!responseMessage?.function_call) {
                  assert.fail("Undefined function call");
                }
                const functionArgs = JSON.parse(responseMessage.function_call.arguments);
                weatherMessages.push(responseMessage);
                weatherMessages.push({
                  role: "function",
                  name: responseMessage.function_call.name,
                  content: JSON.stringify({
                    location: functionArgs.location,
                    temperature: "72",
                    unit: functionArgs.unit,
                    forecast: ["sunny", "windy"],
                  }),
                });
                return client.chat.completions.create({
                  model: deploymentName,
                  messages: weatherMessages,
                });
              },
              (result) => assertChatCompletions(result, { functions: true }),
              functionCallModels,
            );
          });

          it("doesn't call tools if toolChoice is set to none", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                (deploymentName) =>
                  client.chat.completions.create({
                    model: deploymentName,
                    messages: [{ role: "user", content: "What's the weather like in Boston?" }],
                    tool_choice: "none",
                    tools: [{ type: "function", function: getCurrentWeather }],
                  }),
                (res) => {
                  assertChatCompletions(res, { functions: false });
                  assert.isUndefined(res.choices[0].message?.tool_calls);
                },
              ),
              chatCompletionDeployments,
            );
          });

          it("calls a specific tool if its name is specified", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                (deploymentName) =>
                  client.chat.completions.create({
                    model: deploymentName,
                    messages: [{ role: "user", content: "What's the weather like in Boston?" }],

                    tool_choice: {
                      type: "function",
                      function: { name: getCurrentWeather.name },
                    },
                    tools: [
                      { type: "function", function: getCurrentWeather },
                      {
                        type: "function",
                        function: {
                          name: "get_current_weather2",
                          description: "Get the current weather in a given location in the US",
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
                        },
                      },
                    ],
                  }),
                (res) => {
                  assertChatCompletions(res, { functions: true });
                  const toolCalls = res.choices[0].message?.tool_calls;
                  if (!toolCalls) {
                    throw new Error("toolCalls should be defined here");
                  }
                  assert.equal(toolCalls[0].function.name, getCurrentWeather.name);
                  assert.isUndefined(res.choices[0].message?.function_call);
                },
              ),
              chatCompletionDeployments,
            );
          });

          it("ensure schema name is not transformed with snake case", async function () {
            const getAssetInfo = {
              name: "getAssetInfo",
              description: "Returns information about an asset",
              parameters: {
                type: "object",
                properties: {
                  assetName: {
                    type: "string",
                    description: "The asset name. This is a required parameter.",
                  },
                },
                required: ["assetName"],
              },
            };
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                (deploymentName) =>
                  client.chat.completions.create({
                    model: deploymentName,
                    messages: [{ role: "user", content: "Give me information about Asset No1" }],
                    tools: [{ type: "function", function: getAssetInfo }],
                  }),
                (res) => {
                  assertChatCompletions(res, { functions: true });
                  const toolCalls = res.choices[0].message?.tool_calls;
                  if (!toolCalls) {
                    throw new Error("toolCalls should be defined here");
                  }
                  const argument = toolCalls[0].function.arguments;
                  assert.isTrue(argument?.includes("assetName"));
                },
              ),
              chatCompletionDeployments,
            );
          });

          it("respects json_object responseFormat", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                (deploymentName) =>
                  client.chat.completions.create({
                    model: deploymentName,
                    messages: [
                      {
                        role: "user",
                        content:
                          "Answer the following question in JSON format: What are the capital cities in Africa?",
                      },
                    ],
                    response_format: { type: "json_object" },
                  }),
                (res) => {
                  assertChatCompletions(res, { functions: false });
                  const content = res.choices[0].message?.content;
                  if (!content) assert.fail("Undefined content");
                  try {
                    JSON.parse(content);
                  } catch (e) {
                    assert.fail(`Invalid JSON: ${content}`);
                  }
                },
              ),
              chatCompletionDeployments,
            );
          });

          it("bring your own data", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                (deploymentName) =>
                  client.chat.completions.create({
                    model: deploymentName,
                    messages: byodMessages,
                    data_sources: [createAzureSearchExtension()],
                  }),
                assertChatCompletions,
              ),
              chatCompletionDeployments,
            );
          });
        });

        describe("streamChatCompletions", function () {
          it("returns completions across all models", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.chat.completions.create({
                      model: deploymentName,
                      messages: pirateMessages,
                      stream: true,
                    }),
                  ),
                (res) =>
                  assertChatCompletionsList(res, {
                    // The API returns an empty choice in the first event for some
                    // reason. This should be fixed in the API.
                    allowEmptyChoices: true,
                    // The API returns an empty ID in the first event for some
                    // reason. This should be fixed in the API.
                    allowEmptyId: true,
                  }),
              ),
              chatCompletionDeployments,
            );
          });

          it("calls functions", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.chat.completions.create({
                      model: deploymentName,
                      messages: [{ role: "user", content: "What's the weather like in Boston?" }],
                      stream: true,
                      functions: [getCurrentWeather],
                    }),
                  ),
                (res) =>
                  assertChatCompletionsList(res, {
                    functions: true,
                    // The API returns an empty choice in the first event for some
                    // reason. This should be fixed in the API.
                    allowEmptyChoices: true,
                  }),
              ),
              chatCompletionDeployments,
            );
          });

          it("calls toolCalls", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.chat.completions.create({
                      model: deploymentName,
                      messages: [{ role: "user", content: "What's the weather like in Boston?" }],
                      stream: true,
                      tools: [{ type: "function", function: getCurrentWeather }],
                    }),
                  ),
                (res) =>
                  assertChatCompletionsList(res, {
                    functions: true,
                    // The API returns an empty choice in the first event for some
                    // reason. This should be fixed in the API.
                    allowEmptyChoices: true,
                  }),
              ),
              chatCompletionDeployments,
            );
          });

          it("bring your own data", async function () {
            const dataSources = { data_sources: [createAzureSearchExtension()] };
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(deployments, chatCompletionDeployments),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.chat.completions.create({
                      model: deploymentName,
                      messages: byodMessages,
                      stream: true,
                      ...dataSources,
                    }),
                  ),
                assertChatCompletionsList,
              ),
              chatCompletionDeployments,
            );
          });
        });
      });
    });
  });
});
