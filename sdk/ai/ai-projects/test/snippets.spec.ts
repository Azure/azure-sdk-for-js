// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import { AIProjectsClient, ToolSet } from "@azure/ai-projects";
import { createProjectsClient } from "./public/utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";

describe("snippets", function () {
  let client: AIProjectsClient;

  beforeEach(async function (context: VitestTestContext) {
    client = createProjectsClient();
  });

  it("setup", async function () {
    const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<connectionString>";
    const client = AIProjectsClient.fromConnectionString(
      connectionString,
      new DefaultAzureCredential(),
    );

  });
  
  it("listConnections", async function () {
    const connections = await client.connections.listConnections();
    for (const connection of connections) {
      console.log(connection);
    }
  });

  it("filterConnections", async function () {
    const connections = await client.connections.listConnections({ category: "AzureOpenAI" });
    for (const connection of connections) {
      console.log(connection);
    }
  });

  it("getConnection", async function () {
    const connection = await client.connections.getConnection("connectionName");
    console.log(connection);
  });

  it("getConnectionWithSecrets", async function () {
    const connection = await client.connections.getConnectionWithSecrets("connectionName");
    console.log(connection);
  });

  it("createAgent", async function () {
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful assistant",
    });
  });

  it("toolSet", async function () {
    const toolSet = new ToolSet();
    toolSet.addFileSearchTool([vectorStore.id]);
    toolSet.addCodeInterpreterTool([codeInterpreterFile.id]);

    // Create agent with tool set
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: toolSet.toolDefinitions,
      toolResources: toolSet.toolResources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("fileSearch", async function () {
    
  });

  it("codeInterpreter", async function () {
    
  });

  it("bingGrounding", async function () {
    
  })

  it("AISearch", async function () {
    
  });

  it("functionTools", async function () {
    
  });

  it("createThread", async function () {
    
  }); 

  it("threadWithTool", async function () {
    
  }); 

  it("createMessage", async function () {
    
  }); 

  it("messageWithFileSearch", async function () {
    
  }); 

  it("messageWithCodeInterpreter", async function () {
    
  }); 

  it("createRun", async function () {
    
  });

  it("createThreadAndRun", async function () {
    
  });

  it("createRunStream", async function () {
    
  });

  it("eventHandling", async function () {
    
  });

  it("listMessages", async function () {
    
  });

  it("retrieveFile", async function () {
    
  });

  it("teardown", async function () {
    
  });

  it("tracing", async function () {
    
  });

  it("exceptions", async function () {
    
  });
});
