// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert, matrix } from "@azure/test-utils";
import { Context } from "mocha";
import { createClient, startRecorder } from "./utils/recordedClient.js";
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
  getModels,
  getSucceeded,
  updateWithSucceeded,
  withDeployments,
} from "./utils/utils.js";
import {
  ChatCompletionsFunctionToolCall,
  ChatRequestMessage,
  ChatRequestMessageUnion,
  OpenAIClient,
} from "../../src/index.js";
import { AuthMethod } from "./types.js";

describe("OpenAI", function () {
  let recorder: Recorder;
  let deployments: string[] = [];
  let models: string[] = [];

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this.currentTest);
    if (!deployments.length || !models.length) {
      deployments = await getDeployments("completions", recorder);
      models = await getModels(recorder);
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  matrix([["AzureAPIKey", "OpenAIKey", "AAD"]] as const, async function (authMethod: AuthMethod) {
    describe(`[${authMethod}] Client`, () => {
      let client: OpenAIClient;

      beforeEach(async function (this: Context) {
        client = createClient(authMethod, "completions", { recorder });
      });

      describe("getCompletions", function () {
        it("returns completions across all models", async function () {
          const prompt = ["What is Azure OpenAI?"];
          await withDeployments(
            authMethod === "OpenAIKey" ? models : deployments,
            (deploymentName) => client.getCompletions(deploymentName, prompt),
            assertCompletions,
          );
        });
      });

      describe("streamCompletions", function () {
        it("returns completions stream", async function () {
          const prompt = ["This is Azure OpenAI?"];
          await withDeployments(
            authMethod === "OpenAIKey" ? models : deployments,
            (deploymentName) => client.streamCompletions(deploymentName, prompt),
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
            authMethod === "OpenAIKey" ? models : deployments,
            (deploymentName) =>
              client.streamCompletions(deploymentName, prompt, {
                maxTokens: 2048,
                requestOptions: { timeout: 10000 },
              }),

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
        const chatCompletionDeployments: string[] = [];
        const chatCompletionModels: string[] = [];

        describe("getChatCompletions", function () {
          it("returns completions across all models", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                (deploymentName) => client.getChatCompletions(deploymentName, pirateMessages),
                assertChatCompletions,
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod,
            );
          });

          it("calls functions", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                async (deploymentName) => {
                  const weatherMessages: ChatRequestMessageUnion[] = [
                    { role: "user", content: "What's the weather like in Boston?" },
                  ];
                  const result = await client.getChatCompletions(deploymentName, weatherMessages, {
                    functions: [getCurrentWeather],
                  });
                  assertChatCompletions(result, { functions: true });
                  const responseMessage = result.choices[0].message;
                  if (!responseMessage?.functionCall) {
                    assert.fail("Undefined function call");
                  }
                  const functionArgs = JSON.parse(responseMessage.functionCall.arguments);
                  weatherMessages.push(responseMessage as ChatRequestMessage);
                  weatherMessages.push({
                    role: "function",
                    name: responseMessage.functionCall.name,
                    content: JSON.stringify({
                      location: functionArgs.location,
                      temperature: "72",
                      unit: functionArgs.unit,
                      forecast: ["sunny", "windy"],
                    }),
                  });
                  return client.getChatCompletions(deploymentName, weatherMessages);
                },
                (result) => assertChatCompletions(result, { functions: true }),
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod,
            );
          });

          it("bring your own data", async function (this: Context) {
            if (authMethod === "OpenAIKey") {
              this.skip();
            }
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                (deploymentName) =>
                  client.getChatCompletions(deploymentName, byodMessages, {
                    azureExtensionOptions: {
                      extensions: [createAzureSearchExtension()],
                    },
                  }),
                assertChatCompletions,
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod,
            );
          });

          it("doesn't call tools if toolChoice is set to none", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                (deploymentName) =>
                  client.getChatCompletions(
                    deploymentName,
                    [{ role: "user", content: "What's the weather like in Boston?" }],
                    {
                      toolChoice: "none",
                      tools: [{ type: "function", function: getCurrentWeather }],
                    },
                  ),
                (res) => {
                  assertChatCompletions(res, { functions: false });
                  assert.isUndefined(res.choices[0].message?.toolCalls);
                  assert.isUndefined(res.choices[0].message?.functionCall);
                },
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod,
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
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                (deploymentName) =>
                  client.getChatCompletions(
                    deploymentName,
                    [{ role: "user", content: "Give me information about Asset No1" }],
                    {
                      tools: [{ type: "function", function: getAssetInfo }],
                    },
                  ),
                (res) => {
                  assertChatCompletions(res, { functions: true });
                  const toolCalls = res.choices[0].message?.toolCalls;
                  if (!toolCalls) {
                    throw new Error("toolCalls should be defined here");
                  }
                  const argument = (toolCalls[0] as ChatCompletionsFunctionToolCall).function
                    .arguments;
                  assert.isTrue(argument?.includes("assetName"));
                },
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod,
            );
          });

          it("respects json_object responseFormat", async function () {
            if (authMethod !== "OpenAIKey") {
              this.skip();
            }
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                (deploymentName) =>
                  client.getChatCompletions(
                    deploymentName,
                    [
                      {
                        role: "user",
                        content:
                          "Answer the following question in JSON format: What are the capital cities in Africa?",
                      },
                    ],
                    { responseFormat: { type: "json_object" } },
                  ),
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
              chatCompletionModels,
              authMethod,
            );
          });

          it("calls a specific tool if its name is specified", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                (deploymentName) =>
                  client.getChatCompletions(
                    deploymentName,
                    [{ role: "user", content: "What's the weather like in Boston?" }],
                    {
                      toolChoice: {
                        type: "function",
                        function: { name: getCurrentWeather.name },
                      } as any,
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
                    },
                  ),
                (res) => {
                  assertChatCompletions(res, { functions: true });
                  const toolCalls = res.choices[0].message?.toolCalls;
                  if (!toolCalls) {
                    throw new Error("toolCalls should be defined here");
                  }
                  assert.equal(
                    (toolCalls[0] as ChatCompletionsFunctionToolCall).function.name,
                    getCurrentWeather.name,
                  );
                  assert.isUndefined(res.choices[0].message?.functionCall);
                },
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod,
            );
          });
        });

        describe("streamChatCompletions", function () {
          it("returns completions across all models", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.streamChatCompletions(deploymentName, pirateMessages),
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
              chatCompletionModels,
              authMethod,
            );
          });

          it("calls functions", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.streamChatCompletions(
                      deploymentName,
                      [{ role: "user", content: "What's the weather like in Boston?" }],
                      {
                        functions: [getCurrentWeather],
                      },
                    ),
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
              chatCompletionModels,
              authMethod,
            );
          });

          it("calls toolCalls", async function () {
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.streamChatCompletions(
                      deploymentName,
                      [{ role: "user", content: "What's the weather like in Boston?" }],
                      {
                        tools: [{ type: "function", function: getCurrentWeather }],
                      },
                    ),
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
              chatCompletionModels,
              authMethod,
            );
          });

          it("bring your own data", async function () {
            if (authMethod === "OpenAIKey") {
              this.skip();
            }
            updateWithSucceeded(
              await withDeployments(
                getSucceeded(
                  authMethod,
                  deployments,
                  models,
                  chatCompletionDeployments,
                  chatCompletionModels,
                ),
                async (deploymentName) =>
                  bufferAsyncIterable(
                    await client.streamChatCompletions(deploymentName, byodMessages, {
                      azureExtensionOptions: {
                        extensions: [createAzureSearchExtension()],
                      },
                    }),
                  ),
                assertChatCompletionsList,
              ),
              chatCompletionDeployments,
              chatCompletionModels,
              authMethod,
            );
          });
        });
      });
    });
  });
});
