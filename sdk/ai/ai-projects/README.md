# Azure AI Projects client library for JavaScript

The AI Projects client library (in preview) is part of the Microsoft Foundry SDK, and provides easy access to
resources in your Microsoft Foundry Project. Use it to:

- **Create and run Agents** using the `.agents` property on the client.
* **Enhance Agents with specialized tools**:
  * Agent Memory Search (Preview)
  * Agent-to-Agent (A2A) (Preview)
  * Azure AI Search
  * Bing Custom Search (Preview)
  * Bing Grounding
  * Browser Automation (Preview)
  * Code Interpreter
  * Computer Use (Preview)
  * File Search
  * Function Tool
  * Image Generation
  * Microsoft Fabric (Preview)
  * Model Context Protocol (MCP)
  * OpenAPI
  * Microsoft SharePoint (Preview)
  * Web Search (Preview)
- **Get an OpenAI client** using the `.getOpenAIClient.` method to run Responses, Conversations, Evals and FineTuning operations with your Agent.
* **Manage memory stores (preview)** for Agent conversations, using the `.memoryStores` operations.
* **Explore additional evaluation tools (some in preview)** to assess the performance of your generative AI application, using the `.evaluationRules`,
`.evaluationTaxonomies`, `.evaluators`, `.insights`, and `.schedules` operations.
* **Run Red Team scans (preview)** to identify risks associated with your generative AI application, using the ".redTeams" operations.
* **Fine tune** AI Models on your data.
- **Enumerate AI Models** deployed to your Foundry Project using the `.deployments` operations.
- **Enumerate connected Azure resources** in your Foundry project using the `.connections` operations.
- **Upload documents and create Datasets** to reference them using the `.datasets` operations.
- **Create and enumerate Search Indexes** using the `.indexes` operations.

The client library uses version `v1` of the Microsoft Foundry [data plane REST APIs][ai_foundry_data_plane_rest_apis].

