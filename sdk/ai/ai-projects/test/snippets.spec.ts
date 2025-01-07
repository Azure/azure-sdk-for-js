// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("fromConnectionString", async () => {
    const connectionString =
      process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<connectionString>";
    // @ts-preserve-whitespace
    // @ts-ignore
    const client = AIProjectsClient.fromConnectionString(
      connectionString,
      new DefaultAzureCredential(),
    );
  });

  it("listConnections", async () => {
    const connectionString =
      process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<connectionString>";
    // @ts-preserve-whitespace
    const client = AIProjectsClient.fromConnectionString(
      connectionString,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const connections = await client.connections.listConnections();
    for (const connection of connections) {
      console.log(connection);
    }
  });

  it("listConnectionsByCategory", async () => {
    const connectionString =
      process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<connectionString>";
    // @ts-preserve-whitespace
    const client = AIProjectsClient.fromConnectionString(
      connectionString,
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const connections = await client.connections.listConnections({ category: "AzureOpenAI" });
    for (const connection of connections) {
      console.log(connection);
    }
  });
});
