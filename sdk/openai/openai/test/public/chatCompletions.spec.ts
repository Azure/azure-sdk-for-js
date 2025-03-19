// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import {
  createClientsAndDeployments,
  filterClientsAndDeployments,
} from "../utils/createClients.js";
import type { APIVersion } from "../utils/utils.js";
import {
  APIMatrix,
  bufferAsyncIterable,
  createAzureSearchExtensions,
  testWithDeployments,
  withDeployments,
} from "../utils/utils.js";
import {
  assertChatCompletions,
  assertChatCompletionsList,
  assertParsedChatCompletion,
} from "../utils/asserts.js";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { functionCallModelsToSkip } from "../utils/models.js";
import "../../src/types/index.js";
import { assertMathResponseOutput, type MathResponse } from "../utils/structuredOutputUtils.js";

describe.shuffle.each(APIMatrix)("Chat Completions [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(
    apiVersion,
    { chatCompletion: "true" },
    {
      clientOptions: { maxRetries: 0 },
      deploymentsToSkip: ["o1" /** It gets stuck and never returns */],
      modelsToSkip: [
        { name: "gpt-4o-audio-preview" },
        { name: "gpt-4o-mini-audio-preview" },
        { name: "o3-mini" /** Unsupported with this API version */ },
      ],
    },
  );

  describe("chat.completions.create", () => {
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

    it("returns completions across all models", async () => {
      await withDeployments(
        clientsAndDeploymentsInfo,
        (client, deploymentName) =>
          client.chat.completions.create({
            model: deploymentName,
            messages: pirateMessages,
          }),
        assertChatCompletions,
      );
    });

    it("calls functions", async () => {
      await withDeployments(
        clientsAndDeploymentsInfo,
        async (client, deploymentName) => {
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
        functionCallModelsToSkip,
      );
    });

    it("doesn't call tools if toolChoice is set to none", async () => {
      await withDeployments(
        clientsAndDeploymentsInfo,
        (client, deploymentName) =>
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
      );
    });

    it("calls a specific tool if its name is specified", async () => {
      await withDeployments(
        clientsAndDeploymentsInfo,
        (client, deploymentName) =>
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
      );
    });

    it("ensures schema name is not transformed with snake case", async () => {
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
      await withDeployments(
        clientsAndDeploymentsInfo,
        (client, deploymentName) =>
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
        functionCallModelsToSkip,
      );
    });

    it("respects json_object responseFormat", async () => {
      await withDeployments(
        filterClientsAndDeployments(clientsAndDeploymentsInfo, {
          jsonObjectResponse: "true",
        }),
        (client, deploymentName) =>
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
          } catch {
            assert.fail(`Invalid JSON: ${content}`);
          }
        },
      );
    });

    describe.concurrent.each(createAzureSearchExtensions())(
      "works with data sources [%o]",
      async (config) => {
        await testWithDeployments({
          clientsAndDeploymentsInfo,
          run: (client, model) =>
            client.chat.completions.create({
              model: model,
              messages: byodMessages,
              data_sources: [config],
            }),
          validate: assertChatCompletions,
          modelsListToSkip: [
            { name: "gpt-35-turbo-0613" }, // Unsupported model
            { name: "gpt-4-32k" }, // Managed identity is not enabled
            { name: "o1-preview" }, // o-series models are not supported with OYD.
            { name: "o1-mini" },
            { name: "gpt-4", version: "vision-preview" },
          ],
          acceptableErrors: {
            messageSubstring: [
              "Invalid AzureCognitiveSearch configuration detected", // gpt-4-1106-preview and others
              "Managed Identity (MI) is not set for this account while the encryption key source is 'Microsoft.KeyVault', customer managed storage or Network Security Perimeter is used.",
            ],
          },
        });
      },
    );

    describe("return stream", () => {
      it("returns completions across all models", async () => {
        await withDeployments(
          clientsAndDeploymentsInfo,
          async (client, deploymentName) =>
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
        );
      });

      it("calls functions", async () => {
        await withDeployments(
          clientsAndDeploymentsInfo,
          async (client, deploymentName) =>
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
        );
      });

      it("calls toolCalls", async () => {
        await withDeployments(
          clientsAndDeploymentsInfo,
          async (client, deploymentName) =>
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
        );
      });

      describe.concurrent.each(createAzureSearchExtensions())(
        "works with data sources [%o])",
        async (config) => {
          await testWithDeployments({
            clientsAndDeploymentsInfo,
            run: async (client, model) =>
              bufferAsyncIterable(
                await client.chat.completions.create({
                  model: model,
                  messages: byodMessages,
                  stream: true,
                  data_sources: [config],
                }),
              ),
            validate: assertChatCompletionsList,
            modelsListToSkip: [
              { name: "gpt-35-turbo-0613" }, // Unsupported model
              { name: "gpt-4-32k" }, // Managed identity is not enabled
              { name: "o1-preview" }, // o-series models are not supported with OYD.
              { name: "o1-mini" },
              { name: "gpt-4", version: "vision-preview" },
            ],
            acceptableErrors: {
              messageSubstring: [
                "Invalid AzureCognitiveSearch configuration detected", // gpt-4-1106-preview and others
                "Managed Identity (MI) is not set for this account while the encryption key source is 'Microsoft.KeyVault', customer managed storage or Network Security Perimeter is used.",
              ],
            },
          });
        },
      );

      describe("chat.completions.parse", () => {
        describe("structured output for chat completions", async () => {
          await testWithDeployments({
            clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
              jsonSchemaResponse: "true",
            }),
            run: async (client, deploymentName) => {
              const step = z.object({
                explanation: z.string(),
                output: z.string(),
              });

              const mathResponse = z.object({
                steps: z.array(step),
                final_answer: z.string(),
              });

              return client.beta.chat.completions.parse({
                model: deploymentName,
                messages: [
                  {
                    role: "system",
                    content:
                      "You are a helpful math tutor. Only use the schema for math responses.",
                  },
                  { role: "user", content: "solve 8x + 3 = 21" },
                ],
                response_format: zodResponseFormat(mathResponse, "mathResponse"),
              });
            },
            validate: (result) => {
              assertParsedChatCompletion<MathResponse>(result, assertMathResponseOutput, {
                allowEmptyChoices: true,
              });
            },
          });
        });
      });
    });
  });
});
