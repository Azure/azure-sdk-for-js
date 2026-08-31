# @azure/arm-healthcareapis client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-healthcareapis in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dicomServicesCreateOrUpdateSample.js][dicomservicescreateorupdatesample]                                               | creates or updates a DICOM Service resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Create.json                                     |
| [dicomServicesDeleteSample.js][dicomservicesdeletesample]                                                               | deletes a DICOM Service. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Delete.json                                                                                       |
| [dicomServicesGetSample.js][dicomservicesgetsample]                                                                     | gets the properties of the specified DICOM Service. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Get.json                                                               |
| [dicomServicesListByWorkspaceSample.js][dicomserviceslistbyworkspacesample]                                             | lists all DICOM Services for the given workspace x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_List.json                                                                 |
| [dicomServicesUpdateSample.js][dicomservicesupdatesample]                                                               | patch DICOM Service details. x-ms-original-file: 2025-04-01-preview/dicomservices/DicomServices_Patch.json                                                                                    |
| [fhirDestinationsListByIotConnectorSample.js][fhirdestinationslistbyiotconnectorsample]                                 | lists all FHIR destinations for the given IoT Connector x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_List.json                                           |
| [fhirServicesCreateOrUpdateSample.js][fhirservicescreateorupdatesample]                                                 | creates or updates a FHIR Service resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Create.json                                        |
| [fhirServicesDeleteSample.js][fhirservicesdeletesample]                                                                 | deletes a FHIR Service. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Delete.json                                                                                          |
| [fhirServicesGetSample.js][fhirservicesgetsample]                                                                       | gets the properties of the specified FHIR Service. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Get.json                                                                  |
| [fhirServicesListByWorkspaceSample.js][fhirserviceslistbyworkspacesample]                                               | lists all FHIR Services for the given workspace x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_List.json                                                                    |
| [fhirServicesUpdateSample.js][fhirservicesupdatesample]                                                                 | patch FHIR Service details. x-ms-original-file: 2025-04-01-preview/fhirservices/FhirServices_Patch.json                                                                                       |
| [iotConnectorFhirDestinationCreateOrUpdateSample.js][iotconnectorfhirdestinationcreateorupdatesample]                   | creates or updates an IoT Connector FHIR destination resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Create.json    |
| [iotConnectorFhirDestinationDeleteSample.js][iotconnectorfhirdestinationdeletesample]                                   | deletes an IoT Connector FHIR destination. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Delete.json                                                      |
| [iotConnectorFhirDestinationGetSample.js][iotconnectorfhirdestinationgetsample]                                         | gets the properties of the specified Iot Connector FHIR destination. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_fhirdestination_Get.json                               |
| [iotConnectorsCreateOrUpdateSample.js][iotconnectorscreateorupdatesample]                                               | creates or updates an IoT Connector resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Create.json                                     |
| [iotConnectorsDeleteSample.js][iotconnectorsdeletesample]                                                               | deletes an IoT Connector. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Delete.json                                                                                       |
| [iotConnectorsGetSample.js][iotconnectorsgetsample]                                                                     | gets the properties of the specified IoT Connector. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Get.json                                                                |
| [iotConnectorsListByWorkspaceSample.js][iotconnectorslistbyworkspacesample]                                             | lists all IoT Connectors for the given workspace x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_List.json                                                                  |
| [iotConnectorsUpdateSample.js][iotconnectorsupdatesample]                                                               | patch an IoT Connector. x-ms-original-file: 2025-04-01-preview/iotconnectors/iotconnector_Patch.json                                                                                          |
| [operationResultsGetSample.js][operationresultsgetsample]                                                               | get the operation result for a long running operation. x-ms-original-file: 2025-04-01-preview/OperationResultsGet.json                                                                        |
| [operationsListSample.js][operationslistsample]                                                                         | lists all of the available operations supported by Microsoft Healthcare resource provider. x-ms-original-file: 2025-04-01-preview/OperationsList.json                                         |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]                     | update the state of the specified private endpoint connection associated with the service. x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreatePrivateEndpointConnection.json          |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                     | deletes a private endpoint connection. x-ms-original-file: 2025-04-01-preview/legacy/ServiceDeletePrivateEndpointConnection.json                                                              |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                           | gets the specified private endpoint connection associated with the service. x-ms-original-file: 2025-04-01-preview/legacy/ServiceGetPrivateEndpointConnection.json                            |
| [privateEndpointConnectionsListByServiceSample.js][privateendpointconnectionslistbyservicesample]                       | lists all private endpoint connections for a service. x-ms-original-file: 2025-04-01-preview/legacy/ServiceListPrivateEndpointConnections.json                                                |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                                       | gets a private link resource that need to be created for a service. x-ms-original-file: 2025-04-01-preview/legacy/PrivateLinkResourceGet.json                                                 |
| [privateLinkResourcesListByServiceSample.js][privatelinkresourceslistbyservicesample]                                   | gets the private link resources that need to be created for a service. x-ms-original-file: 2025-04-01-preview/legacy/PrivateLinkResourcesListByService.json                                   |
| [servicesCheckNameAvailabilitySample.js][serviceschecknameavailabilitysample]                                           | check if a service instance name is available. x-ms-original-file: 2025-04-01-preview/CheckNameAvailabilityPost.json                                                                          |
| [servicesCreateOrUpdateSample.js][servicescreateorupdatesample]                                                         | create or update the metadata of a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServiceCreate.json                                                                         |
| [servicesDeleteSample.js][servicesdeletesample]                                                                         | delete a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServiceDelete.json                                                                                                   |
| [servicesGetSample.js][servicesgetsample]                                                                               | get the metadata of a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServiceGet.json                                                                                         |
| [servicesListByResourceGroupSample.js][serviceslistbyresourcegroupsample]                                               | get all the service instances in a resource group. x-ms-original-file: 2025-04-01-preview/legacy/ServiceListByResourceGroup.json                                                              |
| [servicesListSample.js][serviceslistsample]                                                                             | get all the service instances in a subscription. x-ms-original-file: 2025-04-01-preview/legacy/ServiceList.json                                                                               |
| [servicesUpdateSample.js][servicesupdatesample]                                                                         | update the metadata of a service instance. x-ms-original-file: 2025-04-01-preview/legacy/ServicePatch.json                                                                                    |
| [workspacePrivateEndpointConnectionsCreateOrUpdateSample.js][workspaceprivateendpointconnectionscreateorupdatesample]   | update the state of the specified private endpoint connection associated with the workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceCreatePrivateEndpointConnection.json |
| [workspacePrivateEndpointConnectionsDeleteSample.js][workspaceprivateendpointconnectionsdeletesample]                   | deletes a private endpoint connection. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceDeletePrivateEndpointConnection.json                                                       |
| [workspacePrivateEndpointConnectionsGetSample.js][workspaceprivateendpointconnectionsgetsample]                         | gets the specified private endpoint connection associated with the workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceGetPrivateEndpointConnection.json                   |
| [workspacePrivateEndpointConnectionsListByWorkspaceSample.js][workspaceprivateendpointconnectionslistbyworkspacesample] | lists all private endpoint connections for a workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspaceListPrivateEndpointConnections.json                                       |
| [workspacePrivateLinkResourcesGetSample.js][workspaceprivatelinkresourcesgetsample]                                     | gets a private link resource that need to be created for a workspace. x-ms-original-file: 2025-04-01-preview/privatelink/WorkspacePrivateLinkResourceGet.json                                 |
| [workspacePrivateLinkResourcesListByWorkspaceSample.js][workspaceprivatelinkresourceslistbyworkspacesample]             | gets the private link resources that need to be created for a workspace. x-ms-original-file: 2025-04-01-preview/privatelink/PrivateLinkResourcesListByWorkspace.json                          |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]                                                     | creates or updates a workspace resource with the specified parameters. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Create.json                                               |
| [workspacesDeleteSample.js][workspacesdeletesample]                                                                     | deletes a specified workspace. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Delete.json                                                                                       |
| [workspacesGetSample.js][workspacesgetsample]                                                                           | gets the properties of the specified workspace. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Get.json                                                                         |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample]                                           | lists all the available workspaces under the specified resource group. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_ListByResourceGroup.json                                  |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]                                             | lists all the available workspaces under the specified subscription. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_ListBySubscription.json                                     |
| [workspacesUpdateSample.js][workspacesupdatesample]                                                                     | patch workspace details. x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Patch.json                                                                                              |

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
node dicomServicesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dicomServicesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dicomservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/dicomServicesCreateOrUpdateSample.js
[dicomservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/dicomServicesDeleteSample.js
[dicomservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/dicomServicesGetSample.js
[dicomserviceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/dicomServicesListByWorkspaceSample.js
[dicomservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/dicomServicesUpdateSample.js
[fhirdestinationslistbyiotconnectorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/fhirDestinationsListByIotConnectorSample.js
[fhirservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/fhirServicesCreateOrUpdateSample.js
[fhirservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/fhirServicesDeleteSample.js
[fhirservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/fhirServicesGetSample.js
[fhirserviceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/fhirServicesListByWorkspaceSample.js
[fhirservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/fhirServicesUpdateSample.js
[iotconnectorfhirdestinationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorFhirDestinationCreateOrUpdateSample.js
[iotconnectorfhirdestinationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorFhirDestinationDeleteSample.js
[iotconnectorfhirdestinationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorFhirDestinationGetSample.js
[iotconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorsCreateOrUpdateSample.js
[iotconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorsDeleteSample.js
[iotconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorsGetSample.js
[iotconnectorslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorsListByWorkspaceSample.js
[iotconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/iotConnectorsUpdateSample.js
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/operationResultsGetSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/privateEndpointConnectionsListByServiceSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/privateLinkResourcesListByServiceSample.js
[serviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/servicesCheckNameAvailabilitySample.js
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/servicesCreateOrUpdateSample.js
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/servicesDeleteSample.js
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/servicesGetSample.js
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/servicesListByResourceGroupSample.js
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/servicesListSample.js
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/servicesUpdateSample.js
[workspaceprivateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacePrivateEndpointConnectionsCreateOrUpdateSample.js
[workspaceprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacePrivateEndpointConnectionsDeleteSample.js
[workspaceprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacePrivateEndpointConnectionsGetSample.js
[workspaceprivateendpointconnectionslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacePrivateEndpointConnectionsListByWorkspaceSample.js
[workspaceprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacePrivateLinkResourcesGetSample.js
[workspaceprivatelinkresourceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacePrivateLinkResourcesListByWorkspaceSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v4-beta/javascript/workspacesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-healthcareapis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthcareapis/arm-healthcareapis/README.md
