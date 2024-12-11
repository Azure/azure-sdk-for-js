# Azure AI Projects client library for JavaScript

Use the AI Projects client library (in preview) to:

- **Enumerate connections** in your Azure AI Studio project and get connection properties.
For example, get the inference endpoint URL and credentials associated with your Azure OpenAI connection.
<!-- - **Get an authenticated Inference client** to do chat completions, for the default Azure OpenAI or AI Services connections in your Azure AI Studio project. Supports the AzureOpenAI client from the `openai` package, or clients from the `azure-ai-inference` package. -->
- **Develop Agents using the Azure AI Agent Service**, leveraging an extensive ecosystem of models, tools, and capabilities from OpenAI, Microsoft, and other LLM providers. The Azure AI Agent Service enables the building of Agents for a wide range of generative AI use cases. The package is currently in private preview.
<!-- - **Run Evaluations** to assess the performance of generative AI applications using various evaluators and metrics. It includes built-in evaluators for quality, risk, and safety, and allows custom evaluators for specific needs. -->
- **Enable OpenTelemetry tracing**.

[Product documentation](https://aka.ms/azsdk/azure-ai-projects/product-doc)
| [Samples][samples]
| [API reference documentation](https://aka.ms/azsdk/azure-ai-projects/python/reference) <!-- TODO: Update aka.ms/azsdk link -->
| [Package (npm)](https://www.npmjs.com/package/@azure/ai-projects) <!-- TODO: Update aka.ms/azsdk link -->
| [SDK source code](https://aka.ms/azsdk/azure-ai-projects/python/code) <!-- TODO: Update aka.ms/azsdk link -->
| [AI Starter Template](https://aka.ms/azsdk/azure-ai-projects/python/ai-starter-template) <!-- TODO: Update aka.ms/azsdk link -->

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
      <!-- - [Get an authenticated ChatCompletionsClient](#get-an-authenticated-chatcompletionsclient) -->
      <!-- - [Get an authenticated AzureOpenAI client](#get-an-authenticated-azureopenai-client) -->
  - [Agents (Private Preview)](#agents-private-preview)
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
    - [Execute Run, Run_and_Process, or Stream](#create-run-run_and_process-or-stream)
    - [Retrieve message](#retrieve-message)
    - [Retrieve file](#retrieve-file)
    - [Tear down by deleting resource](#teardown)
    - [Tracing](#tracing)
    <!-- - [Evaluation](#evaluation)
    - [Evaluator](#evaluator)
    - [Run Evaluation in the cloud](#run-evaluation-in-the-cloud)
      - [Evaluators](#evaluators)
      - [Data to be evaluated](#data-to-be-evaluated)
        - [[Optional] Azure OpenAI Model](#optional-azure-openai-model)
        - [Example Remote Evaluation](#example-remote-evaluation) -->
  - [Tracing](#tracing)
    - [Installation](#installation)
    - [Tracing example](#tracing-example)
- [Troubleshooting](#troubleshooting)
  - [Exceptions](#exceptions)
  <!-- - [Logging](#logging) -->
  - [Reporting issues](#reporting-issues)
- [Next steps](#next-steps)
- [Contributing](#contributing)

## Getting started

### Prerequisite

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- An [Azure subscription][azure_sub].
- A [project in Azure AI Studio](https://learn.microsoft.com/azure/ai-studio/how-to/create-projects?tabs=ai-studio).
- The project connection string. It can be found in your Azure AI Studio project overview page, under "Project details". Below we will assume the environment variable `PROJECT_CONNECTION_STRING` was defined to hold this value.
- Entra ID is needed to authenticate the client. Your application needs an object that implements the [TokenCredential](https://learn.microsoft.com/en-us/javascript/api/@azure/core-auth/tokencredential) interface. Code samples here use [DefaultAzureCredential](https://learn.microsoft.com/en-us/javascript/api/@azure/identity/defaultazurecredential?view=azure-node-latest). To get that working, you will need:
  - The `Contributor` role. Role assigned can be done via the "Access Control (IAM)" tab of your Azure AI Project resource in the Azure portal.
  - [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed.
  - You are logged into your Azure account by running `az login`.
  - Note that if you have multiple Azure subscriptions, the subscription that contains your Azure AI Project resource must be your default subscription. Run `az account list --output table` to list all your subscription and see which one is the default. Run `az account set --subscription "Your Subscription ID or Name"` to change your default subscription.

### Install the package

```bash
npm install azure-ai-projects
```

## Key concepts

### Create and authenticate the client

The class factory method `fromConnectionString` is used to construct the client. To construct a client:

```javascript
import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<connectionString>";

const client = AIProjectsClient.fromConnectionString(
  connectionString,
  new DefaultAzureCredential(),
);
```

## Examples

### Enumerate connections

Your Azure AI Studio project has a "Management center". When you enter it, you will see a tab named "Connected resources" under your project. The `.connections` operations on the client allow you to enumerate the connections and get connection properties. Connection properties include the resource URL and authentication credentials, among other things.

Below are code examples of the connection operations. Full samples can be found under the "connections" folder in the [package samples][samples].

#### Get properties of all connections

To list the properties of all the connections in the Azure AI Studio project:

```javascript
const connections = await client.connections.listConnections();
for (const connection of connections) {
  console.log(connection);
}
```

#### Get properties of all connections of a particular type

To list the properties of connections of a certain type (here Azure OpenAI):

```javascript
const connections = await client.connections.listConnections({ category: "AzureOpenAI" });
for (const connection of connections) {
  console.log(connection);
}
```

#### Get properties of a connection by its connection name

To get the connection properties of a connection named `connectionName`:

```javascript
const connection = await client.connections.getConnection("connectionName");
print(connection);
```

To get the connection properties with its authentication credentials:

```javascript
const connection = await client.connections.getConnectionWithSecrets("connectionName");
print(connection);
```

<!-- TODO: Revisit w/ inference
### Get an authenticated ChatCompletionsClient

Your Azure AI Studio project may have one or more AI models deployed that support chat completions. These could be OpenAI models, Microsoft models, or models from other providers. Use the code below to get an already authenticated [ChatCompletionsClient](https://learn.microsoft.com/python/api/azure-ai-inference/azure.ai.inference.chatcompletionsclient?view=azure-python-preview) from the [azure-ai-inference](https://pypi.org/project/azure-ai-inference/) package, and execute a chat completions call.

First, install the package:

```bash
pip install azure-ai-inference
```

Then run this code (replace "gpt-4o" with your model deployment name):

```python
inference_client = project_client.inference.get_chat_completions_client()

response = inference_client.complete(
    model="gpt-4o", # Model deployment name
    messages=[UserMessage(content="How many feet are in a mile?")]
)

print(response.choices[0].message.content)
```

See the "inference" folder in the [package samples][samples] for additional samples, including getting an authenticated [EmbeddingsClient](https://learn.microsoft.com/python/api/azure-ai-inference/azure.ai.inference.embeddingsclient?view=azure-python-preview).
-->

<!-- TODO: Revisit w/ inference
### Get an authenticated AzureOpenAI client

Your Azure AI Studio project may have one or more OpenAI models deployed that support chat completions. Use the code below to get an already authenticated [AzureOpenAI](https://github.com/openai/openai-node?tab=readme-ov-file#microsoft-azure-openai) from the [openai](https://www.npmjs.com/package/openai/) package, and execute a chat completions call.

First, install the package:

```bash
npm install openai
```

Then run the code below. Replace `gpt-4o` with your model deployment name, and update the `api_version` value with one found in the "Data plane - inference" row [in this table](https://learn.microsoft.com/azure/ai-services/openai/reference#api-specs).

```python
aoai_client = project_client.inference.get_azure_openai_client(api_version="2024-06-01")

response = aoai_client.chat.completions.create(
    model="gpt-4o", # Model deployment name
    messages=[
        {
            "role": "user",
            "content": "How many feet are in a mile?",
        },
    ],
)

print(response.choices[0].message.content)
```

See the "inference" folder in the [package samples][samples] for additional samples.
-->

### Agents (Private Preview)

Agents in the Azure AI Projects client library are designed to facilitate various interactions and operations within your AI projects. They serve as the core components that manage and execute tasks, leveraging different tools and resources to achieve specific goals. The following steps outline the typical sequence for interacting with Agents. See the "agents" folder in the [package samples][samples] for additional Agent samples.

Agents are actively being developed. A sign-up form for private preview is coming soon.

#### Create Agent

Here is an example of how to create an Agent:

<!-- SNIPPET:sample_agents_basics.create_agent -->

```javascript
const agent = await client.agents.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful assistant",
});
```

<!-- END SNIPPET -->

To allow Agents to access your resources or custom functions, you need tools. You can pass tools to `createAgent` through the `tools` and `tool_resources` arguments.

You can use `ToolSet` to do this:

<!-- SNIPPET:sample_agents_run_with_toolset.create_agent_toolset -->

```javascript
const toolSet = new ToolSet();
toolSet.addFileSearchTool([vectorStore.id]);
toolSet.addCodeInterpreterTool([codeInterpreterFile.id]);

// Create agent with tool set
const agent = await client.agents.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful agent",
  tools: toolSet.toolDefinitions,
  tool_resources: toolSet.toolResources,
});
console.log(`Created agent, agent ID: ${agent.id}`);
```

<!-- END SNIPPET -->

#### Create Agent with File Search

To perform file search by an Agent, we first need to upload a file, create a vector store, and associate the file to the vector store. Here is an example:

<!-- SNIPPET:sample_agents_file_search.upload_file_create_vector_store_and_agent_with_file_search_tool -->

```javascript
const localFileStream = fs.createReadStream("sample_file_for_upload.txt");
const file = await client.agents.uploadFile(
  localFileStream,
  "assistants",
  "sample_file_for_upload.txt",
);
console.log(`Uploaded file, ID: ${file.id}`);

const vectorStore = await client.agents.createVectorStore({
  file_ids: [file.id],
  name: "my_vector_store",
});
console.log(`Created vector store, ID: ${vectorStore.id}`);

const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);

const agent = await client.agents.createAgent("gpt-4o", {
  name: "SDK Test Agent - Retrieval",
  instructions: "You are helpful agent that can help fetch data from files you know about.",
  tools: [fileSearchTool.definition],
  tool_resources: fileSearchTool.resources,
});
console.log(`Created agent, agent ID : ${agent.id}`);
```

<!-- END SNIPPET -->

#### Create Agent with Code Interpreter

Here is an example to upload a file and use it for code interpreter by an Agent:

<!-- SNIPPET:sample_agents_code_interpreter.upload_file_and_create_agent_with_code_interpreter -->

```javascript
const fileStream = fs.createReadStream("nifty_500_quarterly_results.csv");
const fFile = await client.agents.uploadFile(
  fileStream,
  "assistants",
  "nifty_500_quarterly_results.csv",
);
console.log(`Uploaded local file, file ID : ${file.id}`);

const codeInterpreterTool = ToolUtility.createCodeInterpreterTool([file.id]);

// Notice that CodeInterpreter must be enabled in the agent creation, otherwise the agent will not be able to see the file attachment
const agent = await client.agents.createAgent("gpt-4o-mini", {
  name: "my-agent",
  instructions: "You are a helpful agent",
  tools: [codeInterpreterTool.definition],
  tool_resources: codeInterpreterTool.resources,
});
console.log(`Created agent, agent ID: ${agent.id}`);
```

<!-- END SNIPPET -->

#### Create Agent with Bing Grounding

To enable your Agent to perform search through Bing search API, you use `ToolUtility.createConnectionTool()` along with a connection.

Here is an example:

<!-- SNIPPET:sample_agents_bing_grounding.create_agent_with_bing_grounding_tool -->

```javascript
const bingGroundingConnectionId = "<bingGroundingConnectionId>";
const bingTool = ToolUtility.createConnectionTool(connectionToolType.BingGrounding, [
  bingGroundingConnectionId,
]);

const agent = await client.agents.createAgent(
  "gpt-4-0125-preview",
  {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [bingTool.definition],
  },
  {
    headers: { "x-ms-enable-preview": "true" },
  },
);
console.log(`Created agent, agent ID : ${agent.id}`);
```

<!-- END SNIPPET -->

#### Create Agent with Azure AI Search

Azure AI Search is an enterprise search system for high-performance applications. It integrates with Azure OpenAI Service and Azure Machine Learning, offering advanced search technologies like vector search and full-text search. Ideal for knowledge base insights, information discovery, and automation

Here is an example to integrate Azure AI Search:

<!-- SNIPPET:sample_agents_azure_ai_search.create_agent_with_azure_ai_search_tool -->

```javascript
const cognitiveServicesConnectionName = "<cognitiveServicesConnectionName>";
const cognitiveServicesConnection = await client.connections.getConnection(
  cognitiveServicesConnectionName,
);
const azureAISearchTool = ToolUtility.createAzureAISearchTool(
  cognitiveServicesConnection.id,
  cognitiveServicesConnection.name,
);

// Create agent with the Azure AI search tool
const agent = await client.agents.createAgent(
  "gpt-4-0125-preview",
  {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: [azureAISearchTool.definition],
    tool_resources: azureAISearchTool.resources,
  },
  {
    headers: { "x-ms-enable-preview": "true" },
  },
);
console.log(`Created agent, agent ID : ${agent.id}`);
```

<!-- END SNIPPET -->

#### Create Agent with Function Call

You can enhance your Agents by defining callback functions as function tools. These can be provided to `createAgent` via the combination of `tools` and `tool_resources`. Only the function definitions and descriptions are provided to `createAgent`, without the implementations. The `Run` or `event handler of stream` will raise a `requires_action` status based on the function definitions. Your code must handle this status and call the appropriate functions.

For more details about calling functions by code, refer to [`sample_agents_stream_eventhandler_with_functions.py`](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-projects/samples/agents/sample_agents_stream_eventhandler_with_functions.py)<!-- TODO: Update sample/link --> and [`sample_agents_functions.py`](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-projects/samples/agents/sample_agents_functions.py)<!-- TODO: Update sample/link -->.

Here is an example:

<!-- SNIPPET:sample_agents_stream_eventhandler_with_toolset.create_agent_with_function_tool -->

```javascript
class FunctionToolExecutor {
  private functionTools: { func: Function, definition: FunctionToolDefinition }[];

  constructor() {
    this.functionTools = [{
      func: this.getUserFavoriteCity,
      ...ToolUtility.createFunctionTool({
        name: "getUserFavoriteCity",
        description: "Gets the user's favorite city.",
        parameters: {}
      })
    }, {
      func: this.getCityNickname,
      ...ToolUtility.createFunctionTool({
        name: "getCityNickname",
        description: "Gets the nickname of a city, e.g. 'LA' for 'Los Angeles, CA'.",
        parameters: { type: "object", properties: { location: { type: "string", description: "The city and state, e.g. Seattle, Wa" } } }
      })
    }, {
      func: this.getWeather,
      ...ToolUtility.createFunctionTool({
        name: "getWeather",
        description: "Gets the weather for a location.",
        parameters: { type: "object", properties: { location: { type: "string", description: "The city and state, e.g. Seattle, Wa" }, unit: { type: "string", enum: ['c', 'f'] } } }
      })
    }];
  }

  private getUserFavoriteCity(): {} {
    return { "location": "Seattle, WA" };
  }

  private getCityNickname(location: string): {} {
    return { "nickname": "The Emerald City" };
  }

  private getWeather(location: string, unit: string): {} {
    return { "weather": unit === "f" ? "72f" : "22c" };
  }

  public invokeTool(toolCall: RequiredToolCallOutput & FunctionToolDefinitionOutput): ToolOutput | undefined {
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
    const result = this.functionTools.find((tool) => tool.definition.function.name === toolCall.function.name)?.func(...args);
    return result ? {
      tool_call_id: toolCall.id,
      output: JSON.stringify(result)
    } : undefined;
  }

  public getFunctionDefinitions(): FunctionToolDefinition[] {
    return this.functionTools.map(tool => {return tool.definition});
  }
}

const functionToolExecutor = new FunctionToolExecutor();
const functionTools = functionToolExecutor.getFunctionDefinitions();
const agent = await client.agents.createAgent("gpt-4o",
  {
    name: "my-agent",
    instructions: "You are a weather bot. Use the provided functions to help answer questions. Customize your responses to the user's preferences as much as possible and use friendly nicknames for cities whenever possible.",
    tools: functionTools
  });
console.log(`Created agent, agent ID: ${agent.id}`);
```

<!-- END SNIPPET -->

#### Create Thread

For each session or conversation, a thread is required. Here is an example:

<!-- SNIPPET:sample_agents_basics.create_thread -->

```javascript
const thread = await client.agents.createThread();
```

<!-- END SNIPPET -->

#### Create Thread with Tool Resource

In some scenarios, you might need to assign specific resources to individual threads. To achieve this, you provide the `tool_resources` argument to `createThread`. In the following example, you create a vector store and upload a file, enable an Agent for file search using the `tools` argument, and then associate the file with the thread using the `tool_resources` argument.

<!-- SNIPPET:sample_agents_with_resources_in_thread.create_agent_and_thread_for_file_search -->

```javascript
const localFileStream = fs.createReadStream("sample_file_for_upload.txt");
const file = await client.agents.uploadFile(
  localFileStream,
  "assistants",
  "sample_file_for_upload.txt",
);
console.log(`Uploaded file, ID: ${file.id}`);

const vectorStore = await client.agents.createVectorStore({
  file_ids: [file.id],
  name: "my_vector_store",
});
console.log(`Created vector store, ID: ${vectorStore.id}`);

const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);

const agent = await client.agents.createAgent("gpt-4o", {
  name: "SDK Test Agent - Retrieval",
  instructions: "You are helpful agent that can help fetch data from files you know about.",
  tools: [fileSearchTool.definition],
});
console.log(`Created agent, agent ID : ${agent.id}`);

// Create thread with file resources.
// If the agent has multiple threads, only this thread can search this file.
const thread = await client.agents.createThread({ tool_resources: fileSearchTool.resources });
```

<!-- END SNIPPET -->

#### Create Message

To create a message for assistant to process, you pass `user` as `role` and a question as `content`:

<!-- SNIPPET:sample_agents_basics.create_message -->

```javascript
const message = await client.agents.createMessage(thread.id, {
  role: "user",
  content: "hello, world!",
});
```

<!-- END SNIPPET -->

#### Create Message with File Search Attachment

To attach a file to a message for content searching, you use `ToolUtility.createFileSearchTool()` and the `attachments` argument:

<!-- SNIPPET:sample_agents_with_file_search_attachment.create_message_with_attachment -->

```javascript
const fileSearchTool = ToolUtility.createFileSearchTool();
const message = await client.agents.createMessage(thread.id, {
  role: "user",
  content: "What feature does Smart Eyewear offer?",
  attachments: {
    file_id: file.id,
    tools: [fileSearchTool.definition],
  },
});
```

<!-- END SNIPPET -->

#### Create Message with Code Interpreter Attachment

To attach a file to a message for data analysis, you use `ToolUtility.createCodeInterpreterTool()` and the `attachment` argument.

Here is an example:

<!-- SNIPPET:sample_agents_with_code_interpreter_file_attachment.create_agent_and_message_with_code_interpreter_file_attachment -->

```javascript
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
    file_id: file.id,
    tools: [codeInterpreterTool.definition],
  },
});
console.log(`Created message, message ID: ${message.id}`);
```

<!-- END SNIPPET -->

#### Create Run, Run_and_Process, or Stream

To process your message, you can use `createRun`, `createAndProcessRun`, or `createRunStreaming`.

`createRun` requests the Agent to process the message without polling for the result. If you are using `function tools`, your code is responsible for polling for the result and acknowledging the status of `Run`. When the status is `requires_action`, your code is responsible for calling the function tools. For a code sample, visit [`sample_agents_functions.py`](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/ai/azure-ai-projects/samples/agents/sample_agents_functions.py). <!-- TODO: Update sample/link -->

Here is an example of `createRun` and poll until the run is completed:

<!-- SNIPPET:sample_agents_basics.create_run -->

```javascript
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

<!-- END SNIPPET -->

To have the SDK poll on your behalf, use the `createAndProcessRun` method.

Here is an example:

<!-- SNIPPET:sample_agents_run_with_toolset.create_and_process_run -->

```javascript
const run = await client.agents.createAndProcessRun(thread.id, agent.id);
```

<!-- END SNIPPET -->

With streaming, polling also need not be considered.

Here is an example:

<!-- SNIPPET:sample_agents_stream_eventhandler.create_stream -->

```javascript
const streamEventMessages = await client.agents.createRunStreaming(thread.id, agent.id);
```

Event handling can be done as follows:

```javascript
for await (const eventMessage of streamEventMessages) {
switch (eventMessage.event) {
  case RunStreamEvent.ThreadRunCreated:
    console.log(`ThreadRun status: ${(eventMessage.data as ThreadRunOutput).status}`)
    break;
  case MessageStreamEvent.ThreadMessageDelta:
    {
      const messageDelta = eventMessage.data as MessageDeltaChunk;
      messageDelta.delta.content.forEach((contentPart) => {
        if (contentPart.type === "text") {
          const textContent = contentPart as MessageDeltaTextContent
          const textValue = textContent.text?.value || "No text"
          console.log(`Text delta received:: ${textValue}`)
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

<!-- END SNIPPET -->

#### Retrieve Message

To retrieve messages from agents, use the following example:

<!-- SNIPPET:sample_agents_basics.list_messages -->

```javascript
const messages = await client.agents.listMessages(thread.id);

// The messages are following in the reverse order,
// we will iterate them and output only text contents.
for (const dataPoint of messages.data.reverse()) {
    const lastMessageContent: MessageContentOutput = dataPoint.content[dataPoint.content.length - 1];
    console.log( lastMessageContent);
    if (isOutputOfType<MessageTextContentOutput>(lastMessageContent, "text")) {
      console.log(`${dataPoint.role}: ${(lastMessageContent as MessageTextContentOutput).text.value}`);
    }
  }
```

<!-- END SNIPPET -->

### Retrieve File

Files uploaded by Agents cannot be retrieved back. If your use case need to access the file content uploaded by the Agents, you are advised to keep an additional copy accessible by your application. However, files generated by Agents are retrievable by `getFileContent`.

Here is an example retrieving file ids from messages:

<!-- SNIPPET:sample_agents_code_interpreter.get_messages_and_save_files -->

```javascript
const messages = await client.agents.listMessages(thread.id);
const imageFile = (messages.data[0].content[0] as MessageImageFileContentOutput).image_file;
const imageFileName = (await client.agents.getFile(imageFile.file_id)).filename;

const fileContent = await (await client.agents.getFileContent(imageFile.file_id).asNodeStream()).body;
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

<!-- SNIPPET:sample_agents_file_search.teardown -->

```javascript
await client.agents.deleteVectorStore(vectorStore.id);
console.log(`Deleted vector store, vector store ID: ${vectorStore.id}`);

await client.agents.deleteFile(file.id);
console.log(`Deleted file, file ID: ${file.id}`);

project_client.agents.deleteAgent(agent.id);
console.log(`Deleted agent, agent ID: ${agent.id}`);
```

<!-- END SNIPPET -->

<!-- TODO: Revisit w/ evaluation
### Evaluation

Evaluation in Azure AI Project client library is designed to assess the performance of generative AI applications in the cloud. The output of Generative AI application is quantitively measured with mathematical based metrics, AI-assisted quality and safety metrics. Metrics are defined as evaluators. Built-in or custom evaluators can provide comprehensive insights into the application's capabilities and limitations.

#### Evaluator

Evaluators are custom or prebuilt classes or functions that are designed to measure the quality of the outputs from language models or generative AI applications.

Evaluators are made available via [azure-ai-evaluation][azure_ai_evaluation] SDK for local experience and also in [Evaluator Library][evaluator_library] in Azure AI Studio for using them in the cloud.

More details on built-in and custom evaluators can be found [here][evaluators].

#### Run Evaluation in the cloud

To run evaluation in the cloud the following are needed:

- Evaluators
- Data to be evaluated
- [Optional] Azure Open AI model.

##### Evaluators

For running evaluator in the cloud, evaluator `ID` is needed. To get it via code you use [azure-ai-evaluation][azure_ai_evaluation]

```python
# pip install azure-ai-evaluation

from azure.ai.evaluation import RelevanceEvaluator

evaluator_id = RelevanceEvaluator.id
```

##### Data to be evaluated

Evaluation in the cloud supports data in form of `jsonl` file. Data can be uploaded via the helper method `upload_file` on the project client.

```python
# Upload data for evaluation and get dataset id
data_id, _ = project_client.upload_file("<data_file.jsonl>")
```

##### [Optional] Azure OpenAI Model

Azure AI Studio project comes with a default Azure Open AI endpoint which can be easily accessed using following code. This gives you the endpoint details for you Azure OpenAI endpoint. Some of the evaluators need model that supports chat completion.

```python
default_connection = project_client.connections.get_default(connection_type=ConnectionType.AZURE_OPEN_AI)
```

##### Example Remote Evaluation

```python
import os
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.projects.models import Evaluation, Dataset, EvaluatorConfiguration, ConnectionType
from azure.ai.evaluation import F1ScoreEvaluator, RelevanceEvaluator, HateUnfairnessEvaluator


# Create project client
project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
)

# Upload data for evaluation and get dataset id
data_id, _ = project_client.upload_file("<data_file.jsonl>")

deployment_name = "<deployment_name>"
api_version = "<api_version>"

# Create an evaluation
evaluation = Evaluation(
    display_name="Remote Evaluation",
    description="Evaluation of dataset",
    data=Dataset(id=data_id),
    evaluators={
        "f1_score": EvaluatorConfiguration(
            id=F1ScoreEvaluator.id,
        ),
        "relevance": EvaluatorConfiguration(
            id=RelevanceEvaluator.id,
            init_params={
                "model_config": default_connection.to_evaluator_model_config(
                    deployment_name=deployment_name, api_version=api_version
                )
            },
        ),
        "violence": EvaluatorConfiguration(
            id=ViolenceEvaluator.id,
            init_params={"azure_ai_project": project_client.scope},
        ),
    },
)


evaluation_response = project_client.evaluations.create(
    evaluation=evaluation,
)

# Get evaluation
get_evaluation_response = project_client.evaluations.get(evaluation_response.id)

print("----------------------------------------------------------------")
print("Created evaluation, evaluation ID: ", get_evaluation_response.id)
print("Evaluation status: ", get_evaluation_response.status)
if isinstance(get_evaluation_response.properties, dict):
    print("AI Studio URI: ", get_evaluation_response.properties["AiStudioEvaluationUri"])
print("----------------------------------------------------------------")
```

NOTE: For running evaluators locally refer to [Evaluate with the Azure AI Evaluation SDK][evaluators].
-->

### Tracing

You can add an Application Insights Azure resource to your Azure AI Studio project. See the Tracing tab in your studio. If one was enabled, you can get the Application Insights connection string, configure your Agents, and observe the full execution path through Azure Monitor. Typically, you might want to start tracing before you create an Agent.

#### Installation

Make sure to install OpenTelemetry and the Azure SDK tracing plugin via

<!-- TODO: review dependencies -->

```bash
npm install @opentelemetry/api
npm install @opentelemetry/instrumentation
npm install @opentelemetry/sdk-trace-node
npm install @azure/core-tracing
```

You will also need an exporter to send telemetry to your observability backend. You can print traces to the console or use a local viewer such as [Aspire Dashboard](https://learn.microsoft.com/dotnet/aspire/fundamentals/dashboard/standalone?tabs=bash).

<!-- TODO: Update this (?) -->

To connect to Aspire Dashboard or another OpenTelemetry compatible backend, install OTLP exporter:

```bash
pip install opentelemetry-exporter-otlp
```

<!-- TODO: review/revise tracing example -->

#### Tracing example

Here is a code sample to be included above `createAgent`:

<!-- SNIPPET:sample_agents_basics_with_azure_monitor_tracing.enable_tracing -->

```javascript
import { trace } from "@opentelemetry/api";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter"
import {
    ConsoleSpanExporter,
    NodeTracerProvider,
    SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

const tracer = trace.getTracer("Agents Sample", "1.0.0");

const client = AIProjectsClient.fromConnectionString(
  connectionString || "", new DefaultAzureCredential()
);

if (!appInsightsConnectionString) {
  appInsightsConnectionString = await client.telemetry.getConnectionString();
}

if (appInsightsConnectionString) {
  const exporter = new AzureMonitorTraceExporter({
    connectionString: appInsightsConnectionString
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
}

await tracer.startActiveSpan("main", async (span) => {
    client.telemetry.updateSettings({enableContentRecording: true})
...
```

<!-- END SNIPPET -->

## Troubleshooting

### Exceptions

Client methods that make service calls raise an [HttpResponseError](https://learn.microsoft.com/python/api/azure-core/azure.core.exceptions.httpresponseerror) exception for a non-success HTTP status code response from the service. The exception's `status_code` will hold the HTTP response status code (with `reason` showing the friendly name). The exception's `error.message` contains a detailed message that may be helpful in diagnosing the issue:

```python
from azure.core.exceptions import HttpResponseError

...

try:
    result = project_client.connections.list()
except HttpResponseError as e:
    print(f"Status code: {e.status_code} ({e.reason})")
    print(e.message)
```

For example, when you provide wrong credentials:

```text
Status code: 401 (Unauthorized)
Operation returned an invalid status 'Unauthorized'
```

<!-- TODO: Revisit w/ logging sample
### Logging

The client uses the standard [Python logging library](https://docs.python.org/3/library/logging.html). The SDK logs HTTP request and response details, which may be useful in troubleshooting. To log to stdout, add the following:

```python
import sys
import logging

# Acquire the logger for this client library. Use 'azure' to affect both
# 'azure.core` and `azure.ai.inference' libraries.
logger = logging.getLogger("azure")

# Set the desired logging level. logging.INFO or logging.DEBUG are good options.
logger.setLevel(logging.DEBUG)

# Direct logging output to stdout:
handler = logging.StreamHandler(stream=sys.stdout)
# Or direct logging output to a file:
# handler = logging.FileHandler(filename="sample.log")
logger.addHandler(handler)

# Optional: change the default logging format. Here we add a timestamp.
#formatter = logging.Formatter("%(asctime)s:%(levelname)s:%(name)s:%(message)s")
#handler.setFormatter(formatter)
```

By default logs redact the values of URL query strings, the values of some HTTP request and response headers (including `Authorization` which holds the key or token), and the request and response payloads. To create logs without redaction, add `logging_enable = True` to the client constructor:

```python
project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str=os.environ["PROJECT_CONNECTION_STRING"],
    logging_enable = True
)
```

Note that the log level must be set to `logging.DEBUG` (see above code). Logs will be redacted with any other log level.

Be sure to protect non redacted logs to avoid compromising security.

For more information, see [Configure logging in the Azure libraries for Python](https://aka.ms/azsdk/python/logging)
-->

### Reporting issues

To report issues with the client library, or request additional features, please open a GitHub issue [here](https://github.com/Azure/azure-sdk-for-js/issues)

## Next steps

Have a look at the [Samples](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-projects/samples) folder, containing fully runnable Python code for synchronous and asynchronous clients. <!-- TODO: Update link -->

Explore the [AI Starter Template](https://aka.ms/azsdk/azure-ai-projects/python/ai-starter-template). This template creates an Azure AI Studio hub, project and connected resources including Azure OpenAI Service, AI Search and more. It also deploys a simple chat application to Azure Container Apps. <!-- TODO: Update link -->

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

[samples]: TODO <!-- TODO: Update link -->
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[entra_id]: https://learn.microsoft.com/azure/ai-services/authentication?tabs=powershell#authenticate-with-microsoft-entra-id
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_sub]: https://azure.microsoft.com/free/
[evaluators]: https://learn.microsoft.com/azure/ai-studio/how-to/develop/evaluate-sdk
[azure_ai_evaluation]: TODO <!-- TODO: Revisit w/ evaluation -->
[evaluator_library]: https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app#view-and-manage-the-evaluators-in-the-evaluator-library
