// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe } from "vitest";
import { testWithDeployments, APIVersion } from "../utils/utils.js";
import {
  createClientsAndDeployments,
  filterClientsAndDeployments,
} from "../utils/createClients.js";
import { z } from "zod";
import { zodResponsesFunction, zodTextFormat } from "openai/helpers/zod";
import {
  assertParsedResponseOutput,
  assertResponse,
  assertResponseStreamEvent,
} from "../utils/asserts.js";
import { ResponseStreamEvent } from "openai/resources/responses/responses.mjs";
import { readFileSync } from "fs";
import { join } from "path";

// Regardless of request computer-use-preview (2025-02-11) always return Error: 400 Resource Id is badly formed or from wrong namespace: NA
const modelsToSkip = [{ name: "computer-use-preview", version: "2025-02-11" }];

describe.shuffle.each([APIVersion.Preview])("Responses [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(
    apiVersion,
    {
      responses: "true",
      // Known eror to use models with completion capabilities only
      // Error "message": "This is a chat model and not supported in the v1/completions endpoint. Did you mean to use v1/chat/completions?"
      completion: "true",
    },
    {
      modelsToSkip: modelsToSkip,
    },
  );

  describe("responses.create", () => {
    describe("creates basic text response xx", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) => {
          return client.responses.create({
            model: deploymentName,
            input: "What is 2+2?",
          });
        },
        validate: (res) => {
          assertResponse(res);
        },
      });
    });

    describe("uses computer tool", async () => {
      // Filter deployments only for computer-use-preview model
      const filteredClientAndDeployments = [];
      let filteredCount = 0;

      for (const clientAndDeployment of clientsAndDeploymentsInfo.clientsAndDeployments) {
        const filteredDeployments = [];
        for (const deployment of clientAndDeployment.deployments) {
          if (deployment.model.name === "computer-use-preview") {
            filteredDeployments.push(deployment);
          }
        }

        if (filteredDeployments.length > 0) {
          filteredCount += filteredDeployments.length;
          filteredClientAndDeployments.push({
            ...clientAndDeployment,
            deployments: filteredDeployments,
          });
        }
      }

      const filteredClientsAndDeploymentsInfo = {
        clientsAndDeployments: filteredClientAndDeployments,
        count: filteredCount,
      };

      await testWithDeployments({
        clientsAndDeploymentsInfo: filteredClientsAndDeploymentsInfo,
        run: async (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input: "I'm looking for a new camera. Help me find the best one.",
            tools: [
              {
                type: "computer-preview",
                display_height: 1024,
                display_width: 768,
                environment: "windows",
              },
            ],
            truncation: "auto",
          }),
        validate: (res) => {
          assertResponse(res);
        },
      });
    });

    // TODO: Unskip the text for known error: Web Search tool is not enabled for this organization
    describe.skip("uses web search tool", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input: "What are the latest developments in renewable energy?",
            tools: [
              {
                type: "web_search_preview",
                search_context_size: "high",
                user_location: {
                  type: "approximate",
                  city: "San Francisco",
                  country: "US",
                  region: "California",
                  timezone: "America/Los_Angeles",
                },
              },
            ],
          }),
        validate: (res) => {
          assertResponse(res);
        },
      });
    });

    // TODO: Update to add and remove vector store
    describe.skip("uses file search tool", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input: "Find information about renewable energy in documents",
            tools: [
              {
                type: "file_search",
                vector_store_ids: ["test-store"],
                max_num_results: 3,
                ranking_options: {
                  ranker: "default-2024-11-15",
                  score_threshold: 0.8,
                },
              },
            ],
          }),
        validate: (res) => {
          const fileSearch = res.output.find((item) => item.type === "file_search_call");
          assert.isDefined(fileSearch);
        },
      });
    });

    describe("uses function tool", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
          completion: "true",
        }),
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input: "What's the weather in Boston?",
            truncation: "auto",
            tools: [
              {
                type: "function",
                name: "get_weather",
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
                strict: false,
                description: "Get the weather for a location",
              },
            ],
          }),
        validate: (res) => {
          assertResponse(res);
        },
      });
    });

    describe("uses parallel tool calls", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
          completion: "true",
        }),
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input:
              "Compare the temperature in Boston and Chicago, and find recent news about weather patterns in these cities.",
            parallel_tool_calls: true,
            truncation: "auto",
            tools: [
              {
                type: "function",
                name: "get_weather",
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
                strict: false,
                description: "Get the weather for a location",
              },
              {
                type: "function",
                name: "get_news",
                parameters: {
                  type: "object",
                  properties: {
                    topic: {
                      type: "string",
                      description: "The topic to search news for",
                    },
                    location: {
                      type: "string",
                      description: "The location to get news for",
                    },
                    max_results: {
                      type: "number",
                      description: "Maximum number of news articles to return",
                      minimum: 1,
                      maximum: 10,
                    },
                  },
                  required: ["topic", "location"],
                },
                strict: false,
                description: "Get recent news articles about a topic in a specific location",
              },
            ],
          }),
        validate: (res) => {
          assertResponse(res);
          assert.isTrue(res.parallel_tool_calls);
          // Should have multiple tool calls in the output
          const toolCalls = res.output.filter(
            (item) => "type" in item && item.type === "function_call",
          );
          assert.isAtLeast(toolCalls.length, 2, "Should have at least 2 parallel tool calls");
        },
      });
    });

    describe("handles image url inputs", async () => {
      // TODO: Move this to test setup to run both in Node and Browser
      function imageToBase64(imagePath: string): string {
        const imageBuffer = readFileSync(join(__dirname, "./assets", imagePath));
        return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
      }

      await testWithDeployments({
        clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
          completion: "true",
        }),
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            truncation: "auto",
            input: [
              {
                type: "message",
                role: "user",
                content: [
                  {
                    type: "input_text",
                    text: "What's in this image?",
                  },
                  {
                    type: "input_image",
                    image_url: imageToBase64("cat.jpg"),
                    detail: "auto",
                  },
                ],
              },
            ],
          }),
        validate: (res) => {
          assertResponse(res);
        },
      });
    });

    describe("streams responses", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
          completion: "true",
        }),
        run: async (client, deploymentName) => {
          const stream = await client.responses.create({
            model: deploymentName,
            input: "Count from 1 to 5",
            stream: true,
            truncation: "auto",
          });

          const events: ResponseStreamEvent[] = [];
          for await (const chunk of stream) {
            events.push(chunk);
          }
          return events;
        },
        validate: (events) => {
          events.forEach((event) => {
            assertResponseStreamEvent(event);
          });
        },
      });
    });
  });

  describe("responses.stream", () => {
    describe("streams response events", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
          completion: "true",
        }),
        run: async (client, deploymentName) => {
          const events: ResponseStreamEvent[] = [];
          const stream = client.responses.stream({
            model: deploymentName,
            truncation: "auto",
            input: "solve 8x + 31 = 2",
          });

          for await (const event of stream) {
            events.push(event);
          }

          return events;
        },
        validate: (events) => {
          events.forEach((event) => {
            assertResponseStreamEvent(event);
          });
        },
      });
    });
  });

  describe("responses.parse", () => {
    const Step = z.object({
      explanation: z.string(),
      output: z.string(),
    });

    const MathResponse = z.object({
      steps: z.array(Step),
      final_answer: z.string(),
    });

    describe("parses structured output", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
          jsonSchemaResponse: "true",
        }),
        run: (client, deploymentName) =>
          client.responses.parse({
            model: deploymentName,
            input: "solve 8x + 31 = 2",
            text: {
              format: zodTextFormat(MathResponse, "math_response"),
            },
          }),
        validate: (result) => {
          assertParsedResponseOutput(result);
        },
        // TODO: Known issues that's not working
        acceptableErrors: {
          messageSubstring: ["Unexpected token T in JSON at position 0"],
        },
      });
    });

    describe("responses.parse with tools", () => {
      const Table = z.enum(["orders", "customers", "products"]);
      const Column = z.enum([
        "id",
        "status",
        "expected_delivery_date",
        "delivered_at",
        "shipped_at",
        "ordered_at",
        "canceled_at",
      ]);
      const Operator = z.enum(["=", ">", "<", "<=", ">=", "!="]);
      const OrderBy = z.enum(["asc", "desc"]);
      const DynamicValue = z.object({
        column_name: Column,
      });

      const Condition = z.object({
        column: Column,
        operator: Operator,
        value: z.union([z.string(), z.number(), DynamicValue]),
      });

      const Query = z.object({
        table_name: Table,
        columns: z.array(Column),
        conditions: z.array(Condition),
        order_by: OrderBy,
      });

      describe("parses structured output with tools", async () => {
        const tool = zodResponsesFunction({ name: "query", parameters: Query });
        await testWithDeployments({
          clientsAndDeploymentsInfo: filterClientsAndDeployments(clientsAndDeploymentsInfo, {
            jsonSchemaResponse: "true",
          }),
          run: (client, deploymentName) =>
            client.responses.parse({
              model: deploymentName,
              input:
                "look up all my orders in november of last year that were fulfilled but not delivered on time",
              tools: [tool],
            }),
          validate: (result) => {
            assertParsedResponseOutput(result);
          },
        });
      });
    });
  });
});
