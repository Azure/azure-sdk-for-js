---
page_type: sample
languages:
  - typescript
products:
  - azure
urlFragment: ai-agents-typescript-beta
---

# Azure AI Agents client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure AI Agents in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                            |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [codeInterpreterWithStreaming.ts][codeinterpreterwithstreaming]               | demonstrates how to use agent operations with code interpreter.                                                            |
| [agentTokenUsage.ts][agenttokenusage]                                         | demonstrates how to track the token usage of an Agent.                                                                     |
| [agentsAzureAiSearch.ts][agentsazureaisearch]                                 | demonstrates how to use agent operations with the Azure AI Search tool.                                                    |
| [agentsBasics.ts][agentsbasics]                                               | demonstrates how to use basic agent operations.                                                                            |
| [agentsBingGrounding.ts][agentsbinggrounding]                                 | demonstrates how to use agent operations with the Grounding with Bing Search tool.                                         |
| [agentsBingGroundingWithStreaming.ts][agentsbinggroundingwithstreaming]       | demonstrates how to use agent operations with the Grounding with Bing Search tool using streaming.                         |
| [agentsBrowserAutomation.ts][agentsbrowserautomation]                         | demonstrates how to use agent operations with the Browser Automation tool.                                                 |
| [agentsConnectedAgents.ts][agentsconnectedagents]                             | This sample demonstrates how to use Agent operations with the Connected Agent tool from the Azure Agents service.          |
| [agentsImageInputWithBase64.ts][agentsimageinputwithbase64]                   | This sample demonstrates how to use basic agent operations with image input (base64 encoded) for the Azure Agents service. |
| [agentsImageInputWithFile.ts][agentsimageinputwithfile]                       | This sample demonstrates how to use basic agent operations using image file input for the Azure Agents service.            |
| [agentsImageInputWithUrl.ts][agentsimageinputwithurl]                         | This sample demonstrates how to use basic agent operations using image url input for the Azure Agents service.             |
| [agentsLocalTelemetry.ts][agentslocaltelemetry]                               | This sample demonstrates how to enable telemetry for AIAgentClient at local development.                                   |
| [agentsMultiMCPs.ts][agentsmultimcps]                                         | demonstrates how to use agent operations with multiple MCP servers.                                                        |
| [agentsMultiMCPsWithToolset.ts][agentsmultimcpswithtoolset]                   | demonstrates how to use agent operations with multiple MCP servers.                                                        |
| [agentsRemoteTelemetry.ts][agentsremotetelemetry]                             | This sample demonstrates how to enable remote telemetry for AIAgentClient at production.                                   |
| [agentsWithFunctionTool.ts][agentswithfunctiontool]                           | demonstrates how to use basic agent operations using function tool.                                                        |
| [agentsWithOpenApi.ts][agentswithopenapi]                                     | demonstrates how to use agent operations with an OpenApi tool.                                                             |
| [agentsWithToolset.ts][agentswithtoolset]                                     | demonstrates how to use agent operations with toolset.                                                                     |
| [batchVectorStoreWithFiles.ts][batchvectorstorewithfiles]                     | demonstrates how to create the batch vector store with the list of files.                                                  |
| [batchVectorStoreWithFilesAndPolling.ts][batchvectorstorewithfilesandpolling] | demonstrates how to create the batch vector store with the list of files using polling operation.                          |
| [codeInterpreter.ts][codeinterpreter]                                         | demonstrates how to use agent operations with code interpreter.                                                            |
| [fileSearch.ts][filesearch]                                                   | This sample demonstrates how to use agent operations with file searching.                                                  |
| [files.ts][files]                                                             | demonstrates how to use basic files agent operations.                                                                      |
| [filesWithLocalUpload.ts][fileswithlocalupload]                               | demonstrates how to use basic files agent operations with local file upload.                                               |
| [filesWithPolling.ts][fileswithpolling]                                       | demonstrates how to upload a file and poll for its status.                                                                 |
| [messages.ts][messages]                                                       | demonstrates how to use basic message agent operations.                                                                    |
| [runSteps.ts][runsteps]                                                       | demonstrates how to use basic run agent operations.                                                                        |
| [streaming.ts][streaming]                                                     | demonstrates how to use agent operations in streaming.                                                                     |
| [threads.ts][threads]                                                         | demonstrates how to use basic thread agent operations.                                                                     |
| [vectorStoreWithFiles.ts][vectorstorewithfiles]                               | demonstrates how to create the vector store with the list of files.                                                        |
| [vectorStoreWithFilesAndPolling.ts][vectorstorewithfilesandpolling]           | demonstrates how to create the vector store with the list of files using polling operation.                                |
| [vectorStores.ts][vectorstores]                                               | demonstrates how to create the vector store.                                                                               |
| [vectorStoresWithPolling.ts][vectorstoreswithpolling]                         | demonstrates how to create the vector store using polling operation.                                                       |

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
node dist/codeInterpreterWithStreaming.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env PROJECT_ENDPOINT="<project endpoint>" MODEL_DEPLOYMENT_NAME="<model deployment name>" node dist/codeInterpreterWithStreaming.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[codeinterpreterwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/codeInterpreterWithStreaming.ts
[agenttokenusage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentTokenUsage.ts
[agentsazureaisearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsAzureAiSearch.ts
[agentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsBasics.ts
[agentsbinggrounding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsBingGrounding.ts
[agentsbinggroundingwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsBingGroundingWithStreaming.ts
[agentsbrowserautomation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsBrowserAutomation.ts
[agentsconnectedagents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsConnectedAgents.ts
[agentsimageinputwithbase64]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsImageInputWithBase64.ts
[agentsimageinputwithfile]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsImageInputWithFile.ts
[agentsimageinputwithurl]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsImageInputWithUrl.ts
[agentslocaltelemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsLocalTelemetry.ts
[agentsmultimcps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsMultiMCPs.ts
[agentsmultimcpswithtoolset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsMultiMCPsWithToolset.ts
[agentsremotetelemetry]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsRemoteTelemetry.ts
[agentswithfunctiontool]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsWithFunctionTool.ts
[agentswithopenapi]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsWithOpenApi.ts
[agentswithtoolset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/agentsWithToolset.ts
[batchvectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/batchVectorStoreWithFiles.ts
[batchvectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/batchVectorStoreWithFilesAndPolling.ts
[codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/codeInterpreter.ts
[filesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/fileSearch.ts
[files]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/files.ts
[fileswithlocalupload]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/filesWithLocalUpload.ts
[fileswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/filesWithPolling.ts
[messages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/messages.ts
[runsteps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/runSteps.ts
[streaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/streaming.ts
[threads]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/threads.ts
[vectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/vectorStoreWithFiles.ts
[vectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/vectorStoreWithFilesAndPolling.ts
[vectorstores]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/vectorStores.ts
[vectorstoreswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/typescript/src/vectorStoresWithPolling.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-agents/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
