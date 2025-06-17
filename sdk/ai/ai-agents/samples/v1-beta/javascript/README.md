---
page_type: sample
languages:
  - javascript
products:
  - azure
urlFragment: ai-agents-javascript-beta
---

# Azure AI Agents client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure AI Agents in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                            |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [codeInterpreterWithStreaming.js][codeinterpreterwithstreaming]               | demonstrates how to use agent operations with code interpreter.                                                            |
| [agentTokenUsage.js][agenttokenusage]                                         | demonstrates how to track the token usage of an Agent.                                                                     |
| [agentsAzureAiSearch.js][agentsazureaisearch]                                 | demonstrates how to use agent operations with the Azure AI Search tool.                                                    |
| [agentsBasics.js][agentsbasics]                                               | demonstrates how to use basic agent operations.                                                                            |
| [agentsBingGrounding.js][agentsbinggrounding]                                 | demonstrates how to use agent operations with the Grounding with Bing Search tool.                                         |
| [agentsBingGroundingWithStreaming.js][agentsbinggroundingwithstreaming]       | demonstrates how to use agent operations with the Grounding with Bing Search tool using streaming.                         |
| [agentsConnectedAgents.js][agentsconnectedagents]                             | This sample demonstrates how to use Agent operations with the Connected Agent tool from the Azure Agents service.          |
| [agentsFabric.js][agentsfabric]                                               | demonstrates how to use agent operations with the Microsoft Fabric tool.                                                   |
| [agentsImageInputWithBase64.js][agentsimageinputwithbase64]                   | This sample demonstrates how to use basic agent operations with image input (base64 encoded) for the Azure Agents service. |
| [agentsImageInputWithFile.js][agentsimageinputwithfile]                       | This sample demonstrates how to use basic agent operations using image file input for the Azure Agents service.            |
| [agentsImageInputWithUrl.js][agentsimageinputwithurl]                         | This sample demonstrates how to use basic agent operations using image url input for the Azure Agents service.             |
| [agentsSharepoint.js][agentssharepoint]                                       | demonstrates how to use agent operations with the Sharepoint tool.                                                         |
| [agentsWithFunctionTool.js][agentswithfunctiontool]                           | demonstrates how to use basic agent operations using function tool.                                                        |
| [agentsWithOpenApi.js][agentswithopenapi]                                     | demonstrates how to use agent operations with an OpenApi tool.                                                             |
| [agentsWithToolset.js][agentswithtoolset]                                     | demonstrates how to use agent operations with toolset.                                                                     |
| [batchVectorStoreWithFiles.js][batchvectorstorewithfiles]                     | demonstrates how to create the batch vector store with the list of files.                                                  |
| [batchVectorStoreWithFilesAndPolling.js][batchvectorstorewithfilesandpolling] | demonstrates how to create the batch vector store with the list of files using polling operation.                          |
| [codeInterpreter.js][codeinterpreter]                                         | demonstrates how to use agent operations with code interpreter.                                                            |
| [fileSearch.js][filesearch]                                                   | This sample demonstrates how to use agent operations with file searching.                                                  |
| [files.js][files]                                                             | demonstrates how to use basic files agent operations.                                                                      |
| [filesWithLocalUpload.js][fileswithlocalupload]                               | demonstrates how to use basic files agent operations with local file upload.                                               |
| [filesWithPolling.js][fileswithpolling]                                       | demonstrates how to upload a file and poll for its status.                                                                 |
| [messages.js][messages]                                                       | demonstrates how to use basic message agent operations.                                                                    |
| [runSteps.js][runsteps]                                                       | demonstrates how to use basic run agent operations.                                                                        |
| [streaming.js][streaming]                                                     | demonstrates how to use agent operations in streaming.                                                                     |
| [threads.js][threads]                                                         | demonstrates how to use basic thread agent operations.                                                                     |
| [utils/createAgent.js][utils_createagent]                                     | Utils for creating an agent, also with tools.                                                                              |
| [utils/createAgentClient.js][utils_createagentclient]                         | Utils to create an Azure AI Agents client.                                                                                 |
| [utils/createAndPollThreadRun.js][utils_createandpollthreadrun]               | Utils to create and poll a thread run until it finishes.                                                                   |
| [utils/createThread.js][utils_createthread]                                   | Utils to create a thread and add messages to it.                                                                           |
| [utils/createThreadRunStream.js][utils_createthreadrunstream]                 | Creates a thread run stream and processes the events.                                                                      |
| [utils/createTool.js][utils_createtool]                                       | Utils to create tools for Azure AI Agents.                                                                                 |
| [utils/deleteAgent.js][utils_deleteagent]                                     | Utils to delete an agent with a given ID or IDs.                                                                           |
| [utils/listThreadMessages.js][utils_listthreadmessages]                       | Utils to list messages in a thread.                                                                                        |
| [utils/parseString.js][utils_parsestring]                                     | Utils to parse a JSON string.                                                                                              |
| [vectorStoreWithFiles.js][vectorstorewithfiles]                               | demonstrates how to create the vector store with the list of files.                                                        |
| [vectorStoreWithFilesAndPolling.js][vectorstorewithfilesandpolling]           | demonstrates how to create the vector store with the list of files using polling operation.                                |
| [vectorStores.js][vectorstores]                                               | demonstrates how to create the vector store.                                                                               |
| [vectorStoresWithPolling.js][vectorstoreswithpolling]                         | demonstrates how to create the vector store using polling operation.                                                       |

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
node codeInterpreterWithStreaming.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env PROJECT_ENDPOINT="<project endpoint>" MODEL_DEPLOYMENT_NAME="<model deployment name>" node codeInterpreterWithStreaming.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[codeinterpreterwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/codeInterpreterWithStreaming.js
[agenttokenusage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentTokenUsage.js
[agentsazureaisearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsAzureAiSearch.js
[agentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsBasics.js
[agentsbinggrounding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsBingGrounding.js
[agentsbinggroundingwithstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsBingGroundingWithStreaming.js
[agentsconnectedagents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsConnectedAgents.js
[agentsfabric]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsFabric.js
[agentsimageinputwithbase64]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsImageInputWithBase64.js
[agentsimageinputwithfile]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsImageInputWithFile.js
[agentsimageinputwithurl]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsImageInputWithUrl.js
[agentssharepoint]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsSharepoint.js
[agentswithfunctiontool]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsWithFunctionTool.js
[agentswithopenapi]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsWithOpenApi.js
[agentswithtoolset]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/agentsWithToolset.js
[batchvectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/batchVectorStoreWithFiles.js
[batchvectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/batchVectorStoreWithFilesAndPolling.js
[codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/codeInterpreter.js
[filesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/fileSearch.js
[files]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/files.js
[fileswithlocalupload]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/filesWithLocalUpload.js
[fileswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/filesWithPolling.js
[messages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/messages.js
[runsteps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/runSteps.js
[streaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/streaming.js
[threads]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/threads.js
[utils_createagent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/createAgent.js
[utils_createagentclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/createAgentClient.js
[utils_createandpollthreadrun]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/createAndPollThreadRun.js
[utils_createthread]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/createThread.js
[utils_createthreadrunstream]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/createThreadRunStream.js
[utils_createtool]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/createTool.js
[utils_deleteagent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/deleteAgent.js
[utils_listthreadmessages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/listThreadMessages.js
[utils_parsestring]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/utils/parseString.js
[vectorstorewithfiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/vectorStoreWithFiles.js
[vectorstorewithfilesandpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/vectorStoreWithFilesAndPolling.js
[vectorstores]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/vectorStores.js
[vectorstoreswithpolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-agents/samples/v1-beta/javascript/vectorStoresWithPolling.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-agents/README.md
