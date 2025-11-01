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

| **File Name**                                                             | **Description**                                                                                                                                                                                        |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agents/agentBasic.js][agents_agentbasic]                                 | This sample demonstrates how to create an agent, create a conversation, generate responses using the agent, and clean up resources.                                                                    |
| [agents/agentCodeInterpreter.js][agents_agentcodeinterpreter]             | This sample demonstrates how to create a response with code interpreter tool to solve mathematical equations.                                                                                          |
| [agents/agentFileSearch.js][agents_agentfilesearch]                       | This sample demonstrates how to create an agent with file search capabilities, upload documents to a vector store, and stream responses that include file search results.                              |
| [files/filesBasic.js][files_filesbasic]                                   | This sample demonstrates how to upload, retrieve, list, get content, and delete files using the OpenAI client.                                                                                         |
| [responses/responseBasic.js][responses_responsebasic]                     | This sample demonstrates how to create responses with and without conversation context.                                                                                                                |
| [responses/responseStream.js][responses_responsestream]                   | This sample demonstrates how to create a non-streaming response and then use streaming for a follow-up response with conversation context.                                                             |
| [agents/agentFunctionTool.js][agents_agentfunctiontool]                   | Demonstrates how to create an agent with function tools, handle function calls, and provide function results to get the final response.                                                                |
| [agents/agentContainerAppBasic.js][agents_agentcontainerappbasic]         | demonstrates how to use basic container app agent operations.                                                                                                                                          |
| [agents/agentConversationCurd.js][agents_agentconversationcurd]           | demonstrates how to use basic conversation operations.                                                                                                                                                 |
| [agents/agentCurd.js][agents_agentcurd]                                   | demonstrates how to use basic agent operations.                                                                                                                                                        |
| [connections/connectionsBasics.js][connections_connectionsbasics]         | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all connections, get the properties of a default connection, and get the properties of a connection by its name. |
| [conversations/conversationsBasics.js][conversations_conversationsbasics] | This sample demonstrates how to create, retrieve, update, list, and delete conversations using the OpenAI client.                                                                                      |
| [datasets/datasetsBasics.js][datasets_datasetsbasics]                     | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of datasets, upload files/folders, create datasets, manage dataset versions, and delete datasets.                   |
| [deployments/deploymentsBasics.js][deployments_deploymentsbasics]         | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all deployments, get the properties of a deployment by its name, and delete a deployment.                        |
| [indexes/indexesBasics.js][indexes_indexesbasics]                         | Given an AIProjectClient, this sample demonstrates how to enumerate the properties of all indexes, get the properties of an index by its name, and delete an index.                                    |
| [redTeam/redTeamBasic.js][redteam_redteambasic]                           | Given an AIProjectClient, this sample demonstrates how to create, get, and list Red Team scans.                                                                                                        |

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
node agents\agentBasic.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env PROJECT_ENDPOINT="<project endpoint>" MODEL_DEPLOYMENT_NAME="<model deployment name>" node agents\agentBasic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agents_agentbasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/agents/agentBasic.js
[agents_agentcodeinterpreter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/agents/agentCodeInterpreter.js
[agents_agentfilesearch]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/agents/agentFileSearch.js
[files_filesbasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/files/filesBasic.js
[responses_responsebasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/responses/responseBasic.js
[responses_responsestream]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/responses/responseStream.js
[agents_agentfunctiontool]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/agents/agentFunctionTool.js
[agents_agentcontainerappbasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/agents/agentContainerAppBasic.js
[agents_agentconversationcurd]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/agents/agentConversationCurd.js
[agents_agentcurd]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/agents/agentCurd.js
[connections_connectionsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/connections/connectionsBasics.js
[conversations_conversationsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/conversations/conversationsBasics.js
[datasets_datasetsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/datasets/datasetsBasics.js
[deployments_deploymentsbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/deployments/deploymentsBasics.js
[indexes_indexesbasics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/indexes/indexesBasics.js
[redteam_redteambasic]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/ai/ai-projects/samples/v2-beta/javascript/redTeam/redTeamBasic.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-projects
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-projects/README.md
