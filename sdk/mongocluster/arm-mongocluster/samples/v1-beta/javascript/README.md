# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [firewallRulesCreateOrUpdateSample.js][firewallrulescreateorupdatesample]                                   | Creates a new firewall rule or updates an existing firewall rule on a mongo cluster. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_FirewallRuleCreate.json                                                                                     |
| [firewallRulesDeleteSample.js][firewallrulesdeletesample]                                                   | Deletes a mongo cluster firewall rule. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_FirewallRuleDelete.json                                                                                                                                   |
| [firewallRulesGetSample.js][firewallrulesgetsample]                                                         | Gets information about a mongo cluster firewall rule. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_FirewallRuleGet.json                                                                                                                       |
| [firewallRulesListByMongoClusterSample.js][firewallruleslistbymongoclustersample]                           | List all the firewall rules in a given mongo cluster. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_FirewallRuleList.json                                                                                                                      |
| [mongoClustersCheckNameAvailabilitySample.js][mongoclusterschecknameavailabilitysample]                     | Check if mongo cluster name is available for use. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_NameAvailability.json                                                                                                                          |
| [mongoClustersCreateOrUpdateSample.js][mongoclusterscreateorupdatesample]                                   | Create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_CreatePITR.json                                           |
| [mongoClustersDeleteSample.js][mongoclustersdeletesample]                                                   | Deletes a mongo cluster. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_Delete.json                                                                                                                                                             |
| [mongoClustersGetSample.js][mongoclustersgetsample]                                                         | Gets information about a mongo cluster. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_Get.json                                                                                                                                                 |
| [mongoClustersListByResourceGroupSample.js][mongoclusterslistbyresourcegroupsample]                         | List all the mongo clusters in a given resource group. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_ListByResourceGroup.json                                                                                                                  |
| [mongoClustersListConnectionStringsSample.js][mongoclusterslistconnectionstringssample]                     | List mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_ListConnectionStrings.json |
| [mongoClustersListSample.js][mongoclusterslistsample]                                                       | List all the mongo clusters in a given subscription. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_List.json                                                                                                                                   |
| [mongoClustersUpdateSample.js][mongoclustersupdatesample]                                                   | Updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition. x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_PatchPrivateNetworkAccess.json                     |
| [operationsListSample.js][operationslistsample]                                                             | List the operations for the provider x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/Operations_List.json                                                                                                                                                      |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                         | Create a Private endpoint connection x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_PrivateEndpointConnectionPut.json                                                                                                                           |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                         | Delete the private endpoint connection x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_PrivateEndpointConnectionDelete.json                                                                                                                      |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                               | Get a specific private connection x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_PrivateEndpointConnectionGet.json                                                                                                                              |
| [privateEndpointConnectionsListByMongoClusterSample.js][privateendpointconnectionslistbymongoclustersample] | List existing private connections x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_PrivateEndpointConnectionList.json                                                                                                                             |
| [privateLinksListByMongoClusterSample.js][privatelinkslistbymongoclustersample]                             | list private links on the given resource x-ms-original-file: specification/mongocluster/resource-manager/Microsoft.DocumentDB/preview/2024-03-01-preview/examples/MongoClusters_PrivateLinkResourceList.json                                                                                                                            |

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
node firewallRulesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env MONGOCLUSTER_SUBSCRIPTION_ID="<mongocluster subscription id>" MONGOCLUSTER_RESOURCE_GROUP="<mongocluster resource group>" node firewallRulesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/firewallRulesCreateOrUpdateSample.js
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/firewallRulesDeleteSample.js
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/firewallRulesGetSample.js
[firewallruleslistbymongoclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/firewallRulesListByMongoClusterSample.js
[mongoclusterschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersCheckNameAvailabilitySample.js
[mongoclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersCreateOrUpdateSample.js
[mongoclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersDeleteSample.js
[mongoclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersGetSample.js
[mongoclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersListByResourceGroupSample.js
[mongoclusterslistconnectionstringssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersListConnectionStringsSample.js
[mongoclusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersListSample.js
[mongoclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/mongoClustersUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbymongoclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/privateEndpointConnectionsListByMongoClusterSample.js
[privatelinkslistbymongoclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/javascript/privateLinksListByMongoClusterSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-mongocluster?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mongocluster/arm-mongocluster/README.md
