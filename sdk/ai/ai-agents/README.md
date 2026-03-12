# Azure AI Agents client library for JavaScript

Use the AI Agents client library to:

- **Develop Agents using the Azure AI Agent Service**, leveraging an extensive ecosystem of models, tools, and capabilities from OpenAI, Microsoft, and other LLM providers. The Azure AI Agent Service enables the building of Agents for a wide range of generative AI use cases.

* **Note:** While this package can be used independently, we recommend using the [Azure AI Projects client library](https://www.npmjs.com/package/@azure/ai-projects) for an enhanced experience.
  The Projects library provides simplified access to advanced functionality, such as creating and managing agents, enumerating AI models, working with datasets and
  managing search indexes, evaluating generative AI performance, and enabling OpenTelemetry tracing.

[Product documentation](https://aka.ms/azsdk/azure-ai-projects/product-doc)
| [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-agents/samples/)
| [Package (npm)](https://www.npmjs.com/package/@azure/ai-agents)
| [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-agents-readme?view=azure-node-latest)

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisite](#prerequisite)
  - [Authorization](#authorization)
  - [Install the package](#install-the-package)
- [Key concepts](#key-concepts)
  - [Create and authenticate the client](#create-and-authenticate-the-client)
- [Examples](#examples)
  - [Agents](#agents)
    - [Create an Agent](#create-agent) with:
      - [File Search](#create-agent-with-file-search)
      - [Code interpreter](#create-agent-with-code-interpreter)
      - [Bing grounding](#create-agent-with-bing-grounding)
      - [Azure AI Search](#create-agent-with-azure-ai-search)
      - [Function call](#create-agent-with-function-call)
    - [Create thread](#create-thread) with
      - [Tool resource](#create-thread-with-tool-resource)
    - [Create message](#create-message) with:
      - [File search attachment](#create-message-with-file-search-attachment)
      - [Code interpreter attachment](#create-message-with-code-interpreter-attachment)
      - [Image input](#create-message-with-image-inputs)
    - [Execute Run, Create Thread and Run, or Stream](#create-run-run_and_process-or-stream)
    - [Retrieve message](#retrieve-message)
    - [Retrieve file](#retrieve-file)
    - [Tear down by deleting resource](#teardown)
- [Troubleshooting](#troubleshooting)
  - [Exceptions](#exceptions)
  - [Reporting issues](#reporting-issues)
  - [Next steps](#next-steps)
- [Contributing](#contributing)

## Getting started

### Prerequisite

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- An [Azure subscription][azure_sub].
- A [project in Azure AI Foundry](https://learn.microsoft.com/azure/ai-studio/how-to/create-projects?tabs=ai-studio).

### Authorization

- [Entra ID][entra_id] is needed to authenticate the client. Your application needs an object that implements the [TokenCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/tokencredential) interface. Code samples here use [DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest). To get that working, you will need:
  - The `Contributor` role. Role assigned can be done via the "Access Control (IAM)" tab of your Azure AI Project resource in the Azure portal. Learn more about role assignments [here](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal).
  - [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed.
  - You are logged into your Azure account by running `az login`.
  - Note that if you have multiple Azure subscriptions, the subscription that contains your Azure AI Project resource must be your default subscription. Run `az account list --output table` to list all your subscription and see which one is the default. Run `az account set --subscription "Your Subscription ID or Name"` to change your default subscription.

### Install the package

```bash
npm install @azure/ai-agents @azure/identity
```

## Key concepts

### Create and authenticate the client

The `AgentsClient` is used to construct the client. Currently, we recommend that you use the AgentsClient through the [Azure AI Projects Client Library](https://www.npmjs.com/package/@azure/ai-projects) using `client.agents`.

To get your project endpoint you can refer to the [documentation][azure_foundry_service_endpoint]. Below we will assume the environment variable `PROJECT_ENDPOINT` holds this value.

```ts snippet:setup
import { AgentsClient } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
```

## Examples

### Agents

Agents in the Azure AI Projects client library are designed to facilitate various interactions and operations within your AI projects. They serve as the core components that manage and execute tasks, leveraging different tools and resources to achieve specific goals. The following steps outline the typical sequence for interacting with Agents. See the [package samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-agents/samples/) for additional Agent samples.

#### Create Agent

Here is an example of how to create an Agent:

```ts snippet:createAgent
const agent = await client.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful assistant",
});
```

To allow Agents to access your resources or custom functions, you need tools. You can pass tools to `createAgent` through the `tools` and `toolResources` arguments.

You can use `ToolSet` to do this:

```ts snippet:toolSet
import { ToolSet } from "@azure/ai-agents";

// Upload file for code interpreter tool
const filePath1 = "./data/syntheticCompanyQuarterlyResults.csv";
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

// Create agent with tool set
const agent = await client.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful agent",
  tools: toolSet.toolDefinitions,
  toolResources: toolSet.toolResources,
});
console.log(`Created agent, agent ID: ${agent.id}`);
```

#### Multiple Agents
You can create multiple Agents with different tools and then connect them together.

```ts snippet:MultiAgents
import { ToolUtility } from "@azure/ai-agents";

const connectedAgentName = "stock_price_bot";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
const stockAgent = await client.createAgent(modelDeploymentName, {
  name: "stock-price-agent",
  instructions:
    "Your job is to get the stock price of a company. If you don't know the realtime stock price, return the last known stock price.",
});
// Initialize Connected Agent tool with the agent id, name, and description
const connectedAgentTool = ToolUtility.createConnectedAgentTool(
  stockAgent.id,
  connectedAgentName,
  "Gets the stock price of a company",
);
// Create agent with the Connected Agent tool and process assistant run
const agent = await client.createAgent(modelDeploymentName, {
  name: "my-agent",
  instructions: "You are a helpful assistant, and use the connected agent to get stock prices.",
  tools: [connectedAgentTool.definition],
});
console.log(`Created agent, agent ID: ${agent.id}`);
```

#### Create Agent with File Search

To perform file search by an Agent, we first need to upload a file, create a vector store, and associate the file to the vector store. Here is an example:

```ts snippet:fileSearch
import { ToolUtility } from "@azure/ai-agents";

const filePath = "./data/sampleFileForUpload.txt";
const localFileStream = fs.createReadStream(filePath);
const file = await client.files.upload(localFileStream, "assistants", {
  fileName: "sampleFileForUpload.txt",
});
console.log(`Uploaded file, file ID: ${file.id}`);

const vectorStore = await client.vectorStores.create({
  fileIds: [file.id],
  name: "myVectorStore",
});
console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);

const agent = await client.createAgent("gpt-4o", {
  name: "File Search Agent",
  instructions: "You are helpful agent that can help fetch data from files you know about.",
  tools: [fileSearchTool.definition],
  toolResources: fileSearchTool.resources,
});
console.log(`Created agent, agent ID : ${agent.id}`);
```

#### Create Agent with Code Interpreter

Here is an example to upload a file and use it for code interpreter by an Agent:

```ts snippet:codeInterpreter
import { ToolUtility } from "@azure/ai-agents";

const filePath = "./data/syntheticCompanyQuarterlyResults.csv";
const localFileStream = fs.createReadStream(filePath);
const localFile = await client.files.upload(localFileStream, "assistants", {
  fileName: "localFile",
});

console.log(`Uploaded local file, file ID : ${localFile.id}`);

const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([localFile.id]);

// Notice that CodeInterpreter must be enabled in the agent creation, otherwise the agent will not be able to see the file attachment
const agent = await client.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful agent",
  tools: [codeInterpreterTool.definition],
  toolResources: codeInterpreterTool.resources,
});
console.log(`Created agent, agent ID: ${agent.id}`);
```

#### Create Agent with Bing Grounding

To enable your Agent to perform search through Bing search API, you use `ToolUtility.createBingGroundingTool()` along with a connection. See [here](https://learn.microsoft.com/azure/ai-services/agents/how-to/tools/bing-grounding?tabs=python&pivots=overview) to learn more about Grounding with Bing Search.

Here is an example:

```ts snippet:bingGrounding
import { ToolUtility } from "@azure/ai-agents";

const connectionId = process.env["AZURE_BING_CONNECTION_ID"] || "<connection-name>";

// Initialize agent bing tool with the connection id
const bingTool = ToolUtility.createBingGroundingTool([{ connectionId: connectionId }]);

// Create agent with the bing tool and process assistant run
const agent = await client.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful agent",
  tools: [bingTool.definition],
});
console.log(`Created agent, agent ID : ${agent.id}`);
```

#### Create Agent with Azure AI Search

Azure AI Search is an enterprise search system for high-performance applications. It integrates with Azure OpenAI Service and Azure Machine Learning, offering advanced search technologies like vector search and full-text search. Ideal for knowledge base insights, information discovery, and automation

Here is an example to integrate Azure AI Search:

```ts snippet:AISearch
import { ToolUtility } from "@azure/ai-agents";

const connectionName = process.env["AZURE_AI_SEARCH_CONNECTION_NAME"] || "<connection-name>";

// Initialize Azure AI Search tool
const azureAISearchTool = ToolUtility.createAzureAISearchTool(connectionName, "search-index", {
  queryType: "simple",
  topK: 3,
  filter: "", // Add string here to filter results
  indexConnectionId: connectionName,
  indexName: "search-index",
});

// Create agent with the Azure AI search tool
const agent = await client.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful agent",
  tools: [azureAISearchTool.definition],
  toolResources: azureAISearchTool.resources,
});
console.log(`Created agent, agent ID : ${agent.id}`);
```

#### Create Agent with Function Call

You can enhance your Agents by defining callback functions as function tools. These can be provided to `createAgent` via the combination of `tools` and `toolResources`. Only the function definitions and descriptions are provided to `createAgent`, without the implementations. The `Run` or `event handler of stream` will raise a `requires_action` status based on the function definitions. Your code must handle this status and call the appropriate functions.

Here is an example:

```ts snippet:functionTools
import {
  FunctionToolDefinition,
  ToolUtility,
  RequiredToolCall,
  ToolOutput,
} from "@azure/ai-agents";

class FunctionToolExecutor {
  private functionTools: {
    func: Function;
    definition: FunctionToolDefinition;
  }[];

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

  private getCityNickname(_location: string): {} {
    return { nickname: "The Emerald City" };
  }

  private getWeather(_location: string, unit: string): {} {
    return { weather: unit === "f" ? "72f" : "22c" };
  }

  public invokeTool(toolCall: RequiredToolCall & FunctionToolDefinition): ToolOutput | undefined {
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
```

#### Create Agent With OpenAPI

OpenAPI specifications describe REST operations against a specific endpoint. Agents SDK can read an OpenAPI spec, create a function from it, and call that function against the REST endpoint without additional client-side execution.
Here is an example creating an OpenAPI tool (using anonymous authentication):

```ts snippet:createAgentWithOpenApi
import { ToolUtility } from "@azure/ai-agents";

// Read in OpenApi spec
const filePath = "./data/weatherOpenApi.json";
const openApiSpec = JSON.parse(fs.readFileSync(filePath, "utf-8"));

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

// Create OpenApi tool
const openApiTool = ToolUtility.createOpenApiTool(openApiFunction);

// Create agent with OpenApi tool
const agent = await client.createAgent("gpt-4o", {
  name: "myAgent",
  instructions: "You are a helpful agent",
  tools: [openApiTool.definition],
});
console.log(`Created agent, agent ID: ${agent.id}`);
```

#### Create Thread

For each session or conversation, a thread is required. Here is an example:

```ts snippet:createThread
const thread = await client.threads.create();
console.log(`Created thread, thread ID: ${thread.id}`);
```

#### Create Thread with Tool Resource

In some scenarios, you might need to assign specific resources to individual threads. To achieve this, you provide the `toolResources` argument to `threads.create`. In the following example, you create a vector store and upload a file, enable an Agent for file search using the `tools` argument, and then associate the file with the thread using the `toolResources` argument.

```ts snippet:threadWithTool
import { ToolUtility } from "@azure/ai-agents";

const filePath = "./data/syntheticCompanyQuarterlyResults.csv";
const localFileStream = fs.createReadStream(filePath);
const file = await client.files.upload(localFileStream, "assistants", {
  fileName: "sample_file_for_upload.csv",
});
console.log(`Uploaded file, ID: ${file.id}`);

const vectorStore = await client.agents.vectorStores.create()({
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
const thread = await client.threads.create({ toolResources: fileSearchTool.resources });
```

#### List Threads

To list all threads attached to a given agent, use `threads.list`:

```ts snippet:listThreads
const threads = client.threads.list();
console.log(`Threads for agent ${agent.id}:`);
for await (const t of threads) {
  console.log(`Thread ID: ${t.id}`);
  console.log(`Created at: ${t.createdAt}`);
  console.log(`Metadata: ${t.metadata}`);
  console.log(`---- `);
}
```

#### Create Message

To create a message for assistant to process, you pass `user` as `role` and a question as `content`:

```ts snippet:createMessage
const message = await client.messages.create(thread.id, "user", "hello, world!");
console.log(`Created message, message ID: ${message.id}`);
```

#### Create Message with File Search Attachment

To attach a file to a message for content searching, you use `ToolUtility.createFileSearchTool()` and the `attachments` argument:

```ts snippet:messageWithFileSearch
import { ToolUtility } from "@azure/ai-agents";

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
```

#### Create Message with Code Interpreter Attachment

To attach a file to a message for data analysis, you use `ToolUtility.createCodeInterpreterTool()` and the `attachment` argument.

Here is an example:

```ts snippet:messageWithCodeInterpreter
import { ToolUtility } from "@azure/ai-agents";

// notice that CodeInterpreter must be enabled in the agent creation,
// otherwise the agent will not be able to see the file attachment for code interpretation
const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
const agent = await client.agents.createAgent("gpt-4o", {
  name: "my-assistant",
  instructions: "You are helpful assistant",
  tools: [codeInterpreterTool.definition],
});
console.log(`Created agent, agent ID: ${agent.id}`);

const thread = await client.threads.create();
console.log(`Created thread, thread ID: ${thread.id}`);

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
```

#### Create Message with Image Inputs

You can send messages to Azure agents with image inputs in following ways:

- **Using an image stored as a uploaded file**
- **Using a public image accessible via URL**
- **Using a base64 encoded image string**

The following example demonstrates base64 method:

##### Create message with base64-encoded image input

```ts snippet:imageInputWithBase64
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

// Convert your image file to base64 format
const filePath = "./data/image_file.png";
const imageDataUrl = imageToBase64DataUrl(filePath, "image/png");

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
    imageUrl: {
      url: imageDataUrl,
      detail: "high",
    },
  },
];

const message = await client.messages.create(thread.id, "user", content);
console.log(`Created message, message ID: ${message.id}`);
```

#### Create Run, Run_and_Process, or Stream

Here is an example of `runs.create` and poll until the run is completed:

```ts snippet:createRun
// Create and poll a run
console.log("Creating run...");
const run = await client.runs.createAndPoll(thread.id, agent.id, {
  pollingOptions: {
    intervalInMs: 2000,
  },
  onResponse: (response): void => {
    console.log(`Received response with status: ${response.parsedBody.status}`);
  },
});
console.log(`Run finished with status: ${run.status}`);
```

To have the SDK poll on your behalf, use the `createThreadAndRun` method.

Here is an example:

```ts snippet:createThreadAndRun
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
```

With streaming, polling also need not be considered.

Here is an example:

```ts snippet:createRunStream
const streamEventMessages = await client.runs.create(thread.id, agent.id).stream();
```

Event handling can be done as follows:

```ts snippet:eventHandling
import { RunStreamEvent, MessageStreamEvent, ErrorEvent, DoneEvent } from "@azure/ai-agents";

const streamEventMessages = await client.runs.create(thread.id, agent.id).stream();

for await (const eventMessage of streamEventMessages) {
  switch (eventMessage.event) {
    case RunStreamEvent.ThreadRunCreated:
      console.log(`ThreadRun status: ${eventMessage.data.status}`);
      break;
    case MessageStreamEvent.ThreadMessageDelta:
      {
        const messageDelta = eventMessage.data;
        messageDelta.delta.content.forEach((contentPart) => {
          if (contentPart.type === "text") {
            const textContent = contentPart;
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
```

#### Retrieve Message

To retrieve messages from agents, use the following example:

```ts snippet:listMessages
const messagesIterator = client.messages.list(thread.id);
const allMessages = [];
for await (const m of messagesIterator) {
  allMessages.push(m);
}
console.log("Messages:", allMessages);

// The messages are following in the reverse order,
// we will iterate them and output only text contents.
const messages = await client.messages.list(thread.id, {
  order: "asc",
});

for await (const dataPoint of messages) {
  const textContent = dataPoint.content.find((item) => item.type === "text");
  if (textContent && "text" in textContent) {
    console.log(`${dataPoint.role}: ${textContent.text.value}`);
  }
}
```

### Retrieve File

Files uploaded by Agents cannot be retrieved back. If your use case needs to access the file content uploaded by the Agents, you are advised to keep an additional copy accessible by your application. However, files generated by Agents are retrievable by `files.getContent`.

Here is an example retrieving file ids from messages:

```ts snippet:retrieveFile
import { isOutputOfType, MessageTextContent, MessageImageFileContent } from "@azure/ai-agents";

const messagesIterator = client.messages.list(thread.id);
const allMessages = [];
for await (const m of messagesIterator) {
  allMessages.push(m);
}
console.log("Messages:", allMessages);

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

const imageFile = (allMessages[0].content[0] as MessageImageFileContent).imageFile;
const imageFileName = (await client.agents.files.get(imageFile.fileId)).filename;

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
```

#### Teardown

To remove resources after completing tasks, use the following functions:

```ts snippet:teardown
await client.vectorStores.delete(vectorStore.id);
console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);

await client.files.delete(file.id);
console.log(`Deleted file, file ID : ${file.id}`);

await client.deleteAgent(agent.id);
console.log(`Deleted agent, agent ID: ${agent.id}`);
```

## Troubleshooting

### Exceptions

Client methods that make service calls raise an [RestError](https://learn.microsoft.com/javascript/api/%40azure/core-rest-pipeline/resterror) for a non-success HTTP status code response from the service. The exception's `code` will hold the HTTP response status code. The exception's `error.message` contains a detailed message that may be helpful in diagnosing the issue:

```ts snippet:exceptions
import { RestError } from "@azure/core-rest-pipeline";

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
```

For example, when you provide wrong credentials:

```text
Status code: 401 (Unauthorized)
Operation returned an invalid status 'Unauthorized'
```

### Reporting issues

To report issues with the client library, or request additional features, please open a GitHub issue [here](https://github.com/Azure/azure-sdk-for-js/issues)

## Next steps

Have a look at the [package samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-agents/samples) folder, containing fully runnable code.

## Contributing

This project welcomes contributions and suggestions. Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution.
For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether
you need to provide a CLA and decorate the PR appropriately (e.g., label,
comment). Simply follow the instructions provided by the bot. You will only
need to do this once across all repos using our CLA.

This project has adopted the
[Microsoft Open Source Code of Conduct][code_of_conduct]. For more information,
see the Code of Conduct FAQ or contact opencode@microsoft.com with any
additional questions or comments.

<!-- LINKS -->

[azure_foundry_service_endpoint]: https://learn.microsoft.com/azure/ai-foundry/model-inference/how-to/configure-project-connection?pivots=ai-foundry-portal
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[entra_id]: https://learn.microsoft.com/azure/ai-services/authentication?tabs=powershell#authenticate-with-microsoft-entra-id
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[azure_sub]: https://azure.microsoft.com/free/
