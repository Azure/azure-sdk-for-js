// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use streaming responses with tools/functions using Azure OpenAI.
 *
 * @summary streams function calls for database queries using Azure OpenAI.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

import { zodResponsesFunction } from "openai/helpers/zod";
import { z } from "zod";
import "dotenv/config";

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

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

async function main(): Promise<void> {
  console.log("== Stream Responses With Tools Sample ==");
  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4o";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });

  const tool = zodResponsesFunction({ name: "query", parameters: Query });

  const stream = client.responses.stream({
    model: deployment,
    input:
      "look up all my orders in november of last year that were fulfilled but not delivered on time",
    tools: [tool],
  });

  for await (const event of stream) {
    console.dir(event, { depth: 10 });
  }
}

main();
