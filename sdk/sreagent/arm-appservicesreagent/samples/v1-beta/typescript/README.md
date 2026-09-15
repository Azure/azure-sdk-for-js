# @azure/arm-appservicesreagent client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-appservicesreagent in some common scenarios.

| **File Name**                                                                                   | **Description**                                                                                                                            |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentSpacesConnectorsCreateOrUpdateSample.ts][agentspacesconnectorscreateorupdatesample]       | creates or updates an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_CreateOrUpdate.json                       |
| [agentSpacesConnectorsDeleteSample.ts][agentspacesconnectorsdeletesample]                       | delete an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_Delete.json                                           |
| [agentSpacesConnectorsGetSample.ts][agentspacesconnectorsgetsample]                             | get the properties of an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_Get.json                               |
| [agentSpacesConnectorsListAllSecretsSample.ts][agentspacesconnectorslistallsecretssample]       | list all secrets for AgentSpace Connectors x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListAllSecrets.json                        |
| [agentSpacesConnectorsListByAgentSpaceSample.ts][agentspacesconnectorslistbyagentspacesample]   | get all the connectors for an Agent Space x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListByAgentSpace.json                       |
| [agentSpacesConnectorsListSecretsSample.ts][agentspacesconnectorslistsecretssample]             | list secrets for an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListSecrets.json                            |
| [agentSpacesCreateOrUpdateSample.ts][agentspacescreateorupdatesample]                           | creates or updates an Agent Space x-ms-original-file: 2026-01-01/AgentSpaces_CreateOrUpdate.json                                           |
| [agentSpacesDeleteSample.ts][agentspacesdeletesample]                                           | delete an Agent Space x-ms-original-file: 2026-01-01/AgentSpaces_Delete.json                                                               |
| [agentSpacesGetSample.ts][agentspacesgetsample]                                                 | get the properties of an Agent Space x-ms-original-file: 2026-01-01/AgentSpaces_Get.json                                                   |
| [agentSpacesListByResourceGroupSample.ts][agentspaceslistbyresourcegroupsample]                 | get all the agent spaces in a resource group x-ms-original-file: 2026-01-01/AgentSpaces_ListByResourceGroup.json                           |
| [agentSpacesListBySubscriptionSample.ts][agentspaceslistbysubscriptionsample]                   | get all agent spaces for a subscription x-ms-original-file: 2026-01-01/AgentSpaces_ListBySubscription.json                                 |
| [agentSpacesUpdateSample.ts][agentspacesupdatesample]                                           | update Agent Space's properties x-ms-original-file: 2026-01-01/AgentSpaces_Update.json                                                     |
| [agentsConnectorsCreateOrUpdateSample.ts][agentsconnectorscreateorupdatesample]                 | creates or updates an Agent Connector x-ms-original-file: 2026-01-01/AgentsConnectors_CreateOrUpdate.json                                  |
| [agentsConnectorsDeleteSample.ts][agentsconnectorsdeletesample]                                 | delete an Agent Connector x-ms-original-file: 2026-01-01/AgentsConnectors_Delete.json                                                      |
| [agentsConnectorsGetSample.ts][agentsconnectorsgetsample]                                       | get the properties of an Agent Connector x-ms-original-file: 2026-01-01/AgentsConnectors_Get.json                                          |
| [agentsConnectorsListByAgentSample.ts][agentsconnectorslistbyagentsample]                       | get all the connectors for an Agent x-ms-original-file: 2026-01-01/AgentsConnectors_ListByAgent.json                                       |
| [agentsConnectorsListSecretsSample.ts][agentsconnectorslistsecretssample]                       | get a Data Connector with secrets from an Agent x-ms-original-file: 2026-01-01/AgentsConnectors_ListSecrets.json                           |
| [agentsConnectorsListWithSecretsByAgentSample.ts][agentsconnectorslistwithsecretsbyagentsample] | list all Data Connectors with secrets from an Agent x-ms-original-file: 2026-01-01/AgentsConnectors_ListWithSecretsByAgent.json            |
| [agentsCreateOrUpdateSample.ts][agentscreateorupdatesample]                                     | creates or updates an Agent x-ms-original-file: 2026-01-01/Agents_CreateOrUpdate.json                                                      |
| [agentsDeleteSample.ts][agentsdeletesample]                                                     | delete an Agent x-ms-original-file: 2026-01-01/Agents_Delete.json                                                                          |
| [agentsGetSample.ts][agentsgetsample]                                                           | get the properties of an Agent x-ms-original-file: 2026-01-01/Agents_Get.json                                                              |
| [agentsListByResourceGroupSample.ts][agentslistbyresourcegroupsample]                           | get all the agents in a resource group x-ms-original-file: 2026-01-01/Agents_ListByResourceGroup.json                                      |
| [agentsListBySubscriptionSample.ts][agentslistbysubscriptionsample]                             | get all agents for a subscription x-ms-original-file: 2026-01-01/Agents_ListBySubscription.json                                            |
| [agentsStartSample.ts][agentsstartsample]                                                       | start an Agent x-ms-original-file: 2026-01-01/Agents_Start.json                                                                            |
| [agentsStopSample.ts][agentsstopsample]                                                         | stop an Agent x-ms-original-file: 2026-01-01/Agents_Stop.json                                                                              |
| [agentsUpdateSample.ts][agentsupdatesample]                                                     | update Agent's properties x-ms-original-file: 2026-01-01/Agents_Update.json                                                                |
| [supportedAgentModelsListByLocationSample.ts][supportedagentmodelslistbylocationsample]         | list SupportedAgentModel resources by SubscriptionLocationResource x-ms-original-file: 2026-01-01/SupportedAgentModels_ListByLocation.json |

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
node dist/agentSpacesConnectorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/agentSpacesConnectorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentspacesconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesConnectorsCreateOrUpdateSample.ts
[agentspacesconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesConnectorsDeleteSample.ts
[agentspacesconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesConnectorsGetSample.ts
[agentspacesconnectorslistallsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesConnectorsListAllSecretsSample.ts
[agentspacesconnectorslistbyagentspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesConnectorsListByAgentSpaceSample.ts
[agentspacesconnectorslistsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesConnectorsListSecretsSample.ts
[agentspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesCreateOrUpdateSample.ts
[agentspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesDeleteSample.ts
[agentspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesGetSample.ts
[agentspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesListByResourceGroupSample.ts
[agentspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesListBySubscriptionSample.ts
[agentspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentSpacesUpdateSample.ts
[agentsconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsConnectorsCreateOrUpdateSample.ts
[agentsconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsConnectorsDeleteSample.ts
[agentsconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsConnectorsGetSample.ts
[agentsconnectorslistbyagentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsConnectorsListByAgentSample.ts
[agentsconnectorslistsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsConnectorsListSecretsSample.ts
[agentsconnectorslistwithsecretsbyagentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsConnectorsListWithSecretsByAgentSample.ts
[agentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsCreateOrUpdateSample.ts
[agentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsDeleteSample.ts
[agentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsGetSample.ts
[agentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsListByResourceGroupSample.ts
[agentslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsListBySubscriptionSample.ts
[agentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsStartSample.ts
[agentsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsStopSample.ts
[agentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/agentsUpdateSample.ts
[supportedagentmodelslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/typescript/src/supportedAgentModelsListByLocationSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-appservicesreagent?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sreagent/arm-appservicesreagent/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