[Product documentation](https://aka.ms/azsdk/azure-ai-projects-v2/product-doc)
| [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples)
| [Package (npm)](https://www.npmjs.com/package/@azure/ai-projects)
| [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme?view=azure-node-v1)
| [SDK source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects)

## Table of contents

- [Getting started](#getting-started)
  - [Prerequisite](#prerequisite)
  - [Authorization](#authorization)
  - [Install the package](#install-the-package)
- [Key concepts](#key-concepts)
  - [Create and authenticate the client](#create-and-authenticate-the-client)
  - [Preview operation groups and opt-in feature flags](#preview-operation-groups-and-opt-in-feature-flags)
- [Examples](#examples)
  - [Performing Responses operations using OpenAI client](#performing-responses-operations-using-openai-client)
  - [Performing Agent operations](#performing-agent-operations)
  - [Using Agent tools](#using-agent-tools)
    - [Built-in Tools](#built-in-tools)
    - [Connection-Based Tools](#connection-based-tools)
  - [Evaluation operations](#evaluation)
  - [Deployments operations](#deployments-operations)
  - [Connections operations](#connections-operations)
  - [Dataset operations](#dataset-operations)
  - [Files operations](#files-operations)
  - [Indexes operations](#indexes-operations)
  - [fine-tuning operations](#fine-tuning-operations)
- [Tracing](#tracing)
  - [Installation](#installation)
  - [How to enable tracing](#how-to-enable-tracing)
- [Troubleshooting](#troubleshooting)
  - [Exceptions](#exceptions)
  - [Reporting issues](#reporting-issues)
- [Next steps](#next-steps)
- [Contributing](#contributing)

## Getting started

### Prerequisite

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- An [Azure subscription][azure_sub].
- A [project in Microsoft Foundry](https://learn.microsoft.com/azure/ai-studio/how-to/create-projects?tabs=ai-studio).
- The project endpoint URL of the form `https://your-ai-services-account-name.services.ai.azure.com/api/projects/your-project-name`. It can be found in your Microsoft Foundry Project overview page. Below we will assume the environment variable `AZURE_AI_PROJECT_ENDPOINT` was defined to hold this value.

### Authorization

- [Entra ID][entra_id] is needed to authenticate the client. Your application needs an object that implements the [TokenCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/tokencredential) interface. Code samples here use [DefaultAzureCredential][default_azure_credential]. To get that working, you will need:
  - An appropriate role assignment. see [Role-based access control in Microsoft Foundry portal](https://learn.microsoft.com/azure/ai-foundry/concepts/rbac-ai-foundry). Role assigned can be done via the "Access Control (IAM)" tab of your Azure AI Project resource in the Azure portal.
  - [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed.
  - You are logged into your Azure account by running `az login`.
  - Note that if you have multiple Azure subscriptions, the subscription that contains your Azure AI Project resource must be your default subscription. Run `az account list --output table` to list all your subscription and see which one is the default. Run `az account set --subscription "Your Subscription ID or Name"` to change your default subscription.

### Install the package

```bash
npm install @azure/ai-projects dotenv
```

## Key concepts

### Create and authenticate the client with Entra ID

Entra ID is the only authentication method supported at the moment by the client.

To construct an `AIProjectsClient`, the `projectEndpoint` can be fetched from [projectEndpoint][ai_project_client_endpoint]. Below we will assume the environment variable `AZURE_AI_PROJECT_ENDPOINT` was defined to hold this value:

```ts snippet:setup
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
const client = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
```

### Preview operation groups and opt-in feature flags

Some preview operations require an explicit `foundryFeatures` opt-in flag. For example:

```ts snippet:previewflag
await project.agents.createVersion(
  "preview-agent",
  {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant",
  },
  { foundryFeatures: "WorkflowAgents=V1Preview" },
);
for await (const rule of project.evaluationRules.list({
  foundryFeatures: "Evaluations=V1Preview",
})) {
  console.log(rule.id);
}
```

Preview operation groups include `.memoryStores`, `.evaluationTaxonomies`, `.evaluators`, `.insights`, `.schedules`, and `.redTeams`.

## Examples

### Performing Responses operations using OpenAI client

Your Microsoft Foundry project may have one or more AI models deployed. These could be OpenAI models, Microsoft models, or models from other providers. Use the code below to get an authenticated [OpenAI](https://github.com/openai/openai-node?tab=readme-ov-file#microsoft-azure-openai) from the [openai](https://www.npmjs.com/package/openai) package, and execute a chat completions call.

Run the code below. Here we assume `deploymentName` (str) is defined. It's the deployment name of an AI model in your Foundry Project. As shown in the "Models + endpoints" tab, under the "Name" column.

See the "responses" folder in the [package samples][samples] for additional samples, including streaming responses.


```ts snippet:openAI
const openAIClient = await project.getOpenAIClient();
const response = await openAIClient.responses.create({
  model: deploymentName,
  input: "What is the size of France in square miles?",
});
console.log("response = ", JSON.stringify(response, null, 2));
const detailResponse = await openAIClient.responses.create({
  model: deploymentName,
  input: "And what is the capital city?",
  previous_response_id: response.id,
});
console.log("detailed response = ", JSON.stringify(detailResponse, null, 2));
```

### Performing Agent operations

The `.agents` property on the `AIProjectsClient` gives you access to all Agent operations. Agents use an extension of the
OpenAI Responses protocol, so you will likely need to get an `OpenAI` client to do Agent operations, as shown in the example below.

```ts snippet:agents
const openAIClient = await project.getOpenAIClient();
const agent = await project.agents.createVersion("my-agent-basic", {
  kind: "prompt",
  model: deploymentName,
  instructions: "You are a helpful assistant that answers general questions",
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
const conversation = await openAIClient.conversations.create({
  items: [
    { type: "message", role: "user", content: "What is the size of France in square miles?" },
  ],
});
console.log(`Created conversation with initial user message (id: ${conversation.id})`);
// Generate response using the agent
console.log("\nGenerating response...");
const response = await openAIClient.responses.create(
  {
    conversation: conversation.id,
  },
  {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  },
);
console.log(`Response output: ${response.output_text}`);
// Add a second user message to the conversation
console.log("\nAdding a second user message to the conversation...");
await openAIClient.conversations.items.create(conversation.id, {
  items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
});
console.log("Added a second user message to the conversation");
// Generate second response
console.log("\nGenerating second response...");
const response2 = await openAIClient.responses.create(
  {
    conversation: conversation.id,
  },
  {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  },
);
console.log(`Response output: ${response2.output_text}`);
// Clean up
console.log("\nCleaning up resources...");
await openAIClient.conversations.delete(conversation.id);
console.log("Conversation deleted");
await project.agents.deleteVersion(agent.name, agent.version);
console.log("Agent deleted");
```

### Using Agent tools

Agents can be enhanced with specialized tools for various capabilities. Tools are organized by their connection requirements:

#### Built-in Tools

These tools work immediately without requiring external connections.

**Code Interpreter**

Write and run Javascript code in a sandboxed environment, process files and work with diverse data formats. [OpenAI Documentation](https://platform.openai.com/docs/guides/tools-code-interpreter)

```ts snippet:agent-code-interpreter
const openAIClient = await project.getOpenAIClient();
const response = await openAIClient.responses.create({
  model: deploymentName,
  input: "I need to solve the equation 3x + 11 = 14. Can you help me?",
  tools: [{ type: "code_interpreter", container: { type: "auto" } }],
});
console.log(`Response output: ${response.output_text}`);
```

See the full sample code in [agentCodeInterpreter.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/agentCodeInterpreter.ts).

**File Search**

Built-in RAG (Retrieval-Augmented Generation) tool to process and search through documents using vector stores for knowledge retrieval. [OpenAI Documentation](https://platform.openai.com/docs/assistants/tools/file-search)

```ts snippet:agent-file-search
const openAIClient = await project.getOpenAIClient();
const assetFilePath = path.join(
  __dirname,
  "..",
  "samples-dev",
  "agents",
  "assets",
  "product_info.txt",
);
const vectorStore = await openAIClient.vectorStores.create({
  name: "ProductInfoStreamStore",
});
console.log(`Vector store created (id: ${vectorStore.id})`);
// Upload file to vector store
const fileStream = fs.createReadStream(assetFilePath);
const uploadedFile = await openAIClient.vectorStores.files.uploadAndPoll(
  vectorStore.id,
  fileStream,
);
console.log(`File uploaded to vector store (id: ${uploadedFile.id})`);
// Create agent with file search tool
const agent = await project.agents.createVersion("StreamingFileSearchAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a helpful assistant that can search through product information and provide detailed responses. Use the file search tool to find relevant information before answering.",
  tools: [
    {
      type: "file_search",
      vector_store_ids: [vectorStore.id],
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentFileSearchStream.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentFileSearchStream.ts).

**Image Generation**

Generate images based on text prompts with customizable resolution, quality, and style settings:

```ts snippet:agent-image-generation
const agent = await project.agents.createVersion("agent-image-generation", {
  kind: "prompt",
  model: deploymentName,
  instructions: "Generate images based on user prompts",
  tools: [
    {
      type: "image_generation",
      quality: "low",
      size: "1024x1024",
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

After calling `responses.create()`, you can download file using the returned response:

```ts snippet:agent-image-generation-download
import { fileURLToPath } from "url";

const openAIClient = await project.getOpenAIClient();
const agent = await project.agents.createVersion("agent-image-generation", {
  kind: "prompt",
  model: deploymentName,
  instructions: "Generate images based on user prompts",
  tools: [
    {
      type: "image_generation",
      quality: "low",
      size: "1024x1024",
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
const response = await openAIClient.responses.create(
  {
    input: "Generate an image of Microsoft logo.",
  },
  {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  },
);
console.log(`Response created: ${response.id}`);
const imageData = response.output?.filter((output) => output.type === "image_generation_call");
if (imageData && imageData.length > 0 && imageData[0].result) {
  console.log("Downloading generated image...");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filename = "microsoft.png";
  const filePath = path.join(__dirname, filename);
  // Decode base64 and save to file
  const imageBuffer = Buffer.from(imageData[0].result, "base64");
  fs.writeFileSync(filePath, imageBuffer);
  console.log(`Image downloaded and saved to: ${path.resolve(filePath)}`);
} else {
  console.log("No image data found in the response.");
}
```

**Web Search (Preview)**

Perform general web searches to retrieve current information from the internet. [OpenAI Documentation](https://platform.openai.com/docs/guides/tools-web-search)

```ts snippet:agent-web-search
const openAIClient = await project.getOpenAIClient();
// Create Agent with web search tool
const agent = await project.agents.createVersion("agent-web-search", {
  kind: "prompt",
  model: deploymentName,
  instructions: "You are a helpful assistant that can search the web",
  tools: [
    {
      type: "web_search_preview",
      user_location: {
        type: "approximate",
        country: "GB",
        city: "London",
        region: "London",
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
// Create a conversation for the agent interaction
const conversation = await openAIClient.conversations.create();
console.log(`Created conversation (id: ${conversation.id})`);
// Send a query to search the web
console.log("\nSending web search query...");
const response = await openAIClient.responses.create(
  {
    conversation: conversation.id,
    input: "Show me the latest London Underground service updates",
  },
  {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  },
);
console.log(`Response: ${response.output_text}`);
```

See the full sample code in [agentWebSearch.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentWebSearch.ts).

**Computer Use (Preview)**

Enable agents to interact directly with computer systems for task automation and system operations:

```ts snippet:agent-computer-use
const agent = await project.agents.createVersion("ComputerUseAgent", {
  kind: "prompt" as const,
  model: deploymentName,
  instructions: `
You are a computer automation assistant.

Be direct and efficient. When you reach the search results page, read and describe the actual search result titles and descriptions you can see.
    `.trim(),
  tools: [
    {
      type: "computer_use_preview",
      display_width: 1026,
      display_height: 769,
      environment: "windows" as const,
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

*After calling `responses.create()`, process the response in an interaction loop. Handle `computer_call` output items and provide screenshots as `computer_call_output` with `computer_screenshot` type to continue the interaction.*

See the full sample code in [agentComputerUse.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentComputerUse.ts).

**Model Context Protocol (MCP)**

Integrate MCP servers to extend agent capabilities with standardized tools and resources. [OpenAI Documentation](https://platform.openai.com/docs/guides/tools-connectors-mcp)

```ts snippet:agent-mcp
const openAIClient = await project.getOpenAIClient();
const agent = await project.agents.createVersion("agent-mcp", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
  tools: [
    {
      type: "mcp",
      server_label: "api-specs",
      server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
      require_approval: "always",
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
// Create a conversation thread to maintain context across multiple interactions
console.log("\nCreating conversation...");
const conversation = await openAIClient.conversations.create();
console.log(`Created conversation (id: ${conversation.id})`);
// Send initial request that will trigger the MCP tool to access Azure REST API specs
// This will generate an approval request since requireApproval="always"
console.log("\nSending request that will trigger MCP approval...");
const response = await openAIClient.responses.create(
  {
    conversation: conversation.id,
    input: "Please summarize the Azure REST API specifications Readme",
  },
  {
    body: { agent: { name: agent.name, type: "agent_reference" } },
  },
);
```

*After calling `responses.create()`, check for `mcp_approval_request` items in the response output. Send back `McpApprovalResponse` with your approval decision to allow the agent to continue its work.*

See the full sample code in [agentMcp.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentMcp.ts).

**OpenAPI**

Call external APIs defined by OpenAPI specifications without additional client-side code. [OpenAI Documentation](https://platform.openai.com/docs/guides/tools-openapi)

```ts snippet:agent-openapi
const weatherSpecPath = path.resolve(__dirname, "../assets", "weather_openapi.json");
const agent = await project.agents.createVersion("MyOpenApiAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a helpful assistant that can call external APIs defined by OpenAPI specs to answer user questions.",
  tools: [
    {
      type: "openapi",
      openapi: {
        name: "get_weather",
        description: "Retrieve weather information for a location using wttr.in",
        spec: weatherSpecPath,
        auth: { type: "anonymous" },
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentOpenApi.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentOpenApi.ts).

**Function Tool**

Define custom functions that allow agents to interact with external APIs, databases, or application logic. [OpenAI Documentation](https://platform.openai.com/docs/guides/function-calling)

```ts snippet:agent-function-tool
/**
 * Define a function tool for the model to use
 */
const funcTool = {
  type: "function" as const,
  function: {
    name: "get_horoscope",
    description: "Get today's horoscope for an astrological sign.",
    strict: true,
    parameters: {
      type: "object",
      properties: {
        sign: {
          type: "string",
          description: "An astrological sign like Taurus or Aquarius",
        },
      },
      required: ["sign"],
      additional_properties: false,
    },
  },
};
const agent = await project.agents.createVersion("function-tool-agent", {
  kind: "prompt",
  model: deploymentName,
  instructions: "You are a helpful assistant that can use function tools.",
  tools: [funcTool],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

*After calling `responses.create()`, process `function_call` items from response output, execute your function logic with the provided arguments, and send back `FunctionCallOutput` with the results.*

See the full sample code in [agentFunctionTool.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/agentFunctionTool.ts).

* **Memory Search Tool (Preview)**

The Memory Store Tool adds Memory to an Agent, allowing the Agent's AI model to search for past information related to the current user prompt.

The `embeddingModelDeployment` is the name of the model used to create vector embeddings for storing and searching memories.

```ts snippet:agent-memory-search
const memoryStoreName = "AgentMemoryStore";
const embeddingModelDeployment =
  process.env["AZURE_AI_EMBEDDING_MODEL_DEPLOYMENT_NAME"] || "<embedding model>";
const scope = "user_123";
const memoryStore = await project.beta.memoryStores.create(
  memoryStoreName,
  {
    kind: "default",
    chat_model: deploymentName,
    embedding_model: embeddingModelDeployment,
    options: {
      user_profile_enabled: true,
      chat_summary_enabled: true,
    },
  },
  {
    description: "Memory store for agent conversations",
  },
);
console.log(
  `Created memory store: ${memoryStore.name} (${memoryStore.id}) using chat model '${deploymentName}'`,
);
// Create an agent that will use the Memory Search tool
const agent = await project.agents.createVersion("MemorySearchAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a helpful assistant that remembers user preferences using the memory search tool.",
  tools: [
    {
      type: "memory_search_preview",
      memory_store_name: memoryStore.name,
      scope,
      update_delay: 1, // wait briefly after conversation inactivity before updating memories
    },
  ],
});
```

See the full sample code in [agentMemorySearch.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentMemorySearch.ts).

#### Connection-Based Tools

These tools require configuring connections in your AI Foundry project and use `projectConnectionId`.

**Azure AI Search**

Integrate with Azure AI Search indexes for powerful knowledge retrieval and semantic search capabilities:

```ts snippet:agent-azure-ai-search
const aiSearchConnectionId = process.env["AI_SEARCH_CONNECTION_ID"] || "";
const aiSearchIndexName = process.env["AI_SEARCH_INDEX_NAME"] || "";
const agent = await project.agents.createVersion("MyAISearchAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a helpful assistant. You must always provide citations for answers using the tool and render them as: `[message_idx:search_idx†source]`.",
  tools: [
    {
      type: "azure_ai_search",
      azure_ai_search: {
        indexes: [
          {
            project_connection_id: aiSearchConnectionId,
            index_name: aiSearchIndexName,
            query_type: "simple",
          },
        ],
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentAiSearch.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentAiSearch.ts).

**Bing Grounding**

Ground agent responses with real-time web search results from Bing to provide up-to-date information:

```ts snippet:agent-bing-grounding
const bingProjectConnectionId = process.env["BING_GROUNDING_CONNECTION_ID"] || "";
const agent = await project.agents.createVersion("MyBingGroundingAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions: "You are a helpful assistant.",
  tools: [
    {
      type: "bing_grounding",
      bing_grounding: {
        search_configurations: [
          {
            project_connection_id: bingProjectConnectionId,
          },
        ],
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentBingGrounding.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentBingGrounding.ts).

**Bing Custom Search (Preview)**

Use custom-configured Bing search instances for domain-specific or filtered web search results:
```ts snippet:agent-bing-custom-search
const bingCustomSearchProjectConnectionId = process.env["BING_CUSTOM_SEARCH_CONNECTION_ID"] || "";
const bingCustomSearchInstanceName = process.env["BING_CUSTOM_SEARCH_INSTANCE_NAME"] || "";
const agent = await project.agents.createVersion("MyAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a helpful agent that can use Bing Custom Search tools to assist users. Use the available Bing Custom Search tools to answer questions and perform tasks.",
  tools: [
    {
      type: "bing_custom_search_preview",
      bing_custom_search_preview: {
        search_configurations: [
          {
            project_connection_id: bingCustomSearchProjectConnectionId,
            instance_name: bingCustomSearchInstanceName,
          },
        ],
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentBingCustomSearch.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentBingCustomSearch.ts).

**Microsoft Fabric (Preview)**

Connect to and query Microsoft Fabric:

```ts snippet:agent-microsoft-fabric
const fabricProjectConnectionId = process.env["FABRIC_PROJECT_CONNECTION_ID"] || "";
const agent = await project.agents.createVersion("MyFabricAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions: "You are a helpful assistant.",
  tools: [
    {
      type: "fabric_dataagent_preview",
      fabric_dataagent_preview: {
        project_connections: [
          {
            project_connection_id: fabricProjectConnectionId,
          },
        ],
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentFabric.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentFabric.ts).

**Microsoft SharePoint (Preview)**

Access and search SharePoint documents, lists, and sites for enterprise knowledge integration:

```ts snippet:agent-sharepoint
const sharepointProjectConnectionId = process.env["SHAREPOINT_PROJECT_CONNECTION_ID"] || "";
const agent = await project.agents.createVersion("MyAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a helpful agent that can use SharePoint tools to assist users. Use the available SharePoint tools to answer questions and perform tasks.",
  // Define SharePoint tool that searches SharePoint content
  tools: [
    {
      type: "sharepoint_grounding_preview",
      sharepoint_grounding_preview: {
        project_connections: [
          {
            project_connection_id: sharepointProjectConnectionId,
          },
        ],
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentSharepoint.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentSharepoint.ts).

**Browser Automation (Preview)**

Automate browser interactions for web scraping, testing, and interaction with web applications:

```ts snippet:agent-browser-automation
const browserAutomationProjectConnectionId = process.env["BROWSER_AUTOMATION_CONNECTION_ID"] || "";
const agent = await project.agents.createVersion("MyAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions: `You are an Agent helping with browser automation tasks.
              You can answer questions, provide information, and assist with various tasks
              related to web browsing using the Browser Automation tool available to you.`,
  // Define Browser Automation tool
  tools: [
    {
      type: "browser_automation_preview",
      browser_automation_preview: {
        connection: {
          project_connection_id: browserAutomationProjectConnectionId,
        },
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentBrowserAutomation.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentBrowserAutomation.ts).

**MCP with Project Connection**

MCP integration using project-specific connections for accessing connected MCP servers:

```ts snippet:agent-mcp-connection
const mcpProjectConnectionId = process.env["MCP_PROJECT_CONNECTION_ID"] || "";
const agent = await project.agents.createVersion("agent-mcp-connection-auth", {
  kind: "prompt",
  model: deploymentName,
  instructions: "Use MCP tools as needed",
  tools: [
    {
      type: "mcp",
      server_label: "api-specs",
      server_url: "https://api.githubcopilot.com/mcp",
      require_approval: "always",
      project_connection_id: mcpProjectConnectionId,
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentMcpConnectionAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentMcpConnectionAuth.ts).

**Agent-to-Agent (A2A) (Preview)**

Enable multi-agent collaboration where agents can communicate and delegate tasks to other specialized agents:

```ts snippet:agent-a2a
const a2aProjectConnectionId = process.env["A2A_PROJECT_CONNECTION_ID"] || "";
const agent = await project.agents.createVersion("MyA2AAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions: "You are a helpful assistant.",
  // Define A2A tool for agent-to-agent communication
  tools: [
    {
      type: "a2a_preview",
      project_connection_id: a2aProjectConnectionId,
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentAgentToAgent.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentAgentToAgent.ts).

**OpenAPI with Project Connection**

Call external APIs defined by OpenAPI specifications using project connection authentication:

```ts snippet:agent-openapi-connection
const tripAdvisorProjectConnectionId = process.env["TRIPADVISOR_PROJECT_CONNECTION_ID"] || "";
function loadOpenApiSpec(specPath: string): unknown {
  if (!fs.existsSync(specPath)) {
    throw new Error(`OpenAPI specification not found at: ${specPath}`);
  }
  try {
    const data = fs.readFileSync(specPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Failed to read or parse OpenAPI specification at ${specPath}: ${error}`);
  }
}
const tripAdvisorSpecPath = path.resolve(__dirname, "../assets", "tripadvisor_openapi.json");
const tripAdvisorSpec = loadOpenApiSpec(tripAdvisorSpecPath);
const agent = await project.agents.createVersion("MyOpenApiConnectionAgent", {
  kind: "prompt",
  model: deploymentName,
  instructions:
    "You are a travel assistant that consults the TripAdvisor Content API via project connection to answer user questions about locations.",
  tools: [
    {
      type: "openapi",
      openapi: {
        name: "get_tripadvisor_location_details",
        description:
          "Fetch TripAdvisor location details, reviews, or photos using the Content API via project connection auth.",
        spec: tripAdvisorSpec,
        auth: {
          type: "project_connection",
          security_scheme: {
            project_connection_id: tripAdvisorProjectConnectionId,
          },
        },
      },
    },
  ],
});
console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
```

See the full sample code in [agentOpenApiConnectionAuth.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/agents/tools/agentOpenApiConnectionAuth.ts).

For complete working examples of all tools, see the [samples-dev directory](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples-dev).

### Evaluation

Evaluation in Azure AI Project client library provides quantitative, AI-assisted quality and safety metrics to asses performance and Evaluate LLM Models, GenAI Application and Agents. Metrics are defined as evaluators. Built-in or custom evaluators can provide comprehensive evaluation insights.

The code below shows some evaluation operations. Full list of sample can be found under "evaluations" folder in the [package samples][samples]


```ts snippet:evaluations
const openAIClient = await project.getOpenAIClient();
const dataSourceConfig = {
  type: "custom" as const,
  item_schema: {
    type: "object",
    properties: { query: { type: "string" } },
    required: ["query"],
  },
  include_sample_schema: true,
};
const evalObject = await openAIClient.evals.create({
  name: "Agent Evaluation",
  data_source_config: dataSourceConfig,
  testing_criteria: [
    {
      type: "azure_ai_evaluator",
      name: "violence_detection",
      evaluator_name: "builtin.violence",
      data_mapping: { query: "{{item.query}}", response: "{{item.response}}" },
    } as any,
  ],
});
console.log(`Evaluation created (id: ${evalObject.id}, name: ${evalObject.name})`);
```

See the full sample code in [agentEvaluation.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/evaluations/agentEvaluation.ts).

### Deployments operations

The code below shows some Deployments operations, which allow you to enumerate the AI models deployed to your Microsoft Foundry Projects. These models can be seen in the "Models + endpoints" tab in your Microsoft Foundry Project. Full samples can be found under the "deployment" folder in the [package samples][samples].

```ts snippet:deployments
import { ModelDeployment } from "@azure/ai-projects";

const modelPublisher = process.env["MODEL_PUBLISHER"] || "<model publisher>";
console.log("List all deployments:");
const deployments: ModelDeployment[] = [];
const properties: Array<Record<string, string>> = [];

for await (const deployment of project.deployments.list()) {
  // Check if this is a ModelDeployment (has the required properties)
  if (
    deployment.type === "ModelDeployment" &&
    "modelName" in deployment &&
    "modelPublisher" in deployment &&
    "modelVersion" in deployment
  ) {
    deployments.push(deployment);
    properties.push({
      name: deployment.name,
      modelPublisher: deployment.modelPublisher,
      modelName: deployment.modelName,
    });
  }
}
console.log(`Retrieved deployments: ${JSON.stringify(properties, null, 2)}`);

// List all deployments by a specific model publisher (assuming we have one from the list)
console.log(`List all deployments by the model publisher '${modelPublisher}':`);
const filteredDeployments: ModelDeployment[] = [];
for await (const deployment of project.deployments.list({
  modelPublisher,
})) {
  // Check if this is a ModelDeployment
  if (
    deployment.type === "ModelDeployment" &&
    "modelName" in deployment &&
    "modelPublisher" in deployment &&
    "modelVersion" in deployment
  ) {
    filteredDeployments.push(deployment);
  }
}
console.log(
  `Retrieved ${filteredDeployments.length} deployments from model publisher '${modelPublisher}'`,
);

// Get a single deployment by name
if (deployments.length > 0) {
  const deploymentName = deployments[0].name;
  console.log(`Get a single deployment named '${deploymentName}':`);
  const singleDeployment = await project.deployments.get(deploymentName);
  console.log(`Retrieved deployment: ${JSON.stringify(singleDeployment, null, 2)}`);
}
```

### Connections operations

The code below shows some Connection operations, which allow you to enumerate the Azure Resources connected to your Microsoft Foundry Projects. These connections can be seen in the "Management Center", in the "Connected resources" tab in your Microsoft Foundry Project. Full samples can be found under the "connections" folder in the [package samples][samples].

```ts snippet:connections
import { Connection } from "@azure/ai-projects";

// List the details of all the connections
const connections: Connection[] = [];
const connectionNames: string[] = [];
for await (const connection of project.connections.list()) {
  connections.push(connection);
  connectionNames.push(connection.name);
}
console.log(`Retrieved connections: ${connectionNames}`);

// Get the details of a connection, without credentials
const connectionName = connections[0].name;
const connection = await project.connections.get(connectionName);
console.log(`Retrieved connection ${JSON.stringify(connection, null, 2)}`);

const connectionWithCredentials = await project.connections.getWithCredentials(connectionName);
console.log(
  `Retrieved connection with credentials ${JSON.stringify(connectionWithCredentials, null, 2)}`,
);

// List all connections of a specific type
const azureAIConnections: Connection[] = [];
for await (const azureOpenAIConnection of project.connections.list({
  connectionType: "AzureOpenAI",
  defaultConnection: true,
})) {
  azureAIConnections.push(azureOpenAIConnection);
}
console.log(`Retrieved ${azureAIConnections.length} Azure OpenAI connections`);

// Get the details of a default connection
const defaultConnection = await project.connections.getDefault("AzureOpenAI", true);
console.log(`Retrieved default connection ${JSON.stringify(defaultConnection, null, 2)}`);
```

### Dataset operations

The code below shows some Dataset operations. Full samples can be found under the "datasets"
folder in the [package samples][samples].

```ts snippet:datasets
import { DatasetVersionUnion } from "@azure/ai-projects";

const VERSION1 = "1.0";
const VERSION2 = "2.0";
const VERSION3 = "3.0";

// sample files to use in the demonstration
const sampleFolder = "sample_folder";
// Create a unique dataset name for this sample run
const datasetName = `sample-dataset-basic`;
console.log("Upload a single file and create a new Dataset to reference the file.");
console.log("Here we explicitly specify the dataset version.");

const dataset1 = await project.datasets.uploadFile(
  datasetName,
  VERSION1,
  path.join(__dirname, sampleFolder, "sample_file1.txt"),
);
console.log("Dataset1 created:", JSON.stringify(dataset1, null, 2));

const credential = project.datasets.getCredentials(dataset1.name, dataset1.version, {});
console.log("Credential for the dataset:", credential);
console.log(
  "Upload all files in a folder (including subfolders) to the existing Dataset to reference the folder.",
);
console.log("Here again we explicitly specify a new dataset version");
const dataset2 = await project.datasets.uploadFolder(
  datasetName,
  VERSION2,
  path.join(__dirname, sampleFolder),
);
console.log("Dataset2 created:", JSON.stringify(dataset2, null, 2));
console.log(
  "Upload a single file to the existing dataset, while letting the service increment the version",
);
const dataset3 = await project.datasets.uploadFile(
  datasetName,
  VERSION3,
  path.join(__dirname, sampleFolder, "sample_file2.txt"),
);
console.log("Dataset3 created:", JSON.stringify(dataset3, null, 2));

console.log("Get an existing Dataset version `1`:");
const datasetVersion1 = await project.datasets.get(datasetName, VERSION1);
console.log("Dataset version 1:", JSON.stringify(datasetVersion1, null, 2));
console.log(`Listing all versions of the Dataset named '${datasetName}':`);
const datasetVersions = project.datasets.listVersions(datasetName);
for await (const version of datasetVersions) {
  console.log("List versions:", version);
}
console.log("List latest versions of all Datasets:");
const latestDatasets = project.datasets.list();
for await (const dataset of latestDatasets) {
  console.log("List datasets:", dataset);
}
// List the details of all the datasets
const datasets = project.datasets.listVersions(datasetName);
const allDatasets: DatasetVersionUnion[] = [];
for await (const dataset of datasets) {
  allDatasets.push(dataset);
}
console.log(`Retrieved ${allDatasets.length} datasets`);
console.log("Delete all Datasets created above:");
await project.datasets.delete(datasetName, VERSION1);
await project.datasets.delete(datasetName, VERSION2);
await project.datasets.delete(datasetName, dataset3.version);
console.log("All specified Datasets have been deleted.");
```

### Files operations

The code below shows some Files operations using the OpenAI client, which allow you to upload, retrieve, list, and delete files. These operations are useful for working with files that can be used for fine-tuning and other AI model operations. Full samples can be found under the "files" folder in the [package samples][samples].

```ts snippet:files
const openAIClient = await project.getOpenAIClient();
console.log("Uploading file");
const created = await openAIClient.files.create({
  file: fs.createReadStream(filePath),
  purpose: "fine-tune",
});
console.log(`Uploaded file with ID: ${created.id}`);
const uploadedFile = await openAIClient.files.retrieve(created.id);
console.log("Processed file metadata:\n", JSON.stringify(uploadedFile, null, 2));
console.log(`Retrieving file content with ID: ${uploadedFile.id}`);
const contentResponse = await openAIClient.files.content(uploadedFile.id);
const buf = Buffer.from(await contentResponse.arrayBuffer());
console.log(buf.toString("utf-8"));
// 4) List all files
console.log("Listing all files:");
const filesList = await openAIClient.files.list();
for (const f of filesList.data ?? []) {
  console.log(JSON.stringify(f));
}
// 5) Delete the file
console.log(`Deleting file with ID: ${uploadedFile.id}`);
const deleted = await openAIClient.files.delete(uploadedFile.id);
console.log(
  `Successfully deleted file: ${deleted?.id || uploadedFile.id}, deleted=${String(deleted?.deleted ?? true)}`,
);
```

### Indexes operations

The code below shows some Indexes operations. Full samples can be found under the "indexes"
folder in the [package samples][samples].

```ts snippet:indexes
import { AzureAISearchIndex } from "@azure/ai-projects";

const indexName = "sample-index";
const version = "1";
const azureAIConnectionConfig: AzureAISearchIndex = {
  name: indexName,
  type: "AzureSearch",
  version,
  indexName,
  connectionName: "sample-connection",
};

// Create a new Index
const newIndex = await project.indexes.createOrUpdate(indexName, version, azureAIConnectionConfig);
console.log("Created a new Index:", newIndex);
console.log(`Get an existing Index version '${version}':`);
const index = await project.indexes.get(indexName, version);
console.log(index);
console.log(`Listing all versions of the Index named '${indexName}':`);
const indexVersions = project.indexes.listVersions(indexName);
for await (const indexVersion of indexVersions) {
  console.log(indexVersion);
}
console.log("List all Indexes:");
const allIndexes = project.indexes.list();
for await (const i of allIndexes) {
  console.log("Index:", i);
}
console.log("Delete the Index versions created above:");
await project.indexes.delete(indexName, version);
```

### Fine-tuning operations

The code below shows how to create fine-tuning jobs using the OpenAI client. These operations support various fine-tuning techniques like Supervised Fine-Tuning (SFT), Reinforcement Fine-Tuning (RFT), and Direct Performance Optimization (DPO). Full samples can be found under the "finetuning" folder in the [package samples][samples].

```ts snippet:finetuning
import { JobCreateParams } from "openai/resources/fine-tuning/jobs";

const trainingFilePath = "training_data_path.jsonl";
const validationFilePath = "validation_data_path.jsonl";
const openAIClient = await project.getOpenAIClient();
// 1) Create the training and validation files
const trainingFile = await openAIClient.files.create({
  file: fs.createReadStream(trainingFilePath),
  purpose: "fine-tune",
});
console.log(`Uploaded file with ID: ${trainingFile.id}`);
const validationFile = await openAIClient.files.create({
  file: fs.createReadStream(validationFilePath),
  purpose: "fine-tune",
});
console.log(`Uploaded file with ID: ${validationFile.id}`);
// 2) Wait for the files to be processed
await openAIClient.files.waitForProcessing(trainingFile.id);
await openAIClient.files.waitForProcessing(validationFile.id);
console.log("Files processed.");
// 3) Create a supervised fine-tuning job
const fineTuningJob = await openAIClient.fineTuning.jobs.create({} as JobCreateParams, {
  body: {
    trainingType: "Standard",
    training_file: trainingFile.id,
    validation_file: validationFile.id,
    model: deploymentName,
    method: {
      type: "supervised",
      supervised: {
        hyperparameters: {
          n_epochs: 3,
          batch_size: 1,
          learning_rate_multiplier: 1.0,
        },
      },
    },
  },
});
console.log("Created fine-tuning job:\n", JSON.stringify(fineTuningJob));
```

## Tracing

**Note:** Tracing functionality is in preliminary preview and is subject to change. Spans, attributes, and events may be modified in future versions.

You can add an Application Insights Azure resource to your Microsoft Foundry project. See the Tracing tab in your Microsoft Foundry project. If one was enabled, you can get the Application Insights connection string, configure your AI Projects client, and observe the full execution path through Azure Monitor. Typically, you might want to start tracing before you create a client or Agent.

### Installation

```bash
npm install @azure/monitor-opentelemetry@^1.14.2 @opentelemetry/api@^1.9.0
```

### How to enable tracing

Here is a code sample that shows how to enable Azure Monitor tracing:

```ts snippet:tracing
import { AzureMonitorOpenTelemetryOptions, useAzureMonitor } from "@azure/monitor-opentelemetry";

const TELEMETRY_CONNECTION_STRING = process.env["TELEMETRY_CONNECTION_STRING"];
const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterOptions: {
    connectionString: TELEMETRY_CONNECTION_STRING,
  },
};
useAzureMonitor(options);
```

See the full sample code in [remoteTelemetry.ts](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples-dev/telemetry/remoteTelemetry.ts).

## Troubleshooting

### Exceptions

Client methods that make service calls raise an [RestError](https://learn.microsoft.com/javascript/api/%40azure/core-rest-pipeline/resterror) for a non-success HTTP status code response from the service. The exception's `code` will hold the HTTP response status code. The exception's `error.message` contains a detailed message that may be helpful in diagnosing the issue:

```ts snippet:exceptions
import { isRestError } from "@azure/core-rest-pipeline";

try {
  const result = await project.connections.list();
} catch (e) {
  if (isRestError(e)) {
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
[entra_id]: https://learn.microsoft.com/azure/ai-foundry/foundry-models/how-to/configure-entra-id?tabs=javascript&pivots=ai-foundry-portal
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[azure_sub]: https://azure.microsoft.com/free/
[evaluators]: https://learn.microsoft.com/azure/ai-studio/how-to/develop/evaluate-sdk
[evaluator_library]: https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app#view-and-manage-the-evaluators-in-the-evaluator-library
[ai_foundry_data_plane_rest_apis]: https://learn.microsoft.com/rest/api/aifoundry/aiprojects/operation-groups?view=rest-aifoundry-aiprojects-v1
[ai_project_client_endpoint]: https://learn.microsoft.com/azure/ai-foundry/how-to/develop/sdk-overview?tabs=sync&pivots=programming-language-javascript
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/samples
