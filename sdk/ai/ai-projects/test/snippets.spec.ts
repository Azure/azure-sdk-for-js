// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AIProjectsClient,
  connectionToolType,
  DoneEvent,
  ErrorEvent,
  FunctionToolDefinition,
  FunctionToolDefinitionOutput,
  isOutputOfType,
  MessageContentOutput,
  MessageDeltaChunk,
  MessageDeltaTextContent,
  MessageImageFileContentOutput,
  MessageStreamEvent,
  MessageTextContentOutput,
  RequiredToolCallOutput,
  RunStreamEvent,
  ThreadRunOutput,
  ToolOutput,
  ToolSet,
  ToolUtility,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { createReadStream, writeFileSync } from "node:fs";
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";
import { context, trace } from "@opentelemetry/api";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const connectionString = "<connectionString>";
    // @ts-preserve-whitespace
    const client = AIProjectsClient.fromConnectionString(
      connectionString,
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleListConnections", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const connections = await client.connections.listConnections();
    for (const connection of connections) {
      console.log(connection);
    }
  });

  it("ReadmeSampleListConnectionsByType", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const connections = await client.connections.listConnections({ category: "AzureOpenAI" });
    for (const connection of connections) {
      console.log(connection);
    }
  });

  it("ReadmeSampleGetConnection", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const connection = await client.connections.getConnection("connectionName");
    console.log(`Connection name: ${connection.name} with id: ${connection.id}`);
  });

  it("ReadmeSampleGetConnectionWithSecrets", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const connection = await client.connections.getConnectionWithSecrets("connectionName");
    console.log(`Connection name: ${connection.name} with id: ${connection.id}`);
  });

  it("ReadmeSampleCreateAgent", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful assistant",
    });
  });

  it("ReadmeSampleCreateAgentWithToolSet", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // Create vector store
    const vectorStore = await client.agents.createVectorStore({ name: "myVectorStore" });
    // @ts-preserve-whitespace
    // Upload file for code interpreter tool
    const filePath = "../data/nifty500QuarterlyResults.csv";
    const localFileStream = createReadStream(filePath);
    const codeInterpreterFile = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "localFile",
    });
    // @ts-preserve-whitespace
    const toolSet = new ToolSet();
    toolSet.addFileSearchTool([vectorStore.id]);
    toolSet.addCodeInterpreterTool([codeInterpreterFile.id]);
    // @ts-preserve-whitespace
    // Create agent with tool set
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: toolSet.toolDefinitions,
      toolResources: toolSet.toolResources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("ReadmeSampleCreateAgentWithFileSearch", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const localFileStream = createReadStream("sample_file_for_upload.txt");
    const file = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "sample_file_for_upload.txt",
    });
    console.log(`Uploaded file, ID: ${file.id}`);
    // @ts-preserve-whitespace
    const vectorStore = await client.agents.createVectorStore({
      fileIds: [file.id],
      name: "my_vector_store",
    });
    console.log(`Created vector store, ID: ${vectorStore.id}`);
    // @ts-preserve-whitespace
    const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);
    // @ts-preserve-whitespace
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "SDK Test Agent - Retrieval",
      instructions: "You are helpful agent that can help fetch data from files you know about.",
      tools: [fileSearchTool.definition],
      toolResources: fileSearchTool.resources,
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("ReadmeSampleCreateAgentWithCodeInterpreter", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const fileStream = createReadStream("nifty_500_quarterly_results.csv");
    const file = await client.agents.uploadFile(fileStream, "assistants", {
      fileName: "nifty_500_quarterly_results.csv",
    });
    console.log(`Uploaded local file, file ID : ${file.id}`);
    // @ts-preserve-whitespace
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([file.id]);
    // @ts-preserve-whitespace
    // Notice that CodeInterpreter must be enabled in the agent creation, otherwise the agent will not be able to see the file attachment
    const agent = await client.agents.createAgent("gpt-4o-mini", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [codeInterpreterTool.definition],
      toolResources: codeInterpreterTool.resources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("ReadmeSampleCreateAgentWithBingGrounding", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const bingGroundingConnectionId = "<bingGroundingConnectionId>";
    const bingTool = ToolUtility.createConnectionTool(connectionToolType.BingGrounding, [
      bingGroundingConnectionId,
    ]);
    // @ts-preserve-whitespace
    const agent = await client.agents.createAgent("gpt-4-0125-preview", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [bingTool.definition],
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("ReadmeSampleCreateAgentWithAzureAISearch", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const cognitiveServicesConnectionName = "<cognitiveServicesConnectionName>";
    const cognitiveServicesConnection = await client.connections.getConnection(
      cognitiveServicesConnectionName,
    );
    const azureAISearchTool = ToolUtility.createAzureAISearchTool(
      cognitiveServicesConnection.id,
      cognitiveServicesConnection.name,
    );
    // @ts-preserve-whitespace
    // Create agent with the Azure AI search tool
    const agent = await client.agents.createAgent("gpt-4-0125-preview", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [azureAISearchTool.definition],
      toolResources: azureAISearchTool.resources,
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("ReadmeSampleCreateAgentWithFunctionCall", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    class FunctionToolExecutor {
      private functionTools: { func: Function; definition: FunctionToolDefinition }[];
      // @ts-preserve-whitespace
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
      // @ts-preserve-whitespace
      private getUserFavoriteCity(): {} {
        return { location: "Seattle, WA" };
      }
      // @ts-preserve-whitespace
      private getCityNickname(location: string): {} {
        return { nickname: "The Emerald City" };
      }
      // @ts-preserve-whitespace
      private getWeather(location: string, unit: string): {} {
        return { weather: unit === "f" ? "72f" : "22c" };
      }
      // @ts-preserve-whitespace
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
      // @ts-preserve-whitespace
      public getFunctionDefinitions(): FunctionToolDefinition[] {
        return this.functionTools.map((tool) => {
          return tool.definition;
        });
      }
    }
    // @ts-preserve-whitespace
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

  it("ReadmeSampleCreateThread", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
  });

  it("ReadmeSampleCreateThreadWithToolResource", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const localFileStream = createReadStream("sample_file_for_upload.txt");
    const file = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "sample_file_for_upload.txt",
    });
    console.log(`Uploaded file, ID: ${file.id}`);
    // @ts-preserve-whitespace
    const vectorStore = await client.agents.createVectorStore({
      fileIds: [file.id],
      name: "my_vector_store",
    });
    console.log(`Created vector store, ID: ${vectorStore.id}`);
    // @ts-preserve-whitespace
    const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);
    // @ts-preserve-whitespace
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "SDK Test Agent - Retrieval",
      instructions: "You are helpful agent that can help fetch data from files you know about.",
      tools: [fileSearchTool.definition],
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
    // @ts-preserve-whitespace
    // Create thread with file resources.
    // If the agent has multiple threads, only this thread can search this file.
    const thread = await client.agents.createThread({ toolResources: fileSearchTool.resources });
  });

  it("ReadmeSampleCreateMessage", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    // @ts-preserve-whitespace
    const message = await client.agents.createMessage(thread.id, {
      role: "user",
      content: "hello, world!",
    });
  });

  it("ReadmeSampleCreateMessageWithFileSearchAttachment", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    // @ts-preserve-whitespace
    const localFileStream = createReadStream("sample_file_for_upload.txt");
    const file = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "sample_file_for_upload.txt",
    });
    // @ts-preserve-whitespace
    const fileSearchTool = ToolUtility.createFileSearchTool();
    const message = await client.agents.createMessage(thread.id, {
      role: "user",
      content: "What feature does Smart Eyewear offer?",
      attachments: [
        {
          fileId: file.id,
          tools: [fileSearchTool.definition],
        },
      ],
    });
  });

  it("ReadmeSampleCreateMessageWithCodeInterpreterAttachment", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    // notice that CodeInterpreter must be enabled in the agent creation,
    // otherwise the agent will not be able to see the file attachment for code interpretation
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
    const agent = await client.agents.createAgent("gpt-4-1106-preview", {
      name: "my-assistant",
      instructions: "You are helpful assistant",
      tools: [codeInterpreterTool.definition],
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    console.log(`Created thread, thread ID: ${thread.id}`);
    // @ts-preserve-whitespace
    const localFileStream = createReadStream("sample_file_for_upload.txt");
    const file = await client.agents.uploadFile(localFileStream, "assistants", {
      fileName: "sample_file_for_upload.txt",
    });
    // @ts-preserve-whitespace
    const message = await client.agents.createMessage(thread.id, {
      role: "user",
      content:
        "Could you please create bar chart in TRANSPORTATION sector for the operating profit from the uploaded csv file and provide file to me?",
      attachments: [
        {
          fileId: file.id,
          tools: [codeInterpreterTool.definition],
        },
      ],
    });
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("ReadmeSampleCreateRun", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
    const agent = await client.agents.createAgent("gpt-4-1106-preview", {
      name: "my-assistant",
      instructions: "You are helpful assistant",
      tools: [codeInterpreterTool.definition],
    });
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    // @ts-preserve-whitespace
    let run = await client.agents.createRun(thread.id, agent.id);
    // @ts-preserve-whitespace
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

  it("ReadmeSampleCreateThreadAndRun", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
    const agent = await client.agents.createAgent("gpt-4-1106-preview", {
      name: "my-assistant",
      instructions: "You are helpful assistant",
      tools: [codeInterpreterTool.definition],
    });
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    // @ts-preserve-whitespace
    const run = await client.agents.createThreadAndRun(agent.id, {
      thread: {
        messages: [
          {
            role: "user",
            content: "hello, world!",
          },
        ],
      },
    });
  });

  it("ReadmeSampleStreamEventHandler", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
    const agent = await client.agents.createAgent("gpt-4-1106-preview", {
      name: "my-assistant",
      instructions: "You are helpful assistant",
      tools: [codeInterpreterTool.definition],
    });
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    // @ts-preserve-whitespace
    const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();
    // @ts-preserve-whitespace
    for await (const eventMessage of streamEventMessages) {
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
          console.log(`ThreadRun status: ${(eventMessage.data as ThreadRunOutput).status}`);
          break;
        case MessageStreamEvent.ThreadMessageDelta:
          {
            const messageDelta = eventMessage.data as MessageDeltaChunk;
            for (const contentPart of messageDelta.delta.content) {
              if (contentPart.type === "text") {
                const textContent = contentPart as MessageDeltaTextContent;
                const textValue = textContent.text?.value || "No text";
                console.log(`Text delta received:: ${textValue}`);
              }
            }
          }
          break;
        // @ts-preserve-whitespace
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

  it("ReadmeSampleRetrieveMessage", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
    const agent = await client.agents.createAgent("gpt-4-1106-preview", {
      name: "my-assistant",
      instructions: "You are helpful assistant",
      tools: [codeInterpreterTool.definition],
    });
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    // @ts-preserve-whitespace
    const run = await client.agents.createRun(thread.id, agent.id);
    // @ts-preserve-whitespace
    const messages = await client.agents.listMessages(thread.id);
    while (messages.hasMore) {
      const nextMessages = await client.agents.listMessages(run.threadId, {
        after: messages.lastId,
      });
      messages.data = messages.data.concat(nextMessages.data);
      messages.hasMore = nextMessages.hasMore;
      messages.lastId = nextMessages.lastId;
    }
    // @ts-preserve-whitespace
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

  it("ReadmeSampleRetrieveFile", async () => {
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const thread = await client.agents.createThread();
    // @ts-preserve-whitespace
    const messages = await client.agents.listMessages(thread.id);
    const imageFile = (messages.data[0].content[0] as MessageImageFileContentOutput).imageFile;
    const imageFileName = (await client.agents.getFile(imageFile.fileId)).filename;
    // @ts-preserve-whitespace
    const fileContent = (await client.agents.getFileContent(imageFile.fileId).asNodeStream()).body;
    if (fileContent) {
      const chunks: Buffer[] = [];
      for await (const chunk of fileContent) {
        chunks.push(Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);
      writeFileSync(imageFileName, buffer);
    } else {
      console.error("Failed to retrieve file content: fileContent is undefined");
    }
    console.log(`Saved image file to: ${imageFileName}`);
  });

  it("ReadmeSampleTracingSetup", async () => {
    const exporter = new AzureMonitorTraceExporter({
      connectionString: "<connectionString>",
    });
    // @ts-preserve-whitespace
    const provider = new NodeTracerProvider({
      spanProcessors: [
        new SimpleSpanProcessor(new ConsoleSpanExporter()),
        new SimpleSpanProcessor(exporter),
      ],
    });
    provider.register();
    // @ts-preserve-whitespace
    registerInstrumentations({
      instrumentations: [createAzureSdkInstrumentation()],
      tracerProvider: provider,
    });
  });

  it("ReadmeSampleTracing", async () => {
    // Get the tracer to write to
    const tracer = trace.getTracer("Agents Sample", "1.0.0");
    // @ts-preserve-whitespace
    const client = AIProjectsClient.fromConnectionString(
      "<connectionString>",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    await tracer.startActiveSpan("main", async (span) => {
      client.telemetry.updateSettings({ enableContentRecording: true });
      // @ts-preserve-whitespace
      const agent = await client.agents.createAgent("gpt-4o", {
        name: "my-agent",
        instructions: "You are helpful agent",
        tracingOptions: { tracingContext: context.active() },
      });
      // @ts-preserve-whitespace
      console.log(`Created agent, agent ID : ${agent.id}`);
      // @ts-preserve-whitespace
      const thread = await client.agents.createThread();
      console.log(`Created Thread, thread ID:  ${thread.id}`);
      // @ts-preserve-whitespace
      // Create message
      const message = await client.agents.createMessage(thread.id, {
        role: "user",
        content: "Hello, tell me a joke",
      });
      console.log(`Created message, message ID ${message.id}`);
      // @ts-preserve-whitespace
      // Create run
      let run = await client.agents.createRun(thread.id, agent.id);
      console.log(`Created Run, Run ID:  ${run.id}`);

      while (["queued", "in_progress", "requires_action"].includes(run.status)) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        run = await client.agents.getRun(thread.id, run.id);
        console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
      }
      // @ts-preserve-whitespace
      await client.agents.deleteAgent(agent.id);
      // @ts-preserve-whitespace
      console.log(`Deleted agent`);
      // @ts-preserve-whitespace
      await client.agents.listMessages(thread.id);
      // @ts-preserve-whitespace
      span.end();
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
