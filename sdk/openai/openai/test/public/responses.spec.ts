// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import { APIMatrix, withDeployments } from "../utils/utils.js";
import { createClientsAndDeployments } from "../utils/createClients.js";
import type { APIVersion } from "../utils/utils.js";
import { z } from "zod";
import { zodResponsesFunction, zodTextFormat } from "openai/helpers/zod";
import type { ClientsAndDeploymentsInfo } from "../utils/types.js";
import { assertParsedResponseOutput, ifDefined } from "../utils/asserts.js";
import { ResponseStreamEvent } from "openai/resources/responses/responses.mjs";

describe.shuffle.each(APIMatrix)("Responses [%s]", (apiVersion: APIVersion) => {
  let clientsAndDeploymentsInfo: ClientsAndDeploymentsInfo;

  clientsAndDeploymentsInfo = createClientsAndDeployments(
    apiVersion,
    { responses: "true" },
    {
      modelsToSkip: [{ name: "gpt-4o-audio-preview" }],
    }
  );

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
          ifDefined(result.output_parsed, (parsed) => {
            ifDefined(parsed.final_answer, assert.isString);
            ifDefined(parsed.steps, (steps) => {
              assert.isArray(steps);
              steps.forEach((step) => {
                ifDefined(step.explanation, assert.isString);
                ifDefined(step.output, assert.isString);
              });
            });
          });
        }
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
          assert.isNotEmpty(events);
          events.forEach((event) => {
            switch (event.type) {
              case "response.output_text.delta":
                assert.isNumber(event.content_index);
                assert.isString(event.delta);
                assert.isString(event.item_id);
                assert.isNumber(event.output_index);
                break;
              case "response.output_text.done":
                assert.isNumber(event.content_index);
                assert.isString(event.item_id);
                assert.isNumber(event.output_index);
                assert.isString(event.text);
                break;
              case "response.output_item.added":
                assert.isDefined(event.item);
                assert.isNumber(event.output_index);
                break;
              case "response.output_item.done":
                assert.isDefined(event.item);
                assert.isNumber(event.output_index);
                break;
              case "response.content_part.added":
                assert.isNumber(event.content_index);
                assert.isString(event.item_id);
                assert.isNumber(event.output_index);
                assert.isDefined(event.part);
                break;
              case "response.content_part.done":
                assert.isNumber(event.content_index);
                assert.isString(event.item_id);
                assert.isNumber(event.output_index);
                assert.isDefined(event.part);
                break;
              case "response.completed":
              case "response.failed":
              case "response.incomplete":
                assert.isDefined(event.response);
                break;
              case "error":
                assert.isString(event.message);
                ifDefined(event.code, assert.isString);
                ifDefined(event.param, assert.isString);
                break;
            }
          });
        }
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
            input: "look up all my orders in november of last year that were fulfilled but not delivered on time",
            tools: [tool],
          }),
        (result) => {
          assert.isDefined(result.output);
          assertParsedResponseOutput(result);
        }
      );
    });
  });
});
