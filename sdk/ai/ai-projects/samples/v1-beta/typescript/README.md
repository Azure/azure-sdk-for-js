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

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agents\agentCreateWithTracingConsole.ts][agents_agentcreatewithtracingconsole] | Create Agent and instrument using open telemetry.                                                                                                                                                                                                                      |
| [agents\agentsBasics.ts][agents_agentsbasics]                                   | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node agentsBasics.ts Before running the sample: npm install                                                                            |
| [agents\agentsBingGrounding.ts][agents_agentsbinggrounding]                     | This sample demonstrates how to use agent operations with the Grounding with Bing Search tool from the Azure Agents service using a asynchronous client. USAGE: npm node agentsBingGrounding.ts Before running the sample: npm install                                 |
| [agents\agentsBingGroundingStreaming.ts][agents_agentsbinggroundingstreaming]   | This sample demonstrates how to use agent operations with the Grounding with Bing Search tool from the Azure Agents service using a asynchronous client and streaming. USAGE: npm node agentsBingGroundingStreaming.ts Before running the sample: npm install          |
| [agents\agentsFabric.ts][agents_agentsfabric]                                   | This sample demonstrates how to use agent operations with the Microsoft Fabric tool from the Azure Agents service using a asynchronous client. USAGE: npm node agentsFabric.ts Before running the sample: npm install                                                  |
| [agents\agentsFunction.ts][agents_agentsfunction]                               | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node agentsFunction.ts Before running the sample: npm install                                                                          |
| [agents\agentsSharepoint.ts][agents_agentssharepoint]                           | This sample demonstrates how to use agent operations with the Sharepoint tool from the Azure Agents service using a asynchronous client. USAGE: npm node agentsSharepoint.ts Before running the sample: npm install                                                    |
| [agents\codeInterpreter.ts][agents_codeinterpreter]                             | This sample demonstrates how to use agent operations with code interpreter from the Azure Agents service using a synchronous client. USAGE: npm node codeInterpreter.ts Before running the sample: npm install                                                         |
| [agents\codeInterpreterStreaming.ts][agents_codeinterpreterstreaming]           | This sample demonstrates how to use agent operations with code interpreter from the Azure Agents service using a synchronous client. USAGE: npm node codeInterpreterStreaming.ts Before running the sample: npm install                                                |
| [agents\fileSearch.ts][agents_filesearch]                                       | This sample demonstrates how to use agent operations with file searching from the Azure Agents service using a synchronous client. USAGE: npm node fileSearch.ts Before running the sample: npm install                                                                |
| [agents\files.ts][agents_files]                                                 | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node files.ts Before running the sample: npm install                                                                                   |
| [agents\filesLocal.ts][agents_fileslocal]                                       | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node filesLocal.ts Before running the sample: npm install                                                                              |
| [agents\filesPolling.ts][agents_filespolling]                                   | This sample demonstrates how to upload a file and poll for its status using a synchronous client. USAGE: npm node filesPolling.ts Before running the sample: npm install                                                                                               |
| [agents\messages.ts][agents_messages]                                           | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node messages.ts Before running the sample: npm install                                                                                |
| [agents\runSteps.ts][agents_runsteps]                                           | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node runSteps.ts Before running the sample: npm install                                                                                |
| [agents\streaming.ts][agents_streaming]                                         | This sample demonstrates how to use agent operations in streaming from the Azure Agents service using a synchronous client. USAGE: npm node streaming.ts Before running the sample: npm install                                                                        |
| [agents\threads.ts][agents_threads]                                             | This sample demonstrates how to use basic agent operations from the Azure Agents service using a synchronous client. USAGE: npm node threads.ts Before running the sample: npm install                                                                                 |
| [agents\vectorStoreFileBatches.ts][agents_vectorstorefilebatches]               | This sample demonstrates how to create the batch vector store with the list of files. USAGE: npm node vectorStoreFilesBatches.ts Before running the sample: npm install                                                                                                |
| [agents\vectorStoreFileBatchesPolling.ts][agents_vectorstorefilebatchespolling] | This sample demonstrates how to create the batch vector store with the list of files using polling operation. USAGE: npm node vectorStoreFilesBatchesPolling.ts Before running the sample: npm install                                                                 |
| [agents\vectorStoreFiles.ts][agents_vectorstorefiles]                           | This sample demonstrates how to create the vector store with the list of files. USAGE: npm node vectorStoreFiles.ts Before running the sample: npm install                                                                                                             |
| [agents\vectorStoreFilesPolling.ts][agents_vectorstorefilespolling]             | This sample demonstrates how to create the vector store with the list of files using polling operation. USAGE: npm node vectorStoreFilesPolling.ts Before running the sample: npm install                                                                              |
| [agents\vectorStores.ts][agents_vectorstores]                                   | This sample demonstrates how to create the vector store. USAGE: npm node vectorStores.ts Before running the sample: npm install                                                                                                                                        |
| [agents\vectorStoresPolling.ts][agents_vectorstorespolling]                     | This sample demonstrates how to create the vector store using polling operation. USAGE: npm node vectorStoresPolling.ts Before running the sample: npm install                                                                                                         |
| [connections\connectionsBasics.ts][connections_connectionsbasics]               | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name. USAGE: npm node files.ts Before running the sample: npm install |

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
node dist/agents\agentCreateWithTracingConsole.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env AZURE_AI_PROJECTS_CONNECTION_STRING="<azure ai projects connection string>" APPLICATIONINSIGHTS_CONNECTION_STRING="<applicationinsights connection string>" node dist/agents\agentCreateWithTracingConsole.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agents_agentcreatewithtracingconsole]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\agentCreateWithTracingConsole.ts
[agents_agentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\agentsBasics.ts
[agents_agentsbinggrounding]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\agentsBingGrounding.ts
[agents_agentsbinggroundingstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\agentsBingGroundingStreaming.ts
[agents_agentsfabric]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\agentsFabric.ts
[agents_agentsfunction]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\agentsFunction.ts
[agents_agentssharepoint]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\agentsSharepoint.ts
[agents_codeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\codeInterpreter.ts
[agents_codeinterpreterstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\codeInterpreterStreaming.ts
[agents_filesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\fileSearch.ts
[agents_files]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\files.ts
[agents_fileslocal]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\filesLocal.ts
[agents_filespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\filesPolling.ts
[agents_messages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\messages.ts
[agents_runsteps]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\runSteps.ts
[agents_streaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\streaming.ts
[agents_threads]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\threads.ts
[agents_vectorstorefilebatches]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\vectorStoreFileBatches.ts
[agents_vectorstorefilebatchespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\vectorStoreFileBatchesPolling.ts
[agents_vectorstorefiles]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\vectorStoreFiles.ts
[agents_vectorstorefilespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\vectorStoreFilesPolling.ts
[agents_vectorstores]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\vectorStores.ts
[agents_vectorstorespolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/agents\vectorStoresPolling.ts
[connections_connectionsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v1-beta/typescript/src/connections\connectionsBasics.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
