# @azure/arm-iotoperations client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-iotoperations in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                           |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [brokerAuthenticationCreateOrUpdateSample.js][brokerauthenticationcreateorupdatesample]           | create a BrokerAuthenticationResource x-ms-original-file: 2024-11-01/BrokerAuthentication_CreateOrUpdate_Complex.json                                     |
| [brokerAuthenticationDeleteSample.js][brokerauthenticationdeletesample]                           | delete a BrokerAuthenticationResource x-ms-original-file: 2024-11-01/BrokerAuthentication_Delete_MaximumSet_Gen.json                                      |
| [brokerAuthenticationGetSample.js][brokerauthenticationgetsample]                                 | get a BrokerAuthenticationResource x-ms-original-file: 2024-11-01/BrokerAuthentication_Get_MaximumSet_Gen.json                                            |
| [brokerAuthenticationListByResourceGroupSample.js][brokerauthenticationlistbyresourcegroupsample] | list BrokerAuthenticationResource resources by BrokerResource x-ms-original-file: 2024-11-01/BrokerAuthentication_ListByResourceGroup_MaximumSet_Gen.json |
| [brokerAuthorizationCreateOrUpdateSample.js][brokerauthorizationcreateorupdatesample]             | create a BrokerAuthorizationResource x-ms-original-file: 2024-11-01/BrokerAuthorization_CreateOrUpdate_Complex.json                                       |
| [brokerAuthorizationDeleteSample.js][brokerauthorizationdeletesample]                             | delete a BrokerAuthorizationResource x-ms-original-file: 2024-11-01/BrokerAuthorization_Delete_MaximumSet_Gen.json                                        |
| [brokerAuthorizationGetSample.js][brokerauthorizationgetsample]                                   | get a BrokerAuthorizationResource x-ms-original-file: 2024-11-01/BrokerAuthorization_Get_MaximumSet_Gen.json                                              |
| [brokerAuthorizationListByResourceGroupSample.js][brokerauthorizationlistbyresourcegroupsample]   | list BrokerAuthorizationResource resources by BrokerResource x-ms-original-file: 2024-11-01/BrokerAuthorization_ListByResourceGroup_MaximumSet_Gen.json   |
| [brokerCreateOrUpdateSample.js][brokercreateorupdatesample]                                       | create a BrokerResource x-ms-original-file: 2024-11-01/Broker_CreateOrUpdate_Complex.json                                                                 |
| [brokerDeleteSample.js][brokerdeletesample]                                                       | delete a BrokerResource x-ms-original-file: 2024-11-01/Broker_Delete_MaximumSet_Gen.json                                                                  |
| [brokerGetSample.js][brokergetsample]                                                             | get a BrokerResource x-ms-original-file: 2024-11-01/Broker_Get_MaximumSet_Gen.json                                                                        |
| [brokerListByResourceGroupSample.js][brokerlistbyresourcegroupsample]                             | list BrokerResource resources by InstanceResource x-ms-original-file: 2024-11-01/Broker_ListByResourceGroup_MaximumSet_Gen.json                           |
| [brokerListenerCreateOrUpdateSample.js][brokerlistenercreateorupdatesample]                       | create a BrokerListenerResource x-ms-original-file: 2024-11-01/BrokerListener_CreateOrUpdate_Complex.json                                                 |
| [brokerListenerDeleteSample.js][brokerlistenerdeletesample]                                       | delete a BrokerListenerResource x-ms-original-file: 2024-11-01/BrokerListener_Delete_MaximumSet_Gen.json                                                  |
| [brokerListenerGetSample.js][brokerlistenergetsample]                                             | get a BrokerListenerResource x-ms-original-file: 2024-11-01/BrokerListener_Get_MaximumSet_Gen.json                                                        |
| [brokerListenerListByResourceGroupSample.js][brokerlistenerlistbyresourcegroupsample]             | list BrokerListenerResource resources by BrokerResource x-ms-original-file: 2024-11-01/BrokerListener_ListByResourceGroup_MaximumSet_Gen.json             |
| [dataflowCreateOrUpdateSample.js][dataflowcreateorupdatesample]                                   | create a DataflowResource x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_ComplexContextualization.json                                            |
| [dataflowDeleteSample.js][dataflowdeletesample]                                                   | delete a DataflowResource x-ms-original-file: 2024-11-01/Dataflow_Delete_MaximumSet_Gen.json                                                              |
| [dataflowEndpointCreateOrUpdateSample.js][dataflowendpointcreateorupdatesample]                   | create a DataflowEndpointResource x-ms-original-file: 2024-11-01/DataflowEndpoint_CreateOrUpdate_ADLSv2.json                                              |
| [dataflowEndpointDeleteSample.js][dataflowendpointdeletesample]                                   | delete a DataflowEndpointResource x-ms-original-file: 2024-11-01/DataflowEndpoint_Delete_MaximumSet_Gen.json                                              |
| [dataflowEndpointGetSample.js][dataflowendpointgetsample]                                         | get a DataflowEndpointResource x-ms-original-file: 2024-11-01/DataflowEndpoint_Get_MaximumSet_Gen.json                                                    |
| [dataflowEndpointListByResourceGroupSample.js][dataflowendpointlistbyresourcegroupsample]         | list DataflowEndpointResource resources by InstanceResource x-ms-original-file: 2024-11-01/DataflowEndpoint_ListByResourceGroup_MaximumSet_Gen.json       |
| [dataflowGetSample.js][dataflowgetsample]                                                         | get a DataflowResource x-ms-original-file: 2024-11-01/Dataflow_Get_MaximumSet_Gen.json                                                                    |
| [dataflowListByResourceGroupSample.js][dataflowlistbyresourcegroupsample]                         | list DataflowResource resources by DataflowProfileResource x-ms-original-file: 2024-11-01/Dataflow_ListByProfileResource_MaximumSet_Gen.json              |
| [dataflowProfileCreateOrUpdateSample.js][dataflowprofilecreateorupdatesample]                     | create a DataflowProfileResource x-ms-original-file: 2024-11-01/DataflowProfile_CreateOrUpdate_MaximumSet_Gen.json                                        |
| [dataflowProfileDeleteSample.js][dataflowprofiledeletesample]                                     | delete a DataflowProfileResource x-ms-original-file: 2024-11-01/DataflowProfile_Delete_MaximumSet_Gen.json                                                |
| [dataflowProfileGetSample.js][dataflowprofilegetsample]                                           | get a DataflowProfileResource x-ms-original-file: 2024-11-01/DataflowProfile_Get_MaximumSet_Gen.json                                                      |
| [dataflowProfileListByResourceGroupSample.js][dataflowprofilelistbyresourcegroupsample]           | list DataflowProfileResource resources by InstanceResource x-ms-original-file: 2024-11-01/DataflowProfile_ListByResourceGroup_MaximumSet_Gen.json         |
| [instanceCreateOrUpdateSample.js][instancecreateorupdatesample]                                   | create a InstanceResource x-ms-original-file: 2024-11-01/Instance_CreateOrUpdate_MaximumSet_Gen.json                                                      |
| [instanceDeleteSample.js][instancedeletesample]                                                   | delete a InstanceResource x-ms-original-file: 2024-11-01/Instance_Delete_MaximumSet_Gen.json                                                              |
| [instanceGetSample.js][instancegetsample]                                                         | get a InstanceResource x-ms-original-file: 2024-11-01/Instance_Get_MaximumSet_Gen.json                                                                    |
| [instanceListByResourceGroupSample.js][instancelistbyresourcegroupsample]                         | list InstanceResource resources by resource group x-ms-original-file: 2024-11-01/Instance_ListByResourceGroup_MaximumSet_Gen.json                         |
| [instanceListBySubscriptionSample.js][instancelistbysubscriptionsample]                           | list InstanceResource resources by subscription ID x-ms-original-file: 2024-11-01/Instance_ListBySubscription_MaximumSet_Gen.json                         |
| [instanceUpdateSample.js][instanceupdatesample]                                                   | update a InstanceResource x-ms-original-file: 2024-11-01/Instance_Update_MaximumSet_Gen.json                                                              |
| [operationsListSample.js][operationslistsample]                                                   | list the operations for the provider x-ms-original-file: 2024-11-01/Operations_List_MaximumSet_Gen.json                                                   |

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
node brokerAuthenticationCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node brokerAuthenticationCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[brokerauthenticationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthenticationCreateOrUpdateSample.js
[brokerauthenticationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthenticationDeleteSample.js
[brokerauthenticationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthenticationGetSample.js
[brokerauthenticationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthenticationListByResourceGroupSample.js
[brokerauthorizationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthorizationCreateOrUpdateSample.js
[brokerauthorizationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthorizationDeleteSample.js
[brokerauthorizationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthorizationGetSample.js
[brokerauthorizationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerAuthorizationListByResourceGroupSample.js
[brokercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerCreateOrUpdateSample.js
[brokerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerDeleteSample.js
[brokergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerGetSample.js
[brokerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerListByResourceGroupSample.js
[brokerlistenercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerListenerCreateOrUpdateSample.js
[brokerlistenerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerListenerDeleteSample.js
[brokerlistenergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerListenerGetSample.js
[brokerlistenerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/brokerListenerListByResourceGroupSample.js
[dataflowcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowCreateOrUpdateSample.js
[dataflowdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowDeleteSample.js
[dataflowendpointcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowEndpointCreateOrUpdateSample.js
[dataflowendpointdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowEndpointDeleteSample.js
[dataflowendpointgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowEndpointGetSample.js
[dataflowendpointlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowEndpointListByResourceGroupSample.js
[dataflowgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowGetSample.js
[dataflowlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowListByResourceGroupSample.js
[dataflowprofilecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowProfileCreateOrUpdateSample.js
[dataflowprofiledeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowProfileDeleteSample.js
[dataflowprofilegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowProfileGetSample.js
[dataflowprofilelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/dataflowProfileListByResourceGroupSample.js
[instancecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/instanceCreateOrUpdateSample.js
[instancedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/instanceDeleteSample.js
[instancegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/instanceGetSample.js
[instancelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/instanceListByResourceGroupSample.js
[instancelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/instanceListBySubscriptionSample.js
[instanceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/instanceUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-iotoperations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotoperations/arm-iotoperations/README.md
