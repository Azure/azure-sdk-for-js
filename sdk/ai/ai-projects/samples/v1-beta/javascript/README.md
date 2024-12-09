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

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agents\agentCreateWithTracingConsole.js][agents_agentcreatewithtracingconsole] | Create Agent and instrument using open telemetry.                                                                                                                                                                                                                          |
| [agents\agentsBasics.js][agents_agentsbasics]                                   | DESCRIPTION: This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node agentsBasics.ts Before running the sample: npm install                                                                   |
| [agents\agentsBingGrounding.js][agents_agentsbinggrounding]                     | DESCRIPTION: This sample demonstrates how to use agent operations with the Grounding with Bing Search tool from the Azure Agents service using a asynchronous client. USAGE: npm node agentsBingGrounding.ts Before running the sample: npm install                        |
| [agents\agentsBingGroundingStreaming.js][agents_agentsbinggroundingstreaming]   | DESCRIPTION: This sample demonstrates how to use agent operations with the Grounding with Bing Search tool from the Azure Agents service using a asynchronous client and streaming. USAGE: npm node agentsBingGroundingStreaming.ts Before running the sample: npm install |
| [agents\agentsFabric.js][agents_agentsfabric]                                   | DESCRIPTION: This sample demonstrates how to use agent operations with the Microsoft Fabric tool from the Azure Agents service using a asynchronous client. USAGE: npm node agentsFabric.ts Before running the sample: npm install                                         |
| [agents\agentsFunction.js][agents_agentsfunction]                               | DESCRIPTION: This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node agentsFunction.ts Before running the sample: npm install                                                                 |
| [agents\agentsSharepoint.js][agents_agentssharepoint]                           | DESCRIPTION: This sample demonstrates how to use agent operations with the Sharepoint tool from the Azure Agents service using a asynchronous client. USAGE: npm node agentsSharepoint.ts Before running the sample: npm install                                           |
| [agents\codeInterpreter.js][agents_codeinterpreter]                             | This sample demonstrates how to use agent operations with code interpreter from the Azure Agents service using a synchronous client. USAGE: npm node codeInterpreter.ts Before running the sample: npm install                                                             |
| [agents\codeInterpreterStreaming.js][agents_codeinterpreterstreaming]           | This sample demonstrates how to use agent operations with code interpreter from the Azure Agents service using a synchronous client. USAGE: npm node codeInterpreterStreaming.ts Before running the sample: npm install                                                    |
| [agents\fileSearch.js][agents_filesearch]                                       | This sample demonstrates how to use agent operations with file searching from the Azure Agents service using a synchronous client. USAGE: npm node fileSearch.ts Before running the sample: npm install                                                                    |
| [agents\files.js][agents_files]                                                 | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node files.ts Before running the sample: npm install                                                                                       |
| [agents\filesLocal.js][agents_fileslocal]                                       | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node filesLocal.ts Before running the sample: npm install                                                                                  |
| [agents\filesPolling.js][agents_filespolling]                                   | This sample demonstrates how to upload a file and poll for its status using a synchronous client. USAGE: npm node filesPolling.ts Before running the sample: npm install                                                                                                   |
| [agents\messages.js][agents_messages]                                           | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node messages.ts Before running the sample: npm install                                                                                    |
| [agents\runSteps.js][agents_runsteps]                                           | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node runSteps.ts Before running the sample: npm install                                                                                    |
| [agents\streaming.js][agents_streaming]                                         | This sample demonstrates how to use agent operations in streaming from the Azure Agents service using a synchronous client. USAGE: npm node streaming.ts Before running the sample: npm install                                                                            |
| [agents\threads.js][agents_threads]                                             | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node threads.ts Before running the sample: npm install                                                                                     |
| [agents\vectorStoreFileBatches.js][agents_vectorstorefilebatches]               | This sample demonstrates how to create the batch vector store with the list of files. USAGE: npm node vectorStoreFilesBatches.ts Before running the sample: npm install                                                                                                    |
| [agents\vectorStoreFileBatchesPolling.js][agents_vectorstorefilebatchespolling] | This sample demonstrates how to create the batch vector store with the list of files using polling operation. USAGE: npm node vectorStoreFilesBatchesPolling.ts Before running the sample: npm install                                                                     |
| [agents\vectorStoreFiles.js][agents_vectorstorefiles]                           | This sample demonstrates how to create the vector store with the list of files. USAGE: npm node vectorStoreFiles.ts Before running the sample: npm install                                                                                                                 |
| [agents\vectorStoreFilesPolling.js][agents_vectorstorefilespolling]             | This sample demonstrates how to create the vector store with the list of files using polling operation. USAGE: npm node vectorStoreFilesPolling.ts Before running the sample: npm install                                                                                  |
| [agents\vectorStores.js][agents_vectorstores]                                   | This sample demonstrates how to create the vector store. USAGE: npm node vectorStores.ts Before running the sample: npm install                                                                                                                                            |
| [agents\vectorStoresPolling.js][agents_vectorstorespolling]                     | This sample demonstrates how to create the vector store using polling operation. USAGE: npm node vectorStoresPolling.ts Before running the sample: npm install                                                                                                             |
| [connections\connectionsBasics.js][connections_connectionsbasics]               | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name. USAGE: npm node files.ts Before running the sample: npm install     |

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
node agents\agentCreateWithTracingConsole.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AZURE_AI_PROJECTS_CONNECTION_STRING="<azure ai projects connection string>" APPLICATIONINSIGHTS_CONNECTION_STRING="<applicationinsights connection string>" node agents\agentCreateWithTracingConsole.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agents_agentcreatewithtracingconsole]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\agentCreateWithTracingConsole.js
[agents_agentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\agentsBasics.js
[agents_agentsbinggrounding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\agentsBingGrounding.js
[agents_agentsbinggroundingstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\agentsBingGroundingStreaming.js
[agents_agentsfabric]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\agentsFabric.js
[agents_agentsfunction]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\agentsFunction.js
[agents_agentssharepoint]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\agentsSharepoint.js
[agents_codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\codeInterpreter.js
[agents_codeinterpreterstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\codeInterpreterStreaming.js
[agents_filesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\fileSearch.js
[agents_files]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\files.js
[agents_fileslocal]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\filesLocal.js
[agents_filespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\filesPolling.js
[agents_messages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\messages.js
[agents_runsteps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\runSteps.js
[agents_streaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\streaming.js
[agents_threads]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\threads.js
[agents_vectorstorefilebatches]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\vectorStoreFileBatches.js
[agents_vectorstorefilebatchespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\vectorStoreFileBatchesPolling.js
[agents_vectorstorefiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\vectorStoreFiles.js
[agents_vectorstorefilespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\vectorStoreFilesPolling.js
[agents_vectorstores]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\vectorStores.js
[agents_vectorstorespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/agents\vectorStoresPolling.js
[connections_connectionsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/javascript/connections\connectionsBasics.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/README.md
