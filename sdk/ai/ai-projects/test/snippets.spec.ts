// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import { AIProjectsClient, ToolSet } from "@azure/ai-projects";
import { createProjectsClient } from "./public/utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";
import * as fs from "fs";
import path from "node:path";

describe("snippets", function () {
  let client: AIProjectsClient;

  beforeEach(async function (context: VitestTestContext) {
    client = createProjectsClient();
  });

  it("setup", async function () {
    const connectionString = process.env.AZURE_AI_PROJECTS_CONNECTION_STRING ?? "<connectionString>";
    // @ts-ignore
    const client = AIProjectsClient.fromConnectionString(
      connectionString,
      new DefaultAzureCredential(),
    );
  });
  
  it("listConnections", async function () {
    // Begin snippet
    const connections = await client.connections.listConnections();
    for (const connection of connections) {
      console.log(connection);
    }
    // End snippet
  });

  it("filterConnections", async function () {
    // Begin snippet
    const connections = await client.connections.listConnections({ category: "AzureOpenAI" });
    for (const connection of connections) {
      console.log(connection);
    }
    // End snippet
  });

  it("getConnection", async function () {
    // Begin snippet
    const connection = await client.connections.getConnection("connectionName");
    console.log(connection);
    // End snippet
  });

  it("getConnectionWithSecrets", async function () {
    // Begin snippet
    const connection = await client.connections.getConnectionWithSecrets("connectionName");
    console.log(connection);
    // End snippet
  });

  it("createAgent", async function () {
    // Begin snippet
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful assistant",
    });
    // End snippet
    await client.agents.deleteAgent(agent.id);
  });

  it("toolSet", async function () {
    const filePath1 = path.resolve("./data/nifty500QuarterlyResults.csv");
    const fileStream1 = fs.createReadStream(filePath1);
    const codeInterpreterFile = await client.agents.uploadFile(fileStream1, "assistants");

    const filePath2 = path.resolve("./data/sampleFileForUpload.txt");
    const fileStream2 = fs.createReadStream(filePath2);
    const fileSearchFile = await client.agents.uploadFile(fileStream2, "assistants");
  
    const vectorStore = await client.agents.createVectorStore({ fileIds: [fileSearchFile.id]});

    // Begin snippet
    const toolSet = new ToolSet();
    toolSet.addFileSearchTool([vectorStore.id]);
    toolSet.addCodeInterpreterTool([codeInterpreterFile.id]);

    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: toolSet.toolDefinitions,
      toolResources: toolSet.toolResources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
    // End snippet

    await client.agents.deleteAgent(agent.id);
    await client.agents.deleteVectorStore(vectorStore.id);
    await client.agents.deleteFile(codeInterpreterFile.id);
    await client.agents.deleteFile(fileSearchFile.id); 
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
