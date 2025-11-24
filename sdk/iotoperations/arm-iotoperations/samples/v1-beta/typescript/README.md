# @azure/arm-iotoperations client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-iotoperations in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                           |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [brokerAuthenticationCreateOrUpdateSample.ts][brokerauthenticationcreateorupdatesample]           | create a BrokerAuthenticationResource x-ms-original-file: 2024-11-01/BrokerAuthentication_CreateOrUpdate_Complex.json                                     |
| [brokerAuthenticationDeleteSample.ts][brokerauthenticationdeletesample]                           | delete a BrokerAuthenticationResource x-ms-original-file: 2024-11-01/BrokerAuthentication_Delete_MaximumSet_Gen.json                                      |
| [brokerAuthenticationGetSample.ts][brokerauthenticationgetsample]                                 | get a BrokerAuthenticationResource x-ms-original-file: 2024-11-01/BrokerAuthentication_Get_MaximumSet_Gen.json                                            |
| [brokerAuthenticationListByResourceGroupSample.ts][brokerauthenticationlistbyresourcegroupsample] | list BrokerAuthenticationResource resources by BrokerResource x-ms-original-file: 2024-11-01/BrokerAuthentication_ListByResourceGroup_MaximumSet_Gen.json |
| [brokerAuthorizationCreateOrUpdateSample.ts][brokerauthorizationcreateorupdatesample]             | create a BrokerAuthorizationResource x-ms-original-file: 2024-11-01/BrokerAuthorization_CreateOrUpdate_Complex.json                                       |
| [brokerAuthorizationDeleteSample.ts][brokerauthorizationdeletesample]                             | delete a BrokerAuthorizationResource x-ms-original-file: 2024-11-01/BrokerAuthorization_Delete_MaximumSet_Gen.json                                        |
| [brokerAuthorizationGetSample.ts][brokerauthorizationgetsample]                                   | get a BrokerAuthorizationResource x-ms-original-file: 2024-11-01/BrokerAuthorization_Get_MaximumSet_Gen.json                                              |
| [brokerAuthorizationListByResourceGroupSample.ts][brokerauthorizationlistbyresourcegroupsample]   | list BrokerAuthorizationResource resources by BrokerResource x-ms-original-file: 2024-11-01/BrokerAuthorization_ListByResourceGroup_MaximumSet_Gen.json   |
| [brokerCreateOrUpdateSample.ts][brokercreateorupdatesample]                                       | create a BrokerResource x-ms-original-file: 2024-11-01/Broker_CreateOrUpdate_Complex.json                                                                 |
| [brokerDeleteSample.ts][brokerdeletesample]                                                       | delete a BrokerResource x-ms-original-file: 2024-11-01/Broker_Delete_MaximumSet_Gen.json                                                                  |
| [brokerGetSample.ts][brokergetsample]                                                             | get a BrokerResource x-ms-original-file: 2024-11-01/Broker_Get_MaximumSet_Gen.json                                                                        |
| [brokerListByResourceGroupSample.ts][brokerlistbyresourcegroupsample]                             | list BrokerResource resources by InstanceResource x-ms-original-file: 2024-11-01/Broker_ListByResourceGroup_MaximumSet_Gen.json                           |
| [brokerListenerCreateOrUpdateSample.ts][brokerlistenercreateorupdatesample]                       | create a BrokerListenerResource x-ms-original-file: 2024-11-01/BrokerListener_CreateOrUpdate_Complex.json                                                 |
| [brokerListenerDeleteSample.ts][brokerlistenerdeletesample]                                       | delete a BrokerListenerResource x-ms-original-file: 2024-11-01/BrokerListener_Delete_MaximumSet_Gen.json                                                  |
| [brokerListenerGetSample.ts][brokerlistenergetsample]                                             | get a BrokerListenerResource x-ms-original-file: 2024-11-01/BrokerListener_Get_MaximumSet_Gen.json                                                        |
| [brokerListenerListByResourceGroupSample.ts][brokerlistenerlistbyresourcegroupsample]             | list BrokerListenerResource resources by BrokerResource x-ms-original-file: 2024-11-01/BrokerListener_ListByResourceGroup_MaximumSet_Gen.json             |
| [dataflowCreateOrUpdateSample.ts][dataflowcreateorupdatesample]                                   | create a DataflowResource x-ms-original-file: 2024-11-01/Dataflow_CreateOrUpdate_ComplexContextualization.json                                            |
| [dataflowDeleteSample.ts][dataflowdeletesample]                                                   | delete a DataflowResource x-ms-original-file: 2024-11-01/Dataflow_Delete_MaximumSet_Gen.json                                                              |
| [dataflowEndpointCreateOrUpdateSample.ts][dataflowendpointcreateorupdatesample]                   | create a DataflowEndpointResource x-ms-original-file: 2024-11-01/DataflowEndpoint_CreateOrUpdate_ADLSv2.json                                              |
| [dataflowEndpointDeleteSample.ts][dataflowendpointdeletesample]                                   | delete a DataflowEndpointResource x-ms-original-file: 2024-11-01/DataflowEndpoint_Delete_MaximumSet_Gen.json                                              |
| [dataflowEndpointGetSample.ts][dataflowendpointgetsample]                                         | get a DataflowEndpointResource x-ms-original-file: 2024-11-01/DataflowEndpoint_Get_MaximumSet_Gen.json                                                    |
| [dataflowEndpointListByResourceGroupSample.ts][dataflowendpointlistbyresourcegroupsample]         | list DataflowEndpointResource resources by InstanceResource x-ms-original-file: 2024-11-01/DataflowEndpoint_ListByResourceGroup_MaximumSet_Gen.json       |
| [dataflowGetSample.ts][dataflowgetsample]                                                         | get a DataflowResource x-ms-original-file: 2024-11-01/Dataflow_Get_MaximumSet_Gen.json                                                                    |
| [dataflowListByResourceGroupSample.ts][dataflowlistbyresourcegroupsample]                         | list DataflowResource resources by DataflowProfileResource x-ms-original-file: 2024-11-01/Dataflow_ListByProfileResource_MaximumSet_Gen.json              |
| [dataflowProfileCreateOrUpdateSample.ts][dataflowprofilecreateorupdatesample]                     | create a DataflowProfileResource x-ms-original-file: 2024-11-01/DataflowProfile_CreateOrUpdate_MaximumSet_Gen.json                                        |
| [dataflowProfileDeleteSample.ts][dataflowprofiledeletesample]                                     | delete a DataflowProfileResource x-ms-original-file: 2024-11-01/DataflowProfile_Delete_MaximumSet_Gen.json                                                |
| [dataflowProfileGetSample.ts][dataflowprofilegetsample]                                           | get a DataflowProfileResource x-ms-original-file: 2024-11-01/DataflowProfile_Get_MaximumSet_Gen.json                                                      |
| [dataflowProfileListByResourceGroupSample.ts][dataflowprofilelistbyresourcegroupsample]           | list DataflowProfileResource resources by InstanceResource x-ms-original-file: 2024-11-01/DataflowProfile_ListByResourceGroup_MaximumSet_Gen.json         |
| [instanceCreateOrUpdateSample.ts][instancecreateorupdatesample]                                   | create a InstanceResource x-ms-original-file: 2024-11-01/Instance_CreateOrUpdate_MaximumSet_Gen.json                                                      |
| [instanceDeleteSample.ts][instancedeletesample]                                                   | delete a InstanceResource x-ms-original-file: 2024-11-01/Instance_Delete_MaximumSet_Gen.json                                                              |
| [instanceGetSample.ts][instancegetsample]                                                         | get a InstanceResource x-ms-original-file: 2024-11-01/Instance_Get_MaximumSet_Gen.json                                                                    |
| [instanceListByResourceGroupSample.ts][instancelistbyresourcegroupsample]                         | list InstanceResource resources by resource group x-ms-original-file: 2024-11-01/Instance_ListByResourceGroup_MaximumSet_Gen.json                         |
| [instanceListBySubscriptionSample.ts][instancelistbysubscriptionsample]                           | list InstanceResource resources by subscription ID x-ms-original-file: 2024-11-01/Instance_ListBySubscription_MaximumSet_Gen.json                         |
| [instanceUpdateSample.ts][instanceupdatesample]                                                   | update a InstanceResource x-ms-original-file: 2024-11-01/Instance_Update_MaximumSet_Gen.json                                                              |
| [operationsListSample.ts][operationslistsample]                                                   | list the operations for the provider x-ms-original-file: 2024-11-01/Operations_List_MaximumSet_Gen.json                                                   |

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
node dist/brokerAuthenticationCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/brokerAuthenticationCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[brokerauthenticationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthenticationCreateOrUpdateSample.ts
[brokerauthenticationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthenticationDeleteSample.ts
[brokerauthenticationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthenticationGetSample.ts
[brokerauthenticationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthenticationListByResourceGroupSample.ts
[brokerauthorizationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthorizationCreateOrUpdateSample.ts
[brokerauthorizationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthorizationDeleteSample.ts
[brokerauthorizationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthorizationGetSample.ts
[brokerauthorizationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerAuthorizationListByResourceGroupSample.ts
[brokercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerCreateOrUpdateSample.ts
[brokerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerDeleteSample.ts
[brokergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerGetSample.ts
[brokerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerListByResourceGroupSample.ts
[brokerlistenercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerListenerCreateOrUpdateSample.ts
[brokerlistenerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerListenerDeleteSample.ts
[brokerlistenergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerListenerGetSample.ts
[brokerlistenerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/brokerListenerListByResourceGroupSample.ts
[dataflowcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowCreateOrUpdateSample.ts
[dataflowdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowDeleteSample.ts
[dataflowendpointcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowEndpointCreateOrUpdateSample.ts
[dataflowendpointdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowEndpointDeleteSample.ts
[dataflowendpointgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowEndpointGetSample.ts
[dataflowendpointlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowEndpointListByResourceGroupSample.ts
[dataflowgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowGetSample.ts
[dataflowlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowListByResourceGroupSample.ts
[dataflowprofilecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowProfileCreateOrUpdateSample.ts
[dataflowprofiledeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowProfileDeleteSample.ts
[dataflowprofilegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowProfileGetSample.ts
[dataflowprofilelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/dataflowProfileListByResourceGroupSample.ts
[instancecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/instanceCreateOrUpdateSample.ts
[instancedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/instanceDeleteSample.ts
[instancegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/instanceGetSample.ts
[instancelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/instanceListByResourceGroupSample.ts
[instancelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/instanceListBySubscriptionSample.ts
[instanceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/instanceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotoperations/arm-iotoperations/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-iotoperations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotoperations/arm-iotoperations/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
