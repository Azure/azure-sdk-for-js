// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use streaming responses with tools/functions using Azure OpenAI.
 *
 * @summary streams function calls for database queries using Azure OpenAI.
 * @azsdk-weight 100
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

import { zodResponsesFunction } from "openai/helpers/zod";
import { z } from "zod";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";
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

async function main() {
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-4-08-06";
  const apiVersion = "2025-04-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });

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
