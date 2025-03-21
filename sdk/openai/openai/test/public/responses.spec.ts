// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { testWithDeployments, withDeployments } from "../utils/utils.js";
import { createClientsAndDeployments } from "../utils/createClients.js";
import { APIVersion } from "../utils/utils.js";
import { z } from "zod";
import { zodResponsesFunction, zodTextFormat } from "openai/helpers/zod";
import {
  assertParsedResponseOutput,
  assertResponse,
  assertResponseStreamEvent,
} from "../utils/asserts.js";
import { ResponseStreamEvent } from "openai/resources/responses/responses.mjs";

describe.shuffle.each([APIVersion.Latest])("Responses [%s]", (apiVersion: APIVersion) => {
  const clientsAndDeploymentsInfo = createClientsAndDeployments(apiVersion, { responses: "true" });

  describe("responses.create", () => {
    it("creates basic text response", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input: "What is 2+2?",
          }),
        validate: (res) => {
          assertResponse(res);
        },
      });
    });

    it("uses web search tool", async () => {
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

    it("uses computer tool", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input: "Open calculator app",
            tools: [
              {
                type: "computer-preview",
                display_height: 800,
                display_width: 600,
                environment: "mac",
              },
            ],
          }),
        validate: (res) => {
          const computerCall = res.output.find((item) => item.type === "computer_call");
          assert.isDefined(computerCall);
        },
      });
    });

    it("uses file search tool", async () => {
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

    it("uses function tool", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: (client, deploymentName) =>
          client.responses.create({
            model: deploymentName,
            input: "What's the weather in Boston?",
            tools: [
              {
                type: "function",
                name: "get_weather",
                parameters: {
                  type: "object",
                  properties: {
                    location: {
                      type: "string",
                      description: "The city to get weather for",
                    },
                  },
                  required: ["location"],
                },
                strict: true,
                description: "Get the weather for a location",
              },
            ],
          }),
        validate: (res) => {
          const functionCall = res.output.find((item) => item.type === "function_call");
          assert.isDefined(functionCall);
        },
      });
    });

    it("streams responses", async () => {
      await testWithDeployments({
        clientsAndDeploymentsInfo,
        run: async (client, deploymentName) => {
          const stream = await client.responses.create({
            model: deploymentName,
            input: "Count from 1 to 5",
            stream: true,
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

  describe("responses.parse", () => {
    const Step = z.object({
      explanation: z.string(),
      output: z.string(),
    });

    const MathResponse = z.object({
      steps: z.array(Step),
      final_answer: z.string(),
    });

    it("parses structured output", async () => {
      await withDeployments(
        clientsAndDeploymentsInfo,
        (client, deploymentName) =>
          client.responses.parse({
            model: deploymentName,
            input: "solve 8x + 31 = 2",
            text: {
              format: zodTextFormat(MathResponse, "math_response"),
            },
          }),
        (result) => {
          assertParsedResponseOutput(result);
        },
      );
    });
  });

  describe("responses.stream", () => {
    it("streams response events", async () => {
      await withDeployments(
        clientsAndDeploymentsInfo,
        async (client, deploymentName) => {
          const events: ResponseStreamEvent[] = [];
          const stream = client.responses.stream({
            model: deploymentName,
            input: "solve 8x + 31 = 2",
          });

          for await (const event of stream) {
            events.push(event);
          }

          return events;
        },
        (events) => {
          events.forEach((event) => {
            assertResponseStreamEvent(event);
          });
        },
      );
    });
  });

  describe("responses with tools", () => {
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

    it("parses structured tool output", async () => {
      const tool = zodResponsesFunction({ name: "query", parameters: Query });
      await withDeployments(
        clientsAndDeploymentsInfo,
        (client, deploymentName) =>
          client.responses.parse({
            model: deploymentName,
            input:
              "look up all my orders in november of last year that were fulfilled but not delivered on time",
            tools: [tool],
          }),
        (result) => {
          assertParsedResponseOutput(result);
        },
      );
    });
  });
});
