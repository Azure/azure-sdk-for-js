# @azure/arm-healthcareapis client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-healthcareapis in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dicomServicesCreateOrUpdateSample.ts][dicomservicescreateorupdatesample]                                               | creates or updates a DICOM Service resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Create.json                                     |
| [dicomServicesDeleteSample.ts][dicomservicesdeletesample]                                                               | deletes a DICOM Service. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Delete.json                                                                                       |
| [dicomServicesGetSample.ts][dicomservicesgetsample]                                                                     | gets the properties of the specified DICOM Service. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Get.json                                                               |
| [dicomServicesListByWorkspaceSample.ts][dicomserviceslistbyworkspacesample]                                             | lists all DICOM Services for the given workspace x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_List.json                                                                 |
| [dicomServicesUpdateSample.ts][dicomservicesupdatesample]                                                               | patch DICOM Service details. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Patch.json                                                                                    |
| [fhirDestinationsListByIotConnectorSample.ts][fhirdestinationslistbyiotconnectorsample]                                 | lists all FHIR destinations for the given IoT Connector x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_List.json                                           |
| [fhirServicesCreateOrUpdateSample.ts][fhirservicescreateorupdatesample]                                                 | creates or updates a FHIR Service resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Create.json                                        |
| [fhirServicesDeleteSample.ts][fhirservicesdeletesample]                                                                 | deletes a FHIR Service. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Delete.json                                                                                          |
| [fhirServicesGetSample.ts][fhirservicesgetsample]                                                                       | gets the properties of the specified FHIR Service. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Get.json                                                                  |
| [fhirServicesListByWorkspaceSample.ts][fhirserviceslistbyworkspacesample]                                               | lists all FHIR Services for the given workspace x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_List.json                                                                    |
| [fhirServicesUpdateSample.ts][fhirservicesupdatesample]                                                                 | patch FHIR Service details. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Patch.json                                                                                       |
| [iotConnectorFhirDestinationCreateOrUpdateSample.ts][iotconnectorfhirdestinationcreateorupdatesample]                   | creates or updates an IoT Connector FHIR destination resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Create.json    |
| [iotConnectorFhirDestinationDeleteSample.ts][iotconnectorfhirdestinationdeletesample]                                   | deletes an IoT Connector FHIR destination. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Delete.json                                                      |
| [iotConnectorFhirDestinationGetSample.ts][iotconnectorfhirdestinationgetsample]                                         | gets the properties of the specified Iot Connector FHIR destination. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Get.json                               |
| [iotConnectorsCreateOrUpdateSample.ts][iotconnectorscreateorupdatesample]                                               | creates or updates an IoT Connector resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Create.json                                     |
| [iotConnectorsDeleteSample.ts][iotconnectorsdeletesample]                                                               | deletes an IoT Connector. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Delete.json                                                                                       |
| [iotConnectorsGetSample.ts][iotconnectorsgetsample]                                                                     | gets the properties of the specified IoT Connector. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Get.json                                                                |
| [iotConnectorsListByWorkspaceSample.ts][iotconnectorslistbyworkspacesample]                                             | lists all IoT Connectors for the given workspace x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_List.json                                                                  |
| [iotConnectorsUpdateSample.ts][iotconnectorsupdatesample]                                                               | patch an IoT Connector. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Patch.json                                                                                          |
| [operationResultsGetSample.ts][operationresultsgetsample]                                                               | get the operation result for a long running operation. x-ms-original-file: 2025-04-01-preview/OperationResultsGet.json                                                                        |
| [operationsListSample.ts][operationslistsample]                                                                         | lists all of the available operations supported by Microsoft Healthcare resource provider. x-ms-original-file: 2025-04-01-preview/OperationsList.json                                         |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                     | update the state of the specified private endpoint connection associated with the service. x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreatePrivateEndpointConnection.json          |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                     | deletes a private endpoint connection. x-ms-original-file: 2025-04-01-preview/legacy/ServiceDeletePrivateEndpointConnection.json                                                              |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                           | gets the specified private endpoint connection associated with the service. x-ms-original-file: 2025-04-01-preview/legacy/ServiceGetPrivateEndpointConnection.json                            |
| [privateEndpointConnectionsListByServiceSample.ts][privateendpointconnectionslistbyservicesample]                       | lists all private endpoint connections for a service. x-ms-original-file: 2025-04-01-preview/legacy/ServiceListPrivateEndpointConnections.json                                                |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                       | gets a private link resource that need to be created for a service. x-ms-original-file: 2025-04-01-preview/legacy/PrivateLinkResourceGet.json                                                 |
| [privateLinkResourcesListByServiceSample.ts][privatelinkresourceslistbyservicesample]                                   | gets the private link resources that need to be created for a service. x-ms-original-file: 2025-04-01-preview/legacy/PrivateLinkResourcesListByService.json                                   |
| [servicesCheckNameAvailabilitySample.ts][serviceschecknameavailabilitysample]                                           | check if a service instance name is available. x-ms-original-file: 2025-04-01-preview/CheckNameAvailabilityPost.json                                                                          |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]                                                         | create or update the metadata of a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreate.json                                                                         |
| [servicesDeleteSample.ts][servicesdeletesample]                                                                         | delete a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServiceDelete.json                                                                                                   |
| [servicesGetSample.ts][servicesgetsample]                                                                               | get the metadata of a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServiceGet.json                                                                                         |
| [servicesListByResourceGroupSample.ts][serviceslistbyresourcegroupsample]                                               | get all the service instances in a resource group. x-ms-original-file: 2025-04-01-preview/legacy/ServiceListByResourceGroup.json                                                              |
| [servicesListSample.ts][serviceslistsample]                                                                             | get all the service instances in a subscription. x-ms-original-file: 2025-04-01-preview/legacy/ServiceList.json                                                                               |
| [servicesUpdateSample.ts][servicesupdatesample]                                                                         | update the metadata of a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServicePatch.json                                                                                    |
| [workspacePrivateEndpointConnectionsCreateOrUpdateSample.ts][workspaceprivateendpointconnectionscreateorupdatesample]   | update the state of the specified private endpoint connection associated with the workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceCreatePrivateEndpointConnection.json |
| [workspacePrivateEndpointConnectionsDeleteSample.ts][workspaceprivateendpointconnectionsdeletesample]                   | deletes a private endpoint connection. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceDeletePrivateEndpointConnection.json                                                       |
| [workspacePrivateEndpointConnectionsGetSample.ts][workspaceprivateendpointconnectionsgetsample]                         | gets the specified private endpoint connection associated with the workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceGetPrivateEndpointConnection.json                   |
| [workspacePrivateEndpointConnectionsListByWorkspaceSample.ts][workspaceprivateendpointconnectionslistbyworkspacesample] | lists all private endpoint connections for a workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceListPrivateEndpointConnections.json                                       |
| [workspacePrivateLinkResourcesGetSample.ts][workspaceprivatelinkresourcesgetsample]                                     | gets a private link resource that need to be created for a workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspacePrivateLinkResourceGet.json                                 |
| [workspacePrivateLinkResourcesListByWorkspaceSample.ts][workspaceprivatelinkresourceslistbyworkspacesample]             | gets the private link resources that need to be created for a workspace. x-ms-original-file: 2025-04-01-preview/privatelink/PrivateLinkResourcesListByWorkspace.json                          |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                                                     | creates or updates a workspace resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Create.json                                               |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                                     | deletes a specified workspace. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Delete.json                                                                                       |
| [workspacesGetSample.ts][workspacesgetsample]                                                                           | gets the properties of the specified workspace. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Get.json                                                                         |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                                           | lists all the available workspaces under the specified resource group. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_ListByResourceGroup.json                                  |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                                             | lists all the available workspaces under the specified subscription. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_ListBySubscription.json                                     |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                                     | patch workspace details. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Patch.json                                                                                              |

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
node dist/dicomServicesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/dicomServicesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dicomservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/dicomServicesCreateOrUpdateSample.ts
[dicomservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/dicomServicesDeleteSample.ts
[dicomservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/dicomServicesGetSample.ts
[dicomserviceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/dicomServicesListByWorkspaceSample.ts
[dicomservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/dicomServicesUpdateSample.ts
[fhirdestinationslistbyiotconnectorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/fhirDestinationsListByIotConnectorSample.ts
[fhirservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/fhirServicesCreateOrUpdateSample.ts
[fhirservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/fhirServicesDeleteSample.ts
[fhirservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/fhirServicesGetSample.ts
[fhirserviceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/fhirServicesListByWorkspaceSample.ts
[fhirservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/fhirServicesUpdateSample.ts
[iotconnectorfhirdestinationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorFhirDestinationCreateOrUpdateSample.ts
[iotconnectorfhirdestinationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorFhirDestinationDeleteSample.ts
[iotconnectorfhirdestinationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorFhirDestinationGetSample.ts
[iotconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorsCreateOrUpdateSample.ts
[iotconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorsDeleteSample.ts
[iotconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorsGetSample.ts
[iotconnectorslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorsListByWorkspaceSample.ts
[iotconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/iotConnectorsUpdateSample.ts
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/operationResultsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/privateEndpointConnectionsListByServiceSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/privateLinkResourcesListByServiceSample.ts
[serviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/servicesCheckNameAvailabilitySample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/servicesDeleteSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/servicesGetSample.ts
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/servicesListByResourceGroupSample.ts
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/servicesListSample.ts
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/servicesUpdateSample.ts
[workspaceprivateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacePrivateEndpointConnectionsCreateOrUpdateSample.ts
[workspaceprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacePrivateEndpointConnectionsDeleteSample.ts
[workspaceprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacePrivateEndpointConnectionsGetSample.ts
[workspaceprivateendpointconnectionslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacePrivateEndpointConnectionsListByWorkspaceSample.ts
[workspaceprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacePrivateLinkResourcesGetSample.ts
[workspaceprivatelinkresourceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacePrivateLinkResourcesListByWorkspaceSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-healthcareapis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthcareapis/arm-healthcareapis/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
