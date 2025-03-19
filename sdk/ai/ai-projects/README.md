# Azure AI Projects client library for JavaScript

Use the AI Projects client library (in preview) to:

- **Enumerate connections** in your Azure AI Foundry project and get connection properties.
  For example, get the inference endpoint URL and credentials associated with your Azure OpenAI connection.
- **Develop Agents using the Azure AI Agent Service**, leveraging an extensive ecosystem of models, tools, and capabilities from OpenAI, Microsoft, and other LLM providers. The Azure AI Agent Service enables the building of Agents for a wide range of generative AI use cases. The package is currently in private preview.
- **Enable OpenTelemetry tracing**.

[Product documentation](https://aka.ms/azsdk/azure-ai-projects/product-doc)

| [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples)
| [Package (npm)](https://www.npmjs.com/package/@azure/ai-projects)
| [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme?view=azure-node-preview)

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisite](#prerequisite)
  - [Install the package](#install-the-package)
- [Key concepts](#key-concepts)
  - [Create and authenticate the client](#create-and-authenticate-the-client)
- [Examples](#examples)
  - [Enumerate connections](#enumerate-connections)
    - [Get properties of all connections](#get-properties-of-all-connections)
    - [Get properties of all connections of a particular type](#get-properties-of-all-connections-of-a-particular-type)
    - [Get properties of a default connection](#get-properties-of-a-default-connection)
    - [Get properties of a connection by its connection name](#get-properties-of-a-connection-by-its-connection-name)
  - [Agents (Preview)](#agents-private-preview)
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
    - [Execute Run, Create Thread and Run, or Stream](#create-run-run_and_process-or-stream)
    - [Retrieve message](#retrieve-message)
    - [Retrieve file](#retrieve-file)
    - [Tear down by deleting resource](#teardown)
    - [Tracing](#tracing)
  - [Tracing](#tracing)
    - [Installation](#installation)
    - [Tracing example](#tracing-example)
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
- The project connection string. It can be found in your Azure AI Foundry project overview page, under "Project details". Below we will assume the environment variable `AZURE_AI_PROJECTS_CONNECTION_STRING` was defined to hold this value.
- Entra ID is needed to authenticate the client. Your application needs an object that implements the [TokenCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/tokencredential) interface. Code samples here use [DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest). To get that working, you will need:
  - The `Contributor` role. Role assigned can be done via the "Access Control (IAM)" tab of your Azure AI Project resource in the Azure portal.
  - [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed.
  - You are logged into your Azure account by running `az login`.
  - Note that if you have multiple Azure subscriptions, the subscription that contains your Azure AI Project resource must be your default subscription. Run `az account list --output table` to list all your subscription and see which one is the default. Run `az account set --subscription "Your Subscription ID or Name"` to change your default subscription.

### Install the package

```bash
npm install @azure/ai-projects @azure/identity
```

## Key concepts

### Create and authenticate the client

The class factory method `fromConnectionString` is used to construct the client. To construct a client:

```ts snippet:setup
import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const connectionString = process.env.AZURE_AI_PROJECTS_CONNECTION_STRING ?? "<connectionString>";
const client = AIProjectsClient.fromConnectionString(
  connectionString,
  new DefaultAzureCredential(),
);
```

## Examples

### Enumerate connections

Your Azure AI Foundry project has a "Management center". When you enter it, you will see a tab named "Connected resources" under your project. The `.connections` operations on the client allow you to enumerate the connections and get connection properties. Connection properties include the resource URL and authentication credentials, among other things.

Below are code examples of the connection operations. Full samples can be found under the "connections" folder in the [package samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples).

#### Get properties of all connections

To list the properties of all the connections in the Azure AI Foundry project:

```ts snippet:listConnections
const connections = await client.connections.listConnections();
for (const connection of connections) {
  console.log(connection);
}
```

#### Get properties of all connections of a particular type

To list the properties of connections of a certain type (here Azure OpenAI):

```ts snippet:filterConnections
const connections = await client.connections.listConnections({ category: "AzureOpenAI" });
for (const connection of connections) {
  console.log(connection);
}
```

#### Get properties of a connection by its connection name

To get the connection properties of a connection named `connectionName`:

```ts snippet:getConnection
const connection = await client.connections.getConnection("connectionName");
console.log(connection);
```

To get the connection properties with its authentication credentials:

```ts snippet:getConnectionWithSecrets
const connection = await client.connections.getConnectionWithSecrets("connectionName");
console.log(connection);
```

### Agents (Preview)

Agents in the Azure AI Projects client library are designed to facilitate various interactions and operations within your AI projects. They serve as the core components that manage and execute tasks, leveraging different tools and resources to achieve specific goals. The following steps outline the typical sequence for interacting with Agents. See the "agents" folder in the [package samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples) for additional Agent samples.

Agents are actively being developed. A sign-up form for private preview is coming soon.

#### Create Agent

Here is an example of how to create an Agent:

```ts snippet:createAgent
const agent = await client.agents.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful assistant",
});
```

To allow Agents to access your resources or custom functions, you need tools. You can pass tools to `createAgent` through the `tools` and `toolResources` arguments.

You can use `ToolSet` to do this:

```ts snippet:toolSet
import { ToolSet } from "@azure/ai-projects";

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
```

#### Create Agent with File Search

To perform file search by an Agent, we first need to upload a file, create a vector store, and associate the file to the vector store. Here is an example:

```ts snippet:fileSearch
import { ToolUtility } from "@azure/ai-projects";

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
```

#### Create Agent with Code Interpreter

Here is an example to upload a file and use it for code interpreter by an Agent:

```ts snippet:codeInterpreter
import { ToolUtility } from "@azure/ai-projects";

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
```

#### Create Agent with Bing Grounding

To enable your Agent to perform search through Bing search API, you use `ToolUtility.createConnectionTool()` along with a connection.

Here is an example:

```ts snippet:bingGrounding
import { ToolUtility, connectionToolType } from "@azure/ai-projects";

const bingConnection = await client.connections.getConnection(
  process.env.BING_CONNECTION_NAME ?? "<connection-name>",
);
const connectionId = bingConnection.id;
const bingTool = ToolUtility.createConnectionTool(connectionToolType.BingGrounding, [connectionId]);
const agent = await client.agents.createAgent("gpt-4o", {
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
import { ToolUtility } from "@azure/ai-projects";

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
```

#### Create Agent with Function Call

You can enhance your Agents by defining callback functions as function tools. These can be provided to `createAgent` via the combination of `tools` and `toolResources`. Only the function definitions and descriptions are provided to `createAgent`, without the implementations. The `Run` or `event handler of stream` will raise a `requires_action` status based on the function definitions. Your code must handle this status and call the appropriate functions.

Here is an example:

```ts snippet:functionTools
import {
  FunctionToolDefinition,
  ToolUtility,
  RequiredToolCallOutput,
  FunctionToolDefinitionOutput,
  ToolOutput,
} from "@azure/ai-projects";

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
```

#### Create Thread

For each session or conversation, a thread is required. Here is an example:

```ts snippet:createThread
const thread = await client.agents.createThread();
```

#### Create Thread with Tool Resource

In some scenarios, you might need to assign specific resources to individual threads. To achieve this, you provide the `toolResources` argument to `createThread`. In the following example, you create a vector store and upload a file, enable an Agent for file search using the `tools` argument, and then associate the file with the thread using the `toolResources` argument.

```ts snippet:threadWithTool
import { ToolUtility } from "@azure/ai-projects";

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
```

#### Create Message

To create a message for assistant to process, you pass `user` as `role` and a question as `content`:

```ts snippet:createMessage
const message = await client.agents.createMessage(thread.id, {
  role: "user",
  content: "hello, world!",
});
console.log(`Created message, message ID: ${message.id}`);
```

#### Create Message with File Search Attachment

To attach a file to a message for content searching, you use `ToolUtility.createFileSearchTool()` and the `attachments` argument:

```ts snippet:messageWithFileSearch
import { ToolUtility } from "@azure/ai-projects";

const fileSearchTool = ToolUtility.createFileSearchTool();
const message = await client.agents.createMessage(thread.id, {
  role: "user",
  content: "What feature does Smart Eyewear offer?",
  attachments: {
    fileId: file.id,
    tools: [fileSearchTool.definition],
  },
});
```

#### Create Message with Code Interpreter Attachment

To attach a file to a message for data analysis, you use `ToolUtility.createCodeInterpreterTool()` and the `attachment` argument.

Here is an example:

```ts snippet:messageWithCodeInterpreter
import { ToolUtility } from "@azure/ai-projects";

// notice that CodeInterpreter must be enabled in the agent creation,
// otherwise the agent will not be able to see the file attachment for code interpretation
const codeInterpreterTool = ToolUtility.createCodeInterpreterTool();
const agent = await client.agents.createAgent("gpt-4-1106-preview", {
  name: "my-assistant",
  instructions: "You are helpful assistant",
  tools: [codeInterpreterTool.definition],
});
console.log(`Created agent, agent ID: ${agent.id}`);

const thread = await client.agents.createThread();
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
```

#### Create Run, Run_and_Process, or Stream

Here is an example of `createRun` and poll until the run is completed:

```ts snippet:createRun
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
```

To have the SDK poll on your behalf, use the `createThreadAndRun` method.

Here is an example:

```javascript
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
```

With streaming, polling also need not be considered.

Here is an example:

```ts snippet:createRunStream
const streamEventMessages = await client.agents.createRun(thread.id, agent.id).stream();
```

Event handling can be done as follows:

```ts snippet:eventHandling
import {
  RunStreamEvent,
  ThreadRunOutput,
  MessageStreamEvent,
  MessageDeltaChunk,
  MessageDeltaTextContent,
  DoneEvent,
} from "@azure/ai-projects";

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
```

#### Retrieve Message

To retrieve messages from agents, use the following example:

```ts snippet:listMessages
import { MessageContentOutput, isOutputOfType, MessageTextContentOutput } from "../src/index.js";

const messages = await client.agents.listMessages(thread.id);
while (messages.hasMore) {
  const nextMessages = await client.agents.listMessages(currentRun.threadId, {
    after: messages.lastId,
  });
  messages.data = messages.data.concat(nextMessages.data);
  messages.hasMore = nextMessages.hasMore;
  messages.lastId = nextMessages.lastId;
}

// The messages are following in the reverse order,
// we will iterate them and output only text contents.
for (const dataPoint of messages.data.reverse()) {
  const lastMessageContent: MessageContentOutput = dataPoint.content[dataPoint.content.length - 1];
  console.log(lastMessageContent);
  if (isOutputOfType<MessageTextContentOutput>(lastMessageContent, "text")) {
    console.log(
      `${dataPoint.role}: ${(lastMessageContent as MessageTextContentOutput).text.value}`,
    );
  }
}
```

### Retrieve File

Files uploaded by Agents cannot be retrieved back. If your use case needs to access the file content uploaded by the Agents, you are advised to keep an additional copy accessible by your application. However, files generated by Agents are retrievable by `getFileContent`.

Here is an example retrieving file ids from messages:

```ts snippet:retrieveFile
import {
  isOutputOfType,
  MessageTextContentOutput,
  MessageImageFileContentOutput,
} from "../src/index.js";

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
```

#### Teardown

To remove resources after completing tasks, use the following functions:

```ts snippet:teardown
await client.agents.deleteVectorStore(vectorStore.id);
console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);
await client.agents.deleteFile(file.id);
console.log(`Deleted file, file ID: ${file.id}`);
client.agents.deleteAgent(agent.id);
console.log(`Deleted agent, agent ID: ${agent.id}`);
```

### Tracing

You can add an Application Insights Azure resource to your Azure AI Foundry project. See the Tracing tab in your studio. If one was enabled, you can get the Application Insights connection string, configure your Agents, and observe the full execution path through Azure Monitor. Typically, you might want to start tracing before you create an Agent.

#### Installation

Make sure to install OpenTelemetry and the Azure SDK tracing plugin via

```bash
npm install @opentelemetry/api \
  @opentelemetry/instrumentation \
  @opentelemetry/sdk-trace-node \
  @azure/opentelemetry-instrumentation-azure-sdk \
  @azure/monitor-opentelemetry-exporter
```

You will also need an exporter to send telemetry to your observability backend. You can print traces to the console or use a local viewer such as [Aspire Dashboard](https://learn.microsoft.com/dotnet/aspire/fundamentals/dashboard/standalone?tabs=bash).

To connect to Aspire Dashboard or another OpenTelemetry compatible backend, install OTLP exporter:

```bash
npm install @opentelemetry/exporter-trace-otlp-proto \
  @opentelemetry/exporter-metrics-otlp-proto
```

#### Tracing example

Here is a code sample to be included above `createAgent`:

```ts snippet:tracing
import {
  NodeTracerProvider,
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/sdk-trace-node";
import { trace } from "@opentelemetry/api";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

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
```

## Troubleshooting

### Exceptions

Client methods that make service calls raise an [RestError](https://learn.microsoft.com/javascript/api/%40azure/core-rest-pipeline/resterror) for a non-success HTTP status code response from the service. The exception's `code` will hold the HTTP response status code. The exception's `error.message` contains a detailed message that may be helpful in diagnosing the issue:

```ts snippet:exceptions
import { RestError } from "@azure/core-rest-pipeline";

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
```

For example, when you provide wrong credentials:

```text
Status code: 401 (Unauthorized)
Operation returned an invalid status 'Unauthorized'
```

### Reporting issues

To report issues with the client library, or request additional features, please open a GitHub issue [here](https://github.com/Azure/azure-sdk-for-js/issues)

## Next steps

Have a look at the [package samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples) folder, containing fully runnable code.

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

[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[entra_id]: https://learn.microsoft.com/azure/ai-services/authentication?tabs=powershell#authenticate-with-microsoft-entra-id
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_sub]: https://azure.microsoft.com/free/
[evaluators]: https://learn.microsoft.com/azure/ai-studio/how-to/develop/evaluate-sdk
[evaluator_library]: https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app#view-and-manage-the-evaluators-in-the-evaluator-library
