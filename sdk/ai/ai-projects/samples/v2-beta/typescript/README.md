---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: ai-projects-typescript-beta
---

# Azure AI Projects client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure AI Projects in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agents/agentBasic.ts][agents_agentbasic]                                     | This sample demonstrates how to create an agent, create a conversation, generate responses using the agent, and clean up resources.                                                                                                                                                              |
| [agents/agentCodeInterpreter.ts][agents_agentcodeinterpreter]                 | This sample demonstrates how to create a response with code interpreter tool to solve mathematical equations.                                                                                                                                                                                    |
| [agents/agentFileSearch.ts][agents_agentfilesearch]                           | This sample demonstrates how to create an agent with file search capabilities, upload documents to a vector store, and stream responses that include file search results.                                                                                                                        |
| [agents/tools/agentAgentToAgent.ts][agents_tools_agentagenttoagent]           | This sample demonstrates how to create an agent with A2A tool capabilities, enable inter-agent communication, and process streaming responses.                                                                                                                                                   |
| [agents/tools/agentAiSearch.ts][agents_tools_agentaisearch]                   | This sample demonstrates how to create an agent with Azure AI Search tool capabilities, send queries to search indexed content, and process streaming responses with citations.                                                                                                                  |
| [agents/tools/agentBingCustomSearch.ts][agents_tools_agentbingcustomsearch]   | This sample demonstrates how to create an agent with Bing Custom Search tool capabilities, search custom search instances, and process streaming responses with citations.                                                                                                                       |
| [agents/tools/agentBingGrounding.ts][agents_tools_agentbinggrounding]         | This sample demonstrates how to create an agent with Bing grounding tool capabilities, search the web for current information, and process streaming responses with source citations.                                                                                                            |
| [agents/tools/agentBrowserAutomation.ts][agents_tools_agentbrowserautomation] | This sample demonstrates how to create an agent with Browser Automation tool, perform web browsing tasks, and process streaming responses with browser automation events.                                                                                                                        |
| [agents/tools/agentComputerUse.ts][agents_tools_agentcomputeruse]             | This sample demonstrates how to create a Computer Use Agent that can interact with computer interfaces through simulated actions and screenshots.                                                                                                                                                |
| [agents/tools/agentFabric.ts][agents_tools_agentfabric]                       | This sample demonstrates how to create an agent with Microsoft Fabric tool capabilities, send queries to Fabric data sources, and clean up resources.                                                                                                                                            |
| [agents/tools/agentFileSearch.ts][agents_tools_agentfilesearch]               | This sample demonstrates how to create a vector store, upload a file, create an agent with file search capabilities, generate responses, and clean up resources.                                                                                                                                 |
| [agents/tools/agentImageGeneration.ts][agents_tools_agentimagegeneration]     | This sample demonstrates how to create an agent with ImageGenTool configured for image generation, make requests to generate images from text prompts, extract base64-encoded image data from the response, decode and save the generated image to a local file, and clean up created resources. |
| [agents/tools/agentMcp.ts][agents_tools_agentmcp]                             | This sample demonstrates how to create an agent with MCP tool capabilities, send requests that trigger MCP approval workflows, handle approval requests, and clean up resources.                                                                                                                 |
| [agents/tools/agentMcpConnectionAuth.ts][agents_tools_agentmcpconnectionauth] | This sample demonstrates how to create an agent with MCP tool capabilities using project connection authentication, send requests that trigger MCP approval workflows, handle approval requests, and clean up resources.                                                                         |
| [agents/tools/agentSharepoint.ts][agents_tools_agentsharepoint]               | This sample demonstrates how to create an agent with SharePoint tool capabilities, search SharePoint content, and process streaming responses with citations.                                                                                                                                    |
| [agents/tools/agentWebSearch.ts][agents_tools_agentwebsearch]                 | This sample demonstrates how to create an agent with web search capabilities, send a query to search the web, and clean up resources.                                                                                                                                                            |
| [responses/responseBasic.ts][responses_responsebasic]                         | This sample demonstrates how to create responses with and without conversation context.                                                                                                                                                                                                          |
| [responses/responseStream.ts][responses_responsestream]                       | This sample demonstrates how to create a non-streaming response and then use streaming for a follow-up response with conversation context.                                                                                                                                                       |
| [agents/agentFunctionTool.ts][agents_agentfunctiontool]                       | Demonstrates how to create an agent with function tools, handle function calls, and provide function results to get the final response.                                                                                                                                                          |
| [agents/agentContainerAppBasic.ts][agents_agentcontainerappbasic]             | demonstrates how to use basic container app agent operations.                                                                                                                                                                                                                                    |
| [agents/agentConversationCurd.ts][agents_agentconversationcurd]               | demonstrates how to use basic conversation operations.                                                                                                                                                                                                                                           |
| [agents/agentCurd.ts][agents_agentcurd]                                       | demonstrates how to use basic agent operations.                                                                                                                                                                                                                                                  |
| [agents/tools/computerUseUtil.ts][agents_tools_computeruseutil]               | Utility functions for Computer Use Agent samples. Shared helper functions and classes for Computer Use Agent samples.                                                                                                                                                                            |
| [connections/connectionsBasics.ts][connections_connectionsbasics]             | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name.                                                                                           |
| [conversations/conversationsBasics.ts][conversations_conversationsbasics]     | This sample demonstrates how to create, retrieve, update, list, and delete conversations using the OpenAI client.                                                                                                                                                                                |
| [datasets/datasetsBasics.ts][datasets_datasetsbasics]                         | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of datasets, upload files/folders, create datasets, manage dataset versions, and delete datasets.                                                                                                             |
| [deployments/deploymentsBasics.ts][deployments_deploymentsbasics]             | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all deployments, get the properties of a deployment by its name, and delete a deployment.                                                                                                                  |
| [files/filesBasic.ts][files_filesbasic]                                       | Using an OpenAI client, this sample demonstrates how to perform files operations: create, retrieve, content, list, and delete.                                                                                                                                                                   |
| [indexes/indexesBasics.ts][indexes_indexesbasics]                             | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all indexes, get the properties of an index by its name, and delete an index.                                                                                                                              |
| [redTeam/redTeamBasic.ts][redteam_redteambasic]                               | Given an AIProjectClient, this sample demonstrates how to create, get, and list Red Team scans.                                                                                                                                                                                                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/agents/agentBasic.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env AZURE_AI_PROJECT_ENDPOINT="<azure ai project endpoint>" MODEL_DEPLOYMENT_NAME="<model deployment name>" node dist/agents/agentBasic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agents_agentbasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/agentBasic.ts
[agents_agentcodeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/agentCodeInterpreter.ts
[agents_agentfilesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/agentFileSearch.ts
[agents_tools_agentagenttoagent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentAgentToAgent.ts
[agents_tools_agentaisearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentAiSearch.ts
[agents_tools_agentbingcustomsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentBingCustomSearch.ts
[agents_tools_agentbinggrounding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentBingGrounding.ts
[agents_tools_agentbrowserautomation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentBrowserAutomation.ts
[agents_tools_agentcomputeruse]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentComputerUse.ts
[agents_tools_agentfabric]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentFabric.ts
[agents_tools_agentfilesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentFileSearch.ts
[agents_tools_agentimagegeneration]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentImageGeneration.ts
[agents_tools_agentmcp]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentMcp.ts
[agents_tools_agentmcpconnectionauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentMcpConnectionAuth.ts
[agents_tools_agentopenapi]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentOpenApi.ts
[agents_tools_agentopenapiconnectionauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentOpenApiConnectionAuth.ts
[agents_tools_agentsharepoint]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentSharepoint.ts
[agents_tools_agentwebsearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/agentWebSearch.ts
[responses_responsebasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/responses/responseBasic.ts
[responses_responsestream]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/responses/responseStream.ts
[agents_agentfunctiontool]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/agentFunctionTool.ts
[agents_agentcontainerappbasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/agentContainerAppBasic.ts
[agents_agentconversationcurd]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/agentConversationCurd.ts
[agents_agentcurd]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/agentCurd.ts
[agents_tools_computeruseutil]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/agents/tools/computerUseUtil.ts
[connections_connectionsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/connections/connectionsBasics.ts
[conversations_conversationsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/conversations/conversationsBasics.ts
[datasets_datasetsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/datasets/datasetsBasics.ts
[deployments_deploymentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/deployments/deploymentsBasics.ts
[files_filesbasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/files/filesBasic.ts
[indexes_indexesbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/indexes/indexesBasics.ts
[redteam_redteambasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/redTeam/redTeamBasic.ts
[telemetry_telemetrybasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/typescript/src/telemetry/telemetryBasics.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
