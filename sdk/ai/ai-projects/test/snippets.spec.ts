// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import {
  AIProjectsClient,
  ToolSet,
  ToolUtility,
  connectionToolType,
  FunctionToolDefinition,
  RequiredToolCallOutput,
  FunctionToolDefinitionOutput,
  ToolOutput,
  DoneEvent,
  MessageDeltaChunk,
  MessageDeltaTextContent,
  MessageStreamEvent,
  RunStreamEvent,
  ThreadRunOutput,
} from "@azure/ai-projects";
import { createProjectsClient } from "./public/utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";
import * as fs from "fs";
import path from "node:path";
import {
  MessageContentOutput,
  isOutputOfType,
  MessageTextContentOutput,
  MessageImageFileContentOutput,
} from "../src/index.js";
import { delay } from "@azure/core-util";
import { trace } from "@opentelemetry/api";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { RestError } from "@azure/core-rest-pipeline";

describe("snippets", function () {
  let client: AIProjectsClient;

  beforeEach(async function (context: VitestTestContext) {
    client = createProjectsClient();
  });

  it("setup", async function () {
    const connectionString =
      process.env.AZURE_AI_PROJECTS_CONNECTION_STRING ?? "<connectionString>";
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

    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: toolSet.toolDefinitions,
      toolResources: toolSet.toolResources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("fileSearch", async function () {
    const localFileStream = fs.createReadStream(filePath);
    const file = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "sample_file_for_upload.txt",
    });
    console.log(`Uploaded file, ID: ${file.id}`);

    const vectorStore = await client.agents.createVectorStore({
      fileIds: [file.id],
      name: "my_vector_store",
    });
    console.log(`Created vector store, ID: ${vectorStore.id}`);

    const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);

    const agent = await client.agents.createAgent("gpt-4o", {
      name: "SDK Test Agent - Retrieval",
      instructions: "You are helpful agent that can help fetch data from files you know about.",
      tools: [fileSearchTool.definition],
      toolResources: fileSearchTool.resources,
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("codeInterpreter", async function () {
    const localFileStream = fs.createReadStream(filePath);
    const localFile = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "localFile",
    });
    console.log(`Uploaded local file, file ID : ${localFile.id}`);

    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([localFile.id]);

    // Notice that CodeInterpreter must be enabled in the agent creation, otherwise the agent will not be able to see the file attachment
    const agent = await client.agents.createAgent("gpt-4o-mini", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [codeInterpreterTool.definition],
      toolResources: codeInterpreterTool.resources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("bingGrounding", async function () {
    const bingConnection = await client.connections.getConnection(
      process.env.BING_CONNECTION_NAME ?? "<connection-name>",
    );
    const connectionId = bingConnection.id;

    const bingTool = ToolUtility.createConnectionTool(connectionToolType.BingGrounding, [
      connectionId,
    ]);

    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [bingTool.definition],
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("AISearch", async function () {
    const connectionName =
      process.env.AZURE_AI_SEARCH_CONNECTION_NAME ?? "<AzureAISearchConnectionName>";
    const connection = await client.connections.getConnection(connectionName);

    const azureAISearchTool = ToolUtility.createAzureAISearchTool(connection.id, connection.name);

    const agent = await client.agents.createAgent("gpt-4-0125-preview", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [azureAISearchTool.definition],
      toolResources: azureAISearchTool.resources,
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("functionTools", async function () {
    class FunctionToolExecutor {
      private functionTools: { func: Function; definition: FunctionToolDefinition }[];

      constructor() {
        this.functionTools = [
          {
            func: this.getUserFavoriteCity,
            ...ToolUtility.createFunctionTool({
              name: "getUserFavoriteCity",
              description: "Gets the user's favorite city.",
              parameters: {},
            }),
          },
          {
            func: this.getCityNickname,
            ...ToolUtility.createFunctionTool({
              name: "getCityNickname",
              description: "Gets the nickname of a city, e.g. 'LA' for 'Los Angeles, CA'.",
              parameters: {
                type: "object",
                properties: {
                  location: { type: "string", description: "The city and state, e.g. Seattle, Wa" },
                },
              },
            }),
          },
          {
            func: this.getWeather,
            ...ToolUtility.createFunctionTool({
              name: "getWeather",
              description: "Gets the weather for a location.",
              parameters: {
                type: "object",
                properties: {
                  location: { type: "string", description: "The city and state, e.g. Seattle, Wa" },
                  unit: { type: "string", enum: ["c", "f"] },
                },
              },
            }),
          },
        ];
      }

      private getUserFavoriteCity(): {} {
        return { location: "Seattle, WA" };
      }

      private getCityNickname(location: string): {} {
        return { nickname: "The Emerald City" };
      }

      private getWeather(location: string, unit: string): {} {
        return { weather: unit === "f" ? "72f" : "22c" };
      }

      public invokeTool(
        toolCall: RequiredToolCallOutput & FunctionToolDefinitionOutput,
      ): ToolOutput | undefined {
        console.log(`Function tool call - ${toolCall.function.name}`);
        const args = [];
        if (toolCall.function.parameters) {
          try {
            const params = JSON.parse(toolCall.function.parameters);
            for (const key in params) {
              if (Object.prototype.hasOwnProperty.call(params, key)) {
                args.push(params[key]);
              }
            }
          } catch (error) {
            console.error(`Failed to parse parameters: ${toolCall.function.parameters}`, error);
            return undefined;
          }
        }
        const result = this.functionTools
          .find((tool) => tool.definition.function.name === toolCall.function.name)
          ?.func(...args);
        return result
          ? {
              toolCallId: toolCall.id,
              output: JSON.stringify(result),
            }
          : undefined;
      }

      public getFunctionDefinitions(): FunctionToolDefinition[] {
        return this.functionTools.map((tool) => {
          return tool.definition;
        });
      }
    }

    const functionToolExecutor = new FunctionToolExecutor();
    const functionTools = functionToolExecutor.getFunctionDefinitions();
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions:
        "You are a weather bot. Use the provided functions to help answer questions. Customize your responses to the user's preferences as much as possible and use friendly nicknames for cities whenever possible.",
      tools: functionTools,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("createThread", async function () {
    const thread = await client.agents.createThread();
  });

  it("threadWithTool", async function () {
    const localFileStream = fs.createReadStream(filePath);
    const file = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "sample_file_for_upload.csv",
    });
    console.log(`Uploaded file, ID: ${file.id}`);

    const vectorStore = await client.agents.createVectorStore({
      fileIds: [file.id],
    });
    console.log(`Created vector store, ID: ${vectorStore.id}`);

    const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);

    const agent = await client.agents.createAgent("gpt-4o", {
      name: "myAgent",
      instructions: "You are helpful agent that can help fetch data from files you know about.",
      tools: [fileSearchTool.definition],
    });
    console.log(`Created agent, agent ID : ${agent.id}`);

    // Create thread with file resources.
    // If the agent has multiple threads, only this thread can search this file.
    const thread = await client.agents.createThread({ toolResources: fileSearchTool.resources });
  });

  it("createMessage", async function () {
    const message = await client.agents.createMessage(thread.id, {
      role: "user",
      content: "hello, world!",
    });
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("messageWithFileSearch", async function () {
    const fileSearchTool = ToolUtility.createFileSearchTool();
    const message = await client.agents.createMessage(thread.id, {
      role: "user",
      content: "What feature does Smart Eyewear offer?",
      attachments: {
        fileId: file.id,
        tools: [fileSearchTool.definition],
      },
    });
  });

  it("messageWithCodeInterpreter", async function () {
    // notice that CodeInterpreter must be enabled in the agent creation,
    // otherwise the agent will not be able to see the file attachment for code interpretation
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
    const agent = await client.agents.createAgent("gpt-4-1106-preview", {
      name: "my-assistant",
      instructions: "You are helpful assistant",
      tools: [codeInterpreterTool.definition],
    });
    console.log(`Created agent, agent ID: ${agent.id}`);

    const thread = client.agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);

    const message = await client.agents.createMessage(thread.id, {
      role: "user",
      content:
        "Could you please create bar chart in TRANSPORTATION sector for the operating profit from the uploaded csv file and provide file to me?",
      attachments: {
        fileId: file.id,
        tools: [codeInterpreterTool.definition],
      },
    });
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("createRun", async function () {
    let run = await client.agents.createRun(thread.id, agent.id);

    // Poll the run as long as run status is queued or in progress
    while (
      run.status === "queued" ||
      run.status === "in_progress" ||
      run.status === "requires_action"
    ) {
      // Wait for a second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      run = await client.agents.getRun(thread.id, run.id);
    }
  });

  it("createThreadAndRun", async function () {
    const run = await client.agents.createThreadAndRun(thread.id, agent.id);
  });

  it("createRunStream", async function () {
    const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();
  });

  it("eventHandling", async function () {
    const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();
    for await (const eventMessage of streamEventMessages) {
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
          console.log(`ThreadRun status: ${(eventMessage.data as ThreadRunOutput).status}`);
          break;
        case MessageStreamEvent.ThreadMessageDelta:
          {
            const messageDelta = eventMessage.data as MessageDeltaChunk;
            messageDelta.delta.content.forEach((contentPart) => {
              if (contentPart.type === "text") {
                const textContent = contentPart as MessageDeltaTextContent;
                const textValue = textContent.text?.value || "No text";
                console.log(`Text delta received:: ${textValue}`);
              }
            });
          }
          break;

        case RunStreamEvent.ThreadRunCompleted:
          console.log("Thread Run Completed");
          break;
        case ErrorEvent.Error:
          console.log(`An error occurred. Data ${eventMessage.data}`);
          break;
        case DoneEvent.Done:
          console.log("Stream completed.");
          break;
      }
    }
  });

  it("listMessages", async function () {
    const messages = await client.agents.listMessages(thread.id);

    // The messages are following in the reverse order,
    // we will iterate them and output only text contents.
    for (const dataPoint of messages.data.reverse()) {
      const lastMessageContent: MessageContentOutput =
        dataPoint.content[dataPoint.content.length - 1];
      console.log(lastMessageContent);
      if (isOutputOfType<MessageTextContentOutput>(lastMessageContent, "text")) {
        console.log(
          `${dataPoint.role}: ${(lastMessageContent as MessageTextContentOutput).text.value}`,
        );
      }
    }
  });

  it("retrieveFile", async function () {
    const messages = await client.agents.listMessages(thread.id);

    // Get most recent message from the assistant
    const assistantMessage = messages.data.find((msg) => msg.role === "assistant");
    if (assistantMessage) {
      const textContent = assistantMessage.content.find((content) =>
        isOutputOfType<MessageTextContentOutput>(content, "text"),
      ) as MessageTextContentOutput;
      if (textContent) {
        console.log(`Last message: ${textContent.text.value}`);
      }
    }

    const imageFile = (messages.data[0].content[0] as MessageImageFileContentOutput).imageFile;
    const imageFileName = (await client.agents.getFile(imageFile.fileId)).filename;

    const fileContent = await (
      await client.agents.getFileContent(imageFile.fileId).asNodeStream()
    ).body;
    if (fileContent) {
      const chunks: Buffer[] = [];
      for await (const chunk of fileContent) {
        chunks.push(Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(imageFileName, buffer);
    } else {
      console.error("Failed to retrieve file content: fileContent is undefined");
    }
    console.log(`Saved image file to: ${imageFileName}`);
  });

  it("teardown", async function () {
    await client.agents.deleteVectorStore(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);

    await client.agents.deleteFile(file.id);
    console.log(`Deleted file, file ID: ${file.id}`);

    client.agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("tracing", async function () {
    const provider = new NodeTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    provider.register();

    const tracer = trace.getTracer("Agents Sample", "1.0.0");

    let appInsightsConnectionString =
      process.env.APP_INSIGHTS_CONNECTION_STRING ?? "<appInsightsConnectionString>";

    if (appInsightsConnectionString == "<appInsightsConnectionString>") {
      appInsightsConnectionString = await client.telemetry.getConnectionString();
    }

    if (appInsightsConnectionString) {
      const exporter = new AzureMonitorTraceExporter({
        connectionString: appInsightsConnectionString,
      });
      provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
    }

    await tracer.startActiveSpan("main", async (span) => {
      client.telemetry.updateSettings({ enableContentRecording: true });
      // ...
    });
  });

  it("exceptions", async function () {
    try {
      const result = await client.connections.listConnections();
    } catch (e) {
      if (e instanceof RestError) {
        console.log(`Status code: ${e.code}`);
        console.log(e.message);
      } else {
        console.error(e);
      }
    }
  });
});
