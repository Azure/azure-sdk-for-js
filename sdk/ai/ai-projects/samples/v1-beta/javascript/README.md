---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: ai-projects-javascript-beta
---

# Azure AI Projects client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure AI Projects in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agents/codeInterpreterWithStreaming.js][agents_codeinterpreterwithstreaming]               | demonstrates how to use agent operations with code interpreter.                                                                                                                                        |
| [agents/agentCreateWithTracingConsole.js][agents_agentcreatewithtracingconsole]             | Create Agent and instrument using open telemetry.                                                                                                                                                      |
| [agents/agentsAzureAiSearch.js][agents_agentsazureaisearch]                                 | demonstrates how to use agent operations with the Azure AI Search tool.                                                                                                                                |
| [agents/agentsAzureFunctions.js][agents_agentsazurefunctions]                               | demonstrates how to use azure function agent operations from the Azure Agents service                                                                                                                  |
| [agents/agentsBasics.js][agents_agentsbasics]                                               | demonstrates how to use basic agent operations.                                                                                                                                                        |
| [agents/agentsBingGrounding.js][agents_agentsbinggrounding]                                 | demonstrates how to use agent operations with the Grounding with Bing Search tool.                                                                                                                     |
| [agents/agentsBingGroundingWithStreaming.js][agents_agentsbinggroundingwithstreaming]       | demonstrates how to use agent operations with the Grounding with Bing Search tool using streaming.                                                                                                     |
| [agents/agentsWithFunctionTool.js][agents_agentswithfunctiontool]                           | demonstrates how to use basic agent operations using function tool.                                                                                                                                    |
| [agents/agentsWithOpenApi.js][agents_agentswithopenapi]                                     | demonstrates how to use agent operations with an OpenApi tool.                                                                                                                                         |
| [agents/agentsWithToolset.js][agents_agentswithtoolset]                                     | demonstrates how to use agent operations with toolset.                                                                                                                                                 |
| [agents/batchVectorStoreWithFiles.js][agents_batchvectorstorewithfiles]                     | demonstrates how to create the batch vector store with the list of files.                                                                                                                              |
| [agents/batchVectorStoreWithFilesAndPolling.js][agents_batchvectorstorewithfilesandpolling] | demonstrates how to create the batch vector store with the list of files using polling operation.                                                                                                      |
| [agents/codeInterpreter.js][agents_codeinterpreter]                                         | demonstrates how to use agent operations with code interpreter.                                                                                                                                        |
| [agents/fileSearch.js][agents_filesearch]                                                   | This sample demonstrates how to use agent operations with file searching.                                                                                                                              |
| [agents/files.js][agents_files]                                                             | demonstrates how to use basic files agent operations.                                                                                                                                                  |
| [agents/filesWithLocalUpload.js][agents_fileswithlocalupload]                               | demonstrates how to use basic files agent operations with local file upload.                                                                                                                           |
| [agents/filesWithPolling.js][agents_fileswithpolling]                                       | demonstrates how to upload a file and poll for its status.                                                                                                                                             |
| [agents/messages.js][agents_messages]                                                       | demonstrates how to use basic message agent operations.                                                                                                                                                |
| [agents/runSteps.js][agents_runsteps]                                                       | demonstrates how to use basic run agent operations.                                                                                                                                                    |
| [agents/streaming.js][agents_streaming]                                                     | demonstrates how to use agent operations in streaming.                                                                                                                                                 |
| [agents/threads.js][agents_threads]                                                         | demonstrates how to use basic thread agent operations.                                                                                                                                                 |
| [agents/vectorStoreWithFiles.js][agents_vectorstorewithfiles]                               | demonstrates how to create the vector store with the list of files.                                                                                                                                    |
| [agents/vectorStoreWithFilesAndPolling.js][agents_vectorstorewithfilesandpolling]           | demonstrates how to create the vector store with the list of files using polling operation.                                                                                                            |
| [agents/vectorStores.js][agents_vectorstores]                                               | demonstrates how to create the vector store.                                                                                                                                                           |
| [agents/vectorStoresWithPolling.js][agents_vectorstoreswithpolling]                         | demonstrates how to create the vector store using polling operation.                                                                                                                                   |
| [connections/connectionsBasics.js][connections_connectionsbasics]                           | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node agents\codeInterpreterWithStreaming.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env AZURE_AI_PROJECTS_CONNECTION_STRING="<azure ai projects connection string>" node agents\codeInterpreterWithStreaming.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agents_codeinterpreterwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/codeInterpreterWithStreaming.js
[agents_agentcreatewithtracingconsole]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentCreateWithTracingConsole.js
[agents_agentsazureaisearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsAzureAiSearch.js
[agents_agentsazurefunctions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsAzureFunctions.js
[agents_agentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsBasics.js
[agents_agentsbinggrounding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsBingGrounding.js
[agents_agentsbinggroundingwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsBingGroundingWithStreaming.js
[agents_agentswithfunctiontool]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsWithFunctionTool.js
[agents_agentswithopenapi]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsWithOpenApi.js
[agents_agentswithtoolset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/agentsWithToolset.js
[agents_batchvectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/batchVectorStoreWithFiles.js
[agents_batchvectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/batchVectorStoreWithFilesAndPolling.js
[agents_codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/codeInterpreter.js
[agents_filesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/fileSearch.js
[agents_files]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/files.js
[agents_fileswithlocalupload]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/filesWithLocalUpload.js
[agents_fileswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/filesWithPolling.js
[agents_messages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/messages.js
[agents_runsteps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/runSteps.js
[agents_streaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/streaming.js
[agents_threads]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/threads.js
[agents_vectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/vectorStoreWithFiles.js
[agents_vectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/vectorStoreWithFilesAndPolling.js
[agents_vectorstores]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/vectorStores.js
[agents_vectorstoreswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents/vectorStoresWithPolling.js
[connections_connectionsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/connections/connectionsBasics.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/README.md
