// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import { assert, describe, beforeEach, it } from "vitest";
import { createClientsAndDeployments } from "../utils/createClients.js";
import type { APIVersion } from "../utils/utils.js";
import { assertChatCompletions, assertChatCompletionsList } from "../utils/asserts.js";
import {
  APIMatrix,
  bufferAsyncIterable,
  createAzureSearchExtension,
  withDeployments,
} from "../utils/utils.js";
import { type ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { functionCallModelsToSkip, jsonResponseModelsToSkip } from "../utils/models.js";
import "../../src/types/index.js";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";

describe("Chat Completions", function () {
  matrix([APIMatrix] as const, async function (apiVersion: APIVersion) {
    describe(`[${apiVersion}] Client`, () => {
      let clientsAndDeployments: ClientsAndDeploymentsInfo;

      beforeEach(async function () {
        clientsAndDeployments = createClientsAndDeployments(
          apiVersion,
          { chatCompletion: "true" },
          {
            deploymentsToSkip: ["o1" /** It gets stuck and never returns */],
            modelsToSkip: [{ name: "gpt-4o-audio-preview" }],
          },
        );
      });

      describe("chat.completions.create", function () {
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

        it("returns completions across all models", async function () {
          await withDeployments(
            clientsAndDeployments,
            (client, deploymentName) =>
              client.chat.completions.create({
                model: deploymentName,
                messages: pirateMessages,
              }),
            assertChatCompletions,
          );
        });

        it("calls functions", async function () {
          await withDeployments(
            clientsAndDeployments,
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

        it("doesn't call tools if toolChoice is set to none", async function () {
          await withDeployments(
            clientsAndDeployments,
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

        it("calls a specific tool if its name is specified", async function () {
          await withDeployments(
            clientsAndDeployments,
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
          await withDeployments(
            clientsAndDeployments,
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

        it("respects json_object responseFormat", async function () {
          clientsAndDeployments = createClientsAndDeployments(apiVersion, {
            chatCompletion: "true",
            jsonObjectResponse: "true",
          });
          await withDeployments(
            clientsAndDeployments,
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
            jsonResponseModelsToSkip,
          );
        });

        it("bring your data", async function () {
          await withDeployments(
            clientsAndDeployments,
            (client, deploymentName) =>
              client.chat.completions.create({
                model: deploymentName,
                messages: byodMessages,
                data_sources: [createAzureSearchExtension()],
              }),
            assertChatCompletions,
          );
        });

        describe("return stream", function () {
          it("returns completions across all models", async function () {
            await withDeployments(
              clientsAndDeployments,
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

          it("calls functions", async function () {
            await withDeployments(
              clientsAndDeployments,
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

          it("calls toolCalls", async function () {
            await withDeployments(
              clientsAndDeployments,
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

          it("bring your data", async function () {
            const dataSources = { data_sources: [createAzureSearchExtension()] };
            await withDeployments(
              clientsAndDeployments,
              async (client, deploymentName) =>
                bufferAsyncIterable(
                  await client.chat.completions.create({
                    model: deploymentName,
                    messages: byodMessages,
                    stream: true,
                    ...dataSources,
                  }),
                ),
              assertChatCompletionsList,
              [{ name: "gpt-4", version: "vision-preview" }],
            );
          });
        });
      });
    });
  });
});
