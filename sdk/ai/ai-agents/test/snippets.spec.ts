// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import {
  AgentsClient,
  ToolSet,
  ToolUtility,
  FunctionToolDefinition,
  ToolOutput,
  DoneEvent,
  MessageDeltaChunk,
  MessageDeltaTextContent,
  MessageStreamEvent,
  RunStreamEvent,
  ErrorEvent,
  isOutputOfType,
  MessageImageFileContent,
  MessageTextContent,
  RequiredToolCall,
  ThreadRun,
} from "@azure/ai-agents";
import { createProjectsClient } from "./public/utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";
import * as fs from "fs";
import { RestError } from "@azure/core-rest-pipeline";

describe("snippets", function () {
  let client: AgentsClient;

  beforeEach(async function (context: VitestTestContext) {
    client = createProjectsClient();
  });

  it("setup", async function () {
    const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
    const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
    const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
  });

  it("createAgent", async function () {
    const agent = await client.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful assistant",
    });
  });

  it("toolSet", async function () {
    // Upload file for code interpreter tool
    const filePath1 = "./data/nifty500QuarterlyResults.csv";
    const fileStream1 = fs.createReadStream(filePath1);
    const codeInterpreterFile = await client.files.upload(fileStream1, "assistants", {
      fileName: "myLocalFile",
    });

    console.log(`Uploaded local file, file ID : ${codeInterpreterFile.id}`);

    // Upload file for file search tool
    const filePath2 = "./data/sampleFileForUpload.txt";
    const fileStream2 = fs.createReadStream(filePath2);
    const fileSearchFile = await client.files.upload(fileStream2, "assistants", {
      fileName: "sampleFileForUpload.txt",
    });
    console.log(`Uploaded file, file ID: ${fileSearchFile.id}`);

    // Create vector store for file search tool
    const vectorStore = await client.vectorStores
      .createAndPoll({
        fileIds: [fileSearchFile.id],
      })
      .pollUntilDone();

    // Create tool set
    const toolSet = new ToolSet();
    toolSet.addFileSearchTool([vectorStore.id]);
    toolSet.addCodeInterpreterTool([codeInterpreterFile.id]);
    // @ts-preserve-whitespace
    // Create agent with tool set
    const agent = await client.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: toolSet.toolDefinitions,
      toolResources: toolSet.toolResources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("fileSearch", async function () {
    const filePath = "./data/sampleFileForUpload.txt";
    const localFileStream = fs.createReadStream(filePath);
    const file = await client.files.upload(localFileStream, "assistants", {
      fileName: "sampleFileForUpload.txt",
    });
    console.log(`Uploaded file, file ID: ${file.id}`);
    // @ts-preserve-whitespace
    const vectorStore = await client.vectorStores.create({
      fileIds: [file.id],
      name: "myVectorStore",
    });
    console.log(`Created vector store, vector store ID: ${vectorStore.id}`);
    // @ts-preserve-whitespace
    const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);
    // @ts-preserve-whitespace
    const agent = await client.createAgent("gpt-4o", {
      name: "File Search Agent",
      instructions: "You are helpful agent that can help fetch data from files you know about.",
      tools: [fileSearchTool.definition],
      toolResources: fileSearchTool.resources,
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("codeInterpreter", async function () {
    const filePath = "./data/nifty500QuarterlyResults.csv";
    const localFileStream = fs.createReadStream(filePath);
    const localFile = await client.files.upload(localFileStream, "assistants", {
      fileName: "localFile",
    });
    // @ts-preserve-whitespace
    console.log(`Uploaded local file, file ID : ${localFile.id}`);
    // @ts-preserve-whitespace
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([localFile.id]);
    // @ts-preserve-whitespace
    // Notice that CodeInterpreter must be enabled in the agent creation, otherwise the agent will not be able to see the file attachment
    const agent = await client.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [codeInterpreterTool.definition],
      toolResources: codeInterpreterTool.resources,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("bingGrounding", async function () {
    const connectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-name>";
    // @ts-preserve-whitespace
    // Initialize agent bing tool with the connection id
    const bingTool = ToolUtility.createBingGroundingTool([{ connectionId: connectionId }]);
    // @ts-preserve-whitespace
    // Create agent with the bing tool and process assistant run
    const agent = await client.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [bingTool.definition],
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("AISearch", async function () {
    const connectionName = process.env["AZURE_AI_SEARCH_CONNECTION_NAME"] || "<connection-name>";
    // @ts-preserve-whitespace
    // Initialize Azure AI Search tool
    const azureAISearchTool = ToolUtility.createAzureAISearchTool(connectionName, "search-index", {
      queryType: "simple",
      topK: 3,
      filter: "", // Add string here to filter results
      indexConnectionId: connectionName,
      indexName: "search-index",
    });

    // @ts-preserve-whitespace
    // Create agent with the Azure AI search tool
    const agent = await client.createAgent("gpt-4o", {
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
      private getCityNickname(_location: string): {} {
        return { nickname: "The Emerald City" };
      }
      // @ts-preserve-whitespace
      private getWeather(_location: string, unit: string): {} {
        return { weather: unit === "f" ? "72f" : "22c" };
      }
      // @ts-preserve-whitespace
      public invokeTool(
        toolCall: RequiredToolCall & FunctionToolDefinition,
      ): ToolOutput | undefined {
        console.log(`Function tool call - ${toolCall.function.name}`);
        const args: any[] = [];
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
        // Create a mapping of function names to their implementations
        const functionMap = new Map(
          this.functionTools.map((tool) => [tool.definition.function.name, tool.func]),
        );
        const result = functionMap.get(toolCall.function.name)?.(...args);
        return result
          ? {
              toolCallId: toolCall.id,
              output: JSON.stringify(result),
            }
          : {
              toolCallId: toolCall.id,
              output: JSON.stringify({
                error: `No matching tool found for function: ${toolCall.function.name}`,
              }),
            };
      }
      // @ts-preserve-whitespace
      public getFunctionDefinitions(): FunctionToolDefinition[] {
        return this.functionTools.map((tool) => {
          return tool.definition;
        });
      }
    }

    const functionToolExecutor = new FunctionToolExecutor();
    const functionTools = functionToolExecutor.getFunctionDefinitions();
    const agent = await client.createAgent("gpt-4o", {
      name: "my-agent",
      instructions:
        "You are a weather bot. Use the provided functions to help answer questions. Customize your responses to the user's preferences as much as possible and use friendly nicknames for cities whenever possible.",
      tools: functionTools,
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("createAgentWithOpenApi", async function () {
    // Read in OpenApi spec
    const filePath = "./data/weatherOpenApi.json";
    const openApiSpec = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    // @ts-preserve-whitespace
    // Define OpenApi function
    const openApiFunction = {
      name: "getWeather",
      spec: openApiSpec,
      description: "Retrieve weather information for a location",
      auth: {
        type: "anonymous",
      },
      default_params: ["format"], // optional
    };
    // @ts-preserve-whitespace
    // Create OpenApi tool
    const openApiTool = ToolUtility.createOpenApiTool(openApiFunction);
    // @ts-preserve-whitespace
    // Create agent with OpenApi tool
    const agent = await client.createAgent("gpt-4o", {
      name: "myAgent",
      instructions: "You are a helpful agent",
      tools: [openApiTool.definition],
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
  });

  it("createAgentWithFabric", async function () {
    const connectionId = process.env["FABRIC_CONNECTION_ID"] || "<connection-name>";
    // @ts-preserve-whitespace
    // Initialize agent Microsoft Fabric tool with the connection id
    const fabricTool = ToolUtility.createFabricTool(connectionId);
    // @ts-preserve-whitespace
    // Create agent with the Microsoft Fabric tool and process assistant run
    const agent = await client.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
      tools: [fabricTool.definition],
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
  });

  it("createThread", async function () {
    const thread = await client.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);
  });

  it("threadWithTool", async function () {
    const filePath = "./data/nifty500QuarterlyResults.csv";
    const localFileStream = fs.createReadStream(filePath);
    const file = await client.files.upload(localFileStream, "assistants", {
      fileName: "sample_file_for_upload.csv",
    });
    console.log(`Uploaded file, ID: ${file.id}`);
    // @ts-preserve-whitespace
    const vectorStore = await client.agents.vectorStores.create()({
      fileIds: [file.id],
    });
    console.log(`Created vector store, ID: ${vectorStore.id}`);
    // @ts-preserve-whitespace
    const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);
    // @ts-preserve-whitespace
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "myAgent",
      instructions: "You are helpful agent that can help fetch data from files you know about.",
      tools: [fileSearchTool.definition],
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
    // @ts-preserve-whitespace
    // Create thread with file resources.
    // If the agent has multiple threads, only this thread can search this file.
    const thread = await client.threads.create({ toolResources: fileSearchTool.resources });
  });

  it("listThreads", async function () {
    const threads = client.threads.list();
    console.log(`Threads for agent ${agent.id}:`);
    for await (const t of threads) {
      console.log(`Thread ID: ${t.id}`);
      console.log(`Created at: ${t.createdAt}`);
      console.log(`Metadata: ${t.metadata}`);
      console.log(`---- `);
    }
  });

  it("createMessage", async function () {
    const message = await client.messages.create(thread.id, "user", "hello, world!");
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("messageWithFileSearch", async function () {
    const fileSearchTool = ToolUtility.createFileSearchTool();
    const message = await client.messages.create(
      thread.id,
      "user",
      "What feature does Smart Eyewear offer?",
      {
        attachments: [
          {
            fileId: file.id,
            tools: [fileSearchTool.definition],
          },
        ],
      },
    );
  });

  it("messageWithCodeInterpreter", async function () {
    // notice that CodeInterpreter must be enabled in the agent creation,
    // otherwise the agent will not be able to see the file attachment for code interpretation
    const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
    const agent = await client.agents.createAgent("gpt-4o", {
      name: "my-assistant",
      instructions: "You are helpful assistant",
      tools: [codeInterpreterTool.definition],
    });
    console.log(`Created agent, agent ID: ${agent.id}`);
    // @ts-preserve-whitespace
    const thread = await client.threads.create();
    console.log(`Created thread, thread ID: ${thread.id}`);
    // @ts-preserve-whitespace
    const message = await client.messages.create(
      thread.id,
      "user",
      "Could you please create a bar chart in the TRANSPORTATION sector for the operating profit from the uploaded CSV file and provide the file to me?",
      {
        attachments: [
          {
            fileId: file.id,
            tools: [codeInterpreterTool.definition],
          },
        ],
      },
    );
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("imageInputWithFile", async function () {
    const imagePath = "./data/image_file.png";
    // Upload the local image file
    const fileStream = fs.createReadStream(imagePath);
    const imageFile = await client.files.upload(fileStream, "assistants", {
      fileName: "image_file.png",
    });
    console.log(`Uploaded file, file ID: ${imageFile.id}`);
    // @ts-preserve-whitespace
    // Create a message with both text and image content
    console.log("Creating message with image content...");
    const inputMessage = "Hello, what is in the image?";
    const content = [
      {
        type: "text",
        text: inputMessage,
      },
      {
        type: "image_file",
        image_file: {
          file_id: imageFile.id,
          detail: "high",
        },
      },
    ];
    const message = await client.messages.create(thread.id, "user", content);
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("imageInputWithUrl", async function () {
    const imageUrl =
      "https://github.com/Azure/azure-sdk-for-js/blob/0aa88ceb18d865726d423f73b8393134e783aea6/sdk/ai/ai-projects/data/image_file.png?raw=true";
    // @ts-preserve-whitespace
    // Create a message with both text and image content
    console.log("Creating message with image content...");
    const inputMessage = "Hello, what is in the image?";
    const content = [
      {
        type: "text",
        text: inputMessage,
      },
      {
        type: "image_url",
        image_url: {
          url: imageUrl,
          detail: "high",
        },
      },
    ];
    // @ts-preserve-whitespace
    const message = await client.messages.create(thread.id, "user", content);
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("imageInputWithBase64", async function () {
    function imageToBase64DataUrl(imagePath: string, mimeType: string): string {
      try {
        // Read the image file as binary
        const imageBuffer = fs.readFileSync(imagePath);
        // Convert to base64
        const base64Data = imageBuffer.toString("base64");
        // Format as a data URL
        return `data:${mimeType};base64,${base64Data}`;
      } catch (error) {
        console.error(`Error reading image file at ${imagePath}:`, error);
        throw error;
      }
    }
    // @ts-preserve-whitespace
    // Convert your image file to base64 format
    const filePath = "./data/image_file.png";
    const imageDataUrl = imageToBase64DataUrl(filePath, "image/png");
    // @ts-preserve-whitespace
    // Create a message with both text and image content
    console.log("Creating message with image content...");
    const inputMessage = "Hello, what is in the image?";
    const content = [
      {
        type: "text",
        text: inputMessage,
      },
      {
        type: "image_url",
        image_url: {
          url: imageDataUrl,
          detail: "high",
        },
      },
    ];
    // @ts-preserve-whitespace
    const message = await client.messages.create(thread.id, "user", content);
    console.log(`Created message, message ID: ${message.id}`);
  });

  it("createRun", async function () {
    // @ts-preserve-whitespace
    // Create and poll a run
    console.log("Creating run...");
    const run = await client.runs.createAndPoll(thread.id, agent.id, {
      pollingOptions: {
        intervalInMs: 2000,
      },
      onResponse: (response): void => {
        console.log(`Received response with status: ${response.status}`);
      },
    });
    console.log(`Run finished with status: ${run.status}`);
  });

  it("createThreadAndRun", async function () {
    const run = await client.runs.createThreadAndRun(agent.id, {
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

  it("createRunStream", async function () {
    const streamEventMessages = await client.runs.create(thread.id, agent.id).stream();
  });

  it("eventHandling", async function () {
    const streamEventMessages = await client.runs.create(thread.id, agent.id).stream();
    // @ts-preserve-whitespace
    for await (const eventMessage of streamEventMessages) {
      switch (eventMessage.event) {
        case RunStreamEvent.ThreadRunCreated:
          console.log(`ThreadRun status: ${(eventMessage.data as ThreadRun).status}`);
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

  it("listMessages", async function () {
    const messagesIterator = client.messages.list(thread.id);
    const allMessages = [];
    for await (const m of messagesIterator) {
      allMessages.push(m);
    }
    console.log("Messages:", allMessages);
    // @ts-preserve-whitespace
    // The messages are following in the reverse order,
    // we will iterate them and output only text contents.
    const messages = await client.messages.list(thread.id, {
      order: "asc",
    });
    // @ts-preserve-whitespace
    for await (const dataPoint of messages) {
      const textContent = dataPoint.content.find((item) => item.type === "text");
      if (textContent && "text" in textContent) {
        console.log(`${dataPoint.role}: ${textContent.text.value}`);
      }
    }
  });

  it("retrieveFile", async function () {
    const messagesIterator = client.messages.list(thread.id);
    const allMessages = [];
    for await (const m of messagesIterator) {
      allMessages.push(m);
    }
    console.log("Messages:", allMessages);
    // @ts-preserve-whitespace
    // Get most recent message from the assistant
    const assistantMessage = allMessages.find((msg) => msg.role === "assistant");
    if (assistantMessage) {
      const textContent = assistantMessage.content.find((content) =>
        isOutputOfType<MessageTextContent>(content, "text"),
      ) as MessageTextContent;
      if (textContent) {
        console.log(`Last message: ${textContent.text.value}`);
      }
    }
    // @ts-preserve-whitespace
    const imageFile = (allMessages[0].content[0] as MessageImageFileContent).imageFile;
    const imageFileName = (await client.agents.files.get(imageFile.fileId)).filename;
    // @ts-preserve-whitespace
    const fileContent = await (await client.files.getContent(imageFile.fileId).asNodeStream()).body;
    if (fileContent) {
      const chunks: Buffer[] = [];
      for await (const chunk of fileContent) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(imageFileName, buffer);
    } else {
      console.error("Failed to retrieve file content: fileContent is undefined");
    }
    console.log(`Saved image file to: ${imageFileName}`);
  });

  it("teardown", async function () {
    await client.vectorStores.delete(vectorStore.id);
    console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
    // @ts-preserve-whitespace
    await client.files.delete(file.id);
    console.log(`Deleted file, file ID : ${file.id}`);
    // @ts-preserve-whitespace
    await client.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("exceptions", async function () {
    try {
      const thread = await client.threads.create();
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
