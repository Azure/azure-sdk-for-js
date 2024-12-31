# Azure AI Projects client library for JavaScript

Use the AI Projects client library (in preview) to:

- **Enumerate connections** in your Azure AI Foundry project and get connection properties.
  For example, get the inference endpoint URL and credentials associated with your Azure OpenAI connection.
- **Develop Agents using the Azure AI Agent Service**, leveraging an extensive ecosystem of models, tools, and capabilities from OpenAI, Microsoft, and other LLM providers. The Azure AI Agent Service enables the building of Agents for a wide range of generative AI use cases. The package is currently in private preview.
- **Enable OpenTelemetry tracing**.

[Product documentation](https://aka.ms/azsdk/azure-ai-projects/product-doc)

| [Samples][samples]
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
npm install @azure/ai-projects
```

## Key concepts

### Create and authenticate the client

The class factory method `fromConnectionString` is used to construct the client. To construct a client:

```js snippet:setup
import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<connectionString>";
const client = AIProjectsClient.fromConnectionString(
  connectionString,
  new DefaultAzureCredential(),
```

## Examples

### Enumerate connections

Your Azure AI Foundry project has a "Management center". When you enter it, you will see a tab named "Connected resources" under your project. The `.connections` operations on the client allow you to enumerate the connections and get connection properties. Connection properties include the resource URL and authentication credentials, among other things.

Below are code examples of the connection operations. Full samples can be found under the "connections" folder in the [package samples][samples].

#### Get properties of all connections

To list the properties of all the connections in the Azure AI Foundry project:

```js snippet:listConnections
const connections = await client.connections.listConnections();
for (const connection of connections) {
  console.log(connection);
```

#### Get properties of all connections of a particular type

To list the properties of connections of a certain type (here Azure OpenAI):

```js snippet:filterConnections
const connections = await client.connections.listConnections({ category: "AzureOpenAI" });
for (const connection of connections) {
  console.log(connection);
```

#### Get properties of a connection by its connection name

To get the connection properties of a connection named `connectionName`:

```js snippet:getConnection
const connection = await client.connections.getConnection("connectionName");
```

To get the connection properties with its authentication credentials:

```js snippet:getConnectionWithSecrets
const connection = await client.connections.getConnectionWithSecrets("connectionName");
```

### Agents (Preview)

Agents in the Azure AI Projects client library are designed to facilitate various interactions and operations within your AI projects. They serve as the core components that manage and execute tasks, leveraging different tools and resources to achieve specific goals. The following steps outline the typical sequence for interacting with Agents. See the "agents" folder in the [package samples][samples] for additional Agent samples.

Agents are actively being developed. A sign-up form for private preview is coming soon.

#### Create Agent

Here is an example of how to create an Agent:

```js snippet:createAgent
const agent = await client.agents.createAgent("gpt-4o", {
  name: "my-agent",
  instructions: "You are a helpful assistant",
```

To allow Agents to access your resources or custom functions, you need tools. You can pass tools to `createAgent` through the `tools` and `toolResources` arguments.

You can use `ToolSet` to do this:

```js snippet:toolSet
import { ToolSet } from "@azure/ai-projects";

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
```

#### Create Agent with File Search

To perform file search by an Agent, we first need to upload a file, create a vector store, and associate the file to the vector store. Here is an example:

```js snippet:fileSearch
```

#### Create Agent with Code Interpreter

Here is an example to upload a file and use it for code interpreter by an Agent:

```js snippet:codeInterpreter
```

#### Create Agent with Bing Grounding

To enable your Agent to perform search through Bing search API, you use `ToolUtility.createConnectionTool()` along with a connection.

Here is an example:

```js snippet:bingGrounding
```

#### Create Agent with Azure AI Search

Azure AI Search is an enterprise search system for high-performance applications. It integrates with Azure OpenAI Service and Azure Machine Learning, offering advanced search technologies like vector search and full-text search. Ideal for knowledge base insights, information discovery, and automation

Here is an example to integrate Azure AI Search:

```js snippet:AISearch
```

#### Create Agent with Function Call

You can enhance your Agents by defining callback functions as function tools. These can be provided to `createAgent` via the combination of `tools` and `toolResources`. Only the function definitions and descriptions are provided to `createAgent`, without the implementations. The `Run` or `event handler of stream` will raise a `requires_action` status based on the function definitions. Your code must handle this status and call the appropriate functions.

Here is an example:

```js snippet:functionTools
```

#### Create Thread

For each session or conversation, a thread is required. Here is an example:

```js snippet:createThread
```

#### Create Thread with Tool Resource

In some scenarios, you might need to assign specific resources to individual threads. To achieve this, you provide the `toolResources` argument to `createThread`. In the following example, you create a vector store and upload a file, enable an Agent for file search using the `tools` argument, and then associate the file with the thread using the `toolResources` argument.

```js snippet:threadWithTool
```

#### Create Message

To create a message for assistant to process, you pass `user` as `role` and a question as `content`:

```js snippet:createMessage
```

#### Create Message with File Search Attachment

To attach a file to a message for content searching, you use `ToolUtility.createFileSearchTool()` and the `attachments` argument:

```js snippet:messageWithFileSearch
```

#### Create Message with Code Interpreter Attachment

To attach a file to a message for data analysis, you use `ToolUtility.createCodeInterpreterTool()` and the `attachment` argument.

Here is an example:

```js snippet:messageWithCodeInterpreter
```

#### Create Run, Run_and_Process, or Stream

Here is an example of `createRun` and poll until the run is completed:

```js snippet:createRun
```

To have the SDK poll on your behalf, use the `createThreadAndRun` method.

Here is an example:

```js snippet:createThreadAndRun
```

With streaming, polling also need not be considered.

Here is an example:

```js snippet:createRunStream
```

Event handling can be done as follows:

```js snippet:eventHandling
```

#### Retrieve Message

To retrieve messages from agents, use the following example:

```js snippet:listMessages
```

### Retrieve File

Files uploaded by Agents cannot be retrieved back. If your use case needs to access the file content uploaded by the Agents, you are advised to keep an additional copy accessible by your application. However, files generated by Agents are retrievable by `getFileContent`.

Here is an example retrieving file ids from messages:

```js snippet:retrieveFile
```

#### Teardown

To remove resources after completing tasks, use the following functions:

```js snippet:teardown
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

```js snippet:tracing
```

## Troubleshooting

### Exceptions

Client methods that make service calls raise an [RestError](https://learn.microsoft.com/javascript/api/%40azure/core-rest-pipeline/resterror) for a non-success HTTP status code response from the service. The exception's `code` will hold the HTTP response status code. The exception's `error.message` contains a detailed message that may be helpful in diagnosing the issue:

```js snippet:exceptions
```

For example, when you provide wrong credentials:

```text
Status code: 401 (Unauthorized)
Operation returned an invalid status 'Unauthorized'
```

### Reporting issues

To report issues with the client library, or request additional features, please open a GitHub issue [here](https://github.com/Azure/azure-sdk-for-js/issues)

## Next steps

Have a look at the [Samples](samples) folder, containing fully runnable code.

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

[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples
[code_of_conduct]: https://opensource.microsoft.com/codeofconduct/
[entra_id]: https://learn.microsoft.com/azure/ai-services/authentication?tabs=powershell#authenticate-with-microsoft-entra-id
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_sub]: https://azure.microsoft.com/free/
[evaluators]: https://learn.microsoft.com/azure/ai-studio/how-to/develop/evaluate-sdk
[evaluator_library]: https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app#view-and-manage-the-evaluators-in-the-evaluator-library
