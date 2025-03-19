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

| **File Name**                                                                               | **Description**                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agents/codeInterpreterWithStreaming.ts][agents_codeinterpreterwithstreaming]               | demonstrates how to use agent operations with code interpreter.                                                                                                                                        |
| [agents/agentCreateWithTracingConsole.ts][agents_agentcreatewithtracingconsole]             | Create Agent and instrument using open telemetry.                                                                                                                                                      |
| [agents/agentsAzureAiSearch.ts][agents_agentsazureaisearch]                                 | demonstrates how to use agent operations with the Azure AI Search tool.                                                                                                                                |
| [agents/agentsAzureFunctions.ts][agents_agentsazurefunctions]                               | demonstrates how to use azure function agent operations from the Azure Agents service                                                                                                                  |
| [agents/agentsBasics.ts][agents_agentsbasics]                                               | demonstrates how to use basic agent operations.                                                                                                                                                        |
| [agents/agentsBingGrounding.ts][agents_agentsbinggrounding]                                 | demonstrates how to use agent operations with the Grounding with Bing Search tool.                                                                                                                     |
| [agents/agentsBingGroundingWithStreaming.ts][agents_agentsbinggroundingwithstreaming]       | demonstrates how to use agent operations with the Grounding with Bing Search tool using streaming.                                                                                                     |
| [agents/agentsWithFunctionTool.ts][agents_agentswithfunctiontool]                           | demonstrates how to use basic agent operations using function tool.                                                                                                                                    |
| [agents/agentsWithOpenApi.ts][agents_agentswithopenapi]                                     | demonstrates how to use agent operations with an OpenApi tool.                                                                                                                                         |
| [agents/agentsWithToolset.ts][agents_agentswithtoolset]                                     | demonstrates how to use agent operations with toolset.                                                                                                                                                 |
| [agents/batchVectorStoreWithFiles.ts][agents_batchvectorstorewithfiles]                     | demonstrates how to create the batch vector store with the list of files.                                                                                                                              |
| [agents/batchVectorStoreWithFilesAndPolling.ts][agents_batchvectorstorewithfilesandpolling] | demonstrates how to create the batch vector store with the list of files using polling operation.                                                                                                      |
| [agents/codeInterpreter.ts][agents_codeinterpreter]                                         | demonstrates how to use agent operations with code interpreter.                                                                                                                                        |
| [agents/fileSearch.ts][agents_filesearch]                                                   | This sample demonstrates how to use agent operations with file searching.                                                                                                                              |
| [agents/files.ts][agents_files]                                                             | demonstrates how to use basic files agent operations.                                                                                                                                                  |
| [agents/filesWithLocalUpload.ts][agents_fileswithlocalupload]                               | demonstrates how to use basic files agent operations with local file upload.                                                                                                                           |
| [agents/filesWithPolling.ts][agents_fileswithpolling]                                       | demonstrates how to upload a file and poll for its status.                                                                                                                                             |
| [agents/messages.ts][agents_messages]                                                       | demonstrates how to use basic message agent operations.                                                                                                                                                |
| [agents/runSteps.ts][agents_runsteps]                                                       | demonstrates how to use basic run agent operations.                                                                                                                                                    |
| [agents/streaming.ts][agents_streaming]                                                     | demonstrates how to use agent operations in streaming.                                                                                                                                                 |
| [agents/threads.ts][agents_threads]                                                         | demonstrates how to use basic thread agent operations.                                                                                                                                                 |
| [agents/vectorStoreWithFiles.ts][agents_vectorstorewithfiles]                               | demonstrates how to create the vector store with the list of files.                                                                                                                                    |
| [agents/vectorStoreWithFilesAndPolling.ts][agents_vectorstorewithfilesandpolling]           | demonstrates how to create the vector store with the list of files using polling operation.                                                                                                            |
| [agents/vectorStores.ts][agents_vectorstores]                                               | demonstrates how to create the vector store.                                                                                                                                                           |
| [agents/vectorStoresWithPolling.ts][agents_vectorstoreswithpolling]                         | demonstrates how to create the vector store using polling operation.                                                                                                                                   |
| [connections/connectionsBasics.ts][connections_connectionsbasics]                           | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name. |

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
node dist/agents\codeInterpreterWithStreaming.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env AZURE_AI_PROJECTS_CONNECTION_STRING="<azure ai projects connection string>" node dist/agents\codeInterpreterWithStreaming.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agents_codeinterpreterwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/codeInterpreterWithStreaming.ts
[agents_agentcreatewithtracingconsole]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentCreateWithTracingConsole.ts
[agents_agentsazureaisearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsAzureAiSearch.ts
[agents_agentsazurefunctions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsAzureFunctions.ts
[agents_agentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsBasics.ts
[agents_agentsbinggrounding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsBingGrounding.ts
[agents_agentsbinggroundingwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsBingGroundingWithStreaming.ts
[agents_agentswithfunctiontool]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsWithFunctionTool.ts
[agents_agentswithopenapi]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsWithOpenApi.ts
[agents_agentswithtoolset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/agentsWithToolset.ts
[agents_batchvectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/batchVectorStoreWithFiles.ts
[agents_batchvectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/batchVectorStoreWithFilesAndPolling.ts
[agents_codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/codeInterpreter.ts
[agents_filesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/fileSearch.ts
[agents_files]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/files.ts
[agents_fileswithlocalupload]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/filesWithLocalUpload.ts
[agents_fileswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/filesWithPolling.ts
[agents_messages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/messages.ts
[agents_runsteps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/runSteps.ts
[agents_streaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/streaming.ts
[agents_threads]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/threads.ts
[agents_vectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/vectorStoreWithFiles.ts
[agents_vectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/vectorStoreWithFilesAndPolling.ts
[agents_vectorstores]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/vectorStores.ts
[agents_vectorstoreswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents/vectorStoresWithPolling.ts
[connections_connectionsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/connections/connectionsBasics.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
