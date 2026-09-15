# @azure/arm-appservicesreagent client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-appservicesreagent in some common scenarios.

| **File Name**                                                                                   | **Description**                                                                                                                            |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentSpacesConnectorsCreateOrUpdateSample.js][agentspacesconnectorscreateorupdatesample]       | creates or updates an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_CreateOrUpdate.json                       |
| [agentSpacesConnectorsDeleteSample.js][agentspacesconnectorsdeletesample]                       | delete an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_Delete.json                                           |
| [agentSpacesConnectorsGetSample.js][agentspacesconnectorsgetsample]                             | get the properties of an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_Get.json                               |
| [agentSpacesConnectorsListAllSecretsSample.js][agentspacesconnectorslistallsecretssample]       | list all secrets for AgentSpace Connectors x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListAllSecrets.json                        |
| [agentSpacesConnectorsListByAgentSpaceSample.js][agentspacesconnectorslistbyagentspacesample]   | get all the connectors for an Agent Space x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListByAgentSpace.json                       |
| [agentSpacesConnectorsListSecretsSample.js][agentspacesconnectorslistsecretssample]             | list secrets for an Agent Space Connector x-ms-original-file: 2026-01-01/AgentSpacesConnectors_ListSecrets.json                            |
| [agentSpacesCreateOrUpdateSample.js][agentspacescreateorupdatesample]                           | creates or updates an Agent Space x-ms-original-file: 2026-01-01/AgentSpaces_CreateOrUpdate.json                                           |
| [agentSpacesDeleteSample.js][agentspacesdeletesample]                                           | delete an Agent Space x-ms-original-file: 2026-01-01/AgentSpaces_Delete.json                                                               |
| [agentSpacesGetSample.js][agentspacesgetsample]                                                 | get the properties of an Agent Space x-ms-original-file: 2026-01-01/AgentSpaces_Get.json                                                   |
| [agentSpacesListByResourceGroupSample.js][agentspaceslistbyresourcegroupsample]                 | get all the agent spaces in a resource group x-ms-original-file: 2026-01-01/AgentSpaces_ListByResourceGroup.json                           |
| [agentSpacesListBySubscriptionSample.js][agentspaceslistbysubscriptionsample]                   | get all agent spaces for a subscription x-ms-original-file: 2026-01-01/AgentSpaces_ListBySubscription.json                                 |
| [agentSpacesUpdateSample.js][agentspacesupdatesample]                                           | update Agent Space's properties x-ms-original-file: 2026-01-01/AgentSpaces_Update.json                                                     |
| [agentsConnectorsCreateOrUpdateSample.js][agentsconnectorscreateorupdatesample]                 | creates or updates an Agent Connector x-ms-original-file: 2026-01-01/AgentsConnectors_CreateOrUpdate.json                                  |
| [agentsConnectorsDeleteSample.js][agentsconnectorsdeletesample]                                 | delete an Agent Connector x-ms-original-file: 2026-01-01/AgentsConnectors_Delete.json                                                      |
| [agentsConnectorsGetSample.js][agentsconnectorsgetsample]                                       | get the properties of an Agent Connector x-ms-original-file: 2026-01-01/AgentsConnectors_Get.json                                          |
| [agentsConnectorsListByAgentSample.js][agentsconnectorslistbyagentsample]                       | get all the connectors for an Agent x-ms-original-file: 2026-01-01/AgentsConnectors_ListByAgent.json                                       |
| [agentsConnectorsListSecretsSample.js][agentsconnectorslistsecretssample]                       | get a Data Connector with secrets from an Agent x-ms-original-file: 2026-01-01/AgentsConnectors_ListSecrets.json                           |
| [agentsConnectorsListWithSecretsByAgentSample.js][agentsconnectorslistwithsecretsbyagentsample] | list all Data Connectors with secrets from an Agent x-ms-original-file: 2026-01-01/AgentsConnectors_ListWithSecretsByAgent.json            |
| [agentsCreateOrUpdateSample.js][agentscreateorupdatesample]                                     | creates or updates an Agent x-ms-original-file: 2026-01-01/Agents_CreateOrUpdate.json                                                      |
| [agentsDeleteSample.js][agentsdeletesample]                                                     | delete an Agent x-ms-original-file: 2026-01-01/Agents_Delete.json                                                                          |
| [agentsGetSample.js][agentsgetsample]                                                           | get the properties of an Agent x-ms-original-file: 2026-01-01/Agents_Get.json                                                              |
| [agentsListByResourceGroupSample.js][agentslistbyresourcegroupsample]                           | get all the agents in a resource group x-ms-original-file: 2026-01-01/Agents_ListByResourceGroup.json                                      |
| [agentsListBySubscriptionSample.js][agentslistbysubscriptionsample]                             | get all agents for a subscription x-ms-original-file: 2026-01-01/Agents_ListBySubscription.json                                            |
| [agentsStartSample.js][agentsstartsample]                                                       | start an Agent x-ms-original-file: 2026-01-01/Agents_Start.json                                                                            |
| [agentsStopSample.js][agentsstopsample]                                                         | stop an Agent x-ms-original-file: 2026-01-01/Agents_Stop.json                                                                              |
| [agentsUpdateSample.js][agentsupdatesample]                                                     | update Agent's properties x-ms-original-file: 2026-01-01/Agents_Update.json                                                                |
| [supportedAgentModelsListByLocationSample.js][supportedagentmodelslistbylocationsample]         | list SupportedAgentModel resources by SubscriptionLocationResource x-ms-original-file: 2026-01-01/SupportedAgentModels_ListByLocation.json |

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
node agentSpacesConnectorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node agentSpacesConnectorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentspacesconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesConnectorsCreateOrUpdateSample.js
[agentspacesconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesConnectorsDeleteSample.js
[agentspacesconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesConnectorsGetSample.js
[agentspacesconnectorslistallsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesConnectorsListAllSecretsSample.js
[agentspacesconnectorslistbyagentspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesConnectorsListByAgentSpaceSample.js
[agentspacesconnectorslistsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesConnectorsListSecretsSample.js
[agentspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesCreateOrUpdateSample.js
[agentspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesDeleteSample.js
[agentspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesGetSample.js
[agentspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesListByResourceGroupSample.js
[agentspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesListBySubscriptionSample.js
[agentspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentSpacesUpdateSample.js
[agentsconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsConnectorsCreateOrUpdateSample.js
[agentsconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsConnectorsDeleteSample.js
[agentsconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsConnectorsGetSample.js
[agentsconnectorslistbyagentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsConnectorsListByAgentSample.js
[agentsconnectorslistsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsConnectorsListSecretsSample.js
[agentsconnectorslistwithsecretsbyagentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsConnectorsListWithSecretsByAgentSample.js
[agentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsCreateOrUpdateSample.js
[agentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsDeleteSample.js
[agentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsGetSample.js
[agentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsListByResourceGroupSample.js
[agentslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsListBySubscriptionSample.js
[agentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsStartSample.js
[agentsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsStopSample.js
[agentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/agentsUpdateSample.js
[supportedagentmodelslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sreagent/arm-appservicesreagent/samples/v1-beta/javascript/supportedAgentModelsListByLocationSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-appservicesreagent?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sreagent/arm-appservicesreagent/README.md
