# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dicomServicesCreateOrUpdateSample.ts][dicomservicescreateorupdatesample]                             | Creates or updates a DICOM Service resource with the specified parameters. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/dicomservices/DicomServices_Create.json                                  |
| [dicomServicesDeleteSample.ts][dicomservicesdeletesample]                                             | Deletes a DICOM Service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/dicomservices/DicomServices_Delete.json                                                                                    |
| [dicomServicesGetSample.ts][dicomservicesgetsample]                                                   | Gets the properties of the specified DICOM Service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/dicomservices/DicomServices_Get.json                                                            |
| [dicomServicesListByWorkspaceSample.ts][dicomserviceslistbyworkspacesample]                           | Lists all DICOM Services for the given workspace x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/dicomservices/DicomServices_List.json                                                              |
| [dicomServicesUpdateSample.ts][dicomservicesupdatesample]                                             | Patch DICOM Service details. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/dicomservices/DicomServices_Patch.json                                                                                 |
| [fhirDestinationsListByIotConnectorSample.ts][fhirdestinationslistbyiotconnectorsample]               | Lists all FHIR destinations for the given IoT Connector x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_fhirdestination_List.json                                        |
| [fhirServicesCreateOrUpdateSample.ts][fhirservicescreateorupdatesample]                               | Creates or updates a FHIR Service resource with the specified parameters. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/fhirservices/FhirServices_Create.json                                     |
| [fhirServicesDeleteSample.ts][fhirservicesdeletesample]                                               | Deletes a FHIR Service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/fhirservices/FhirServices_Delete.json                                                                                       |
| [fhirServicesGetSample.ts][fhirservicesgetsample]                                                     | Gets the properties of the specified FHIR Service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/fhirservices/FhirServices_Get.json                                                               |
| [fhirServicesListByWorkspaceSample.ts][fhirserviceslistbyworkspacesample]                             | Lists all FHIR Services for the given workspace x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/fhirservices/FhirServices_List.json                                                                 |
| [fhirServicesUpdateSample.ts][fhirservicesupdatesample]                                               | Patch FHIR Service details. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/fhirservices/FhirServices_Patch.json                                                                                    |
| [iotConnectorFhirDestinationCreateOrUpdateSample.ts][iotconnectorfhirdestinationcreateorupdatesample] | Creates or updates an IoT Connector FHIR destination resource with the specified parameters. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_fhirdestination_Create.json |
| [iotConnectorFhirDestinationDeleteSample.ts][iotconnectorfhirdestinationdeletesample]                 | Deletes an IoT Connector FHIR destination. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_fhirdestination_Delete.json                                                   |
| [iotConnectorFhirDestinationGetSample.ts][iotconnectorfhirdestinationgetsample]                       | Gets the properties of the specified Iot Connector FHIR destination. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_fhirdestination_Get.json                            |
| [iotConnectorsCreateOrUpdateSample.ts][iotconnectorscreateorupdatesample]                             | Creates or updates an IoT Connector resource with the specified parameters. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_Create.json                                  |
| [iotConnectorsDeleteSample.ts][iotconnectorsdeletesample]                                             | Deletes an IoT Connector. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_Delete.json                                                                                    |
| [iotConnectorsGetSample.ts][iotconnectorsgetsample]                                                   | Gets the properties of the specified IoT Connector. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_Get.json                                                             |
| [iotConnectorsListByWorkspaceSample.ts][iotconnectorslistbyworkspacesample]                           | Lists all IoT Connectors for the given workspace x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_List.json                                                               |
| [iotConnectorsUpdateSample.ts][iotconnectorsupdatesample]                                             | Patch an IoT Connector. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/iotconnectors/iotconnector_Patch.json                                                                                       |
| [operationResultsGetSample.ts][operationresultsgetsample]                                             | Get the operation result for a long running operation. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/OperationResultsGet.json                                                                     |
| [operationsListSample.ts][operationslistsample]                                                       | Lists all of the available operations supported by Microsoft Healthcare resource provider. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/OperationsList.json                                      |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]   | Update the state of the specified private endpoint connection associated with the service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceCreatePrivateEndpointConnection.json       |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                   | Deletes a private endpoint connection. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceDeletePrivateEndpointConnection.json                                                           |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                         | Gets the specified private endpoint connection associated with the service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceGetPrivateEndpointConnection.json                         |
| [privateEndpointConnectionsListByServiceSample.ts][privateendpointconnectionslistbyservicesample]     | Lists all private endpoint connections for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceListPrivateEndpointConnections.json                                             |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                     | Gets a private link resource that need to be created for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/PrivateLinkResourceGet.json                                              |
| [privateLinkResourcesListByServiceSample.ts][privatelinkresourceslistbyservicesample]                 | Gets the private link resources that need to be created for a service. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/PrivateLinkResourcesListByService.json                                |
| [servicesCheckNameAvailabilitySample.ts][serviceschecknameavailabilitysample]                         | Check if a service instance name is available. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/CheckNameAvailabilityPost.json                                                                       |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]                                       | Create or update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceCreate.json                                                                      |
| [servicesDeleteSample.ts][servicesdeletesample]                                                       | Delete a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceDelete.json                                                                                                |
| [servicesGetSample.ts][servicesgetsample]                                                             | Get the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceGet.json                                                                                      |
| [servicesListByResourceGroupSample.ts][serviceslistbyresourcegroupsample]                             | Get all the service instances in a resource group. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceListByResourceGroup.json                                                           |
| [servicesListSample.ts][serviceslistsample]                                                           | Get all the service instances in a subscription. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServiceList.json                                                                            |
| [servicesUpdateSample.ts][servicesupdatesample]                                                       | Update the metadata of a service instance. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/legacy/ServicePatch.json                                                                                 |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                                   | Creates or updates a workspace resource with the specified parameters. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/workspaces/Workspaces_Create.json                                            |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                   | Deletes a specified workspace. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/workspaces/Workspaces_Delete.json                                                                                    |
| [workspacesGetSample.ts][workspacesgetsample]                                                         | Gets the properties of the specified workspace. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/workspaces/Workspaces_Get.json                                                                      |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                         | Lists all the available workspaces under the specified resource group. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/workspaces/Workspaces_ListByResourceGroup.json                               |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                           | Lists all the available workspaces under the specified subscription. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/workspaces/Workspaces_ListBySubscription.json                                  |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                   | Patch workspace details. x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/preview/2021-06-01-preview/examples/workspaces/Workspaces_Patch.json                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/dicomServicesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dicomservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/dicomServicesCreateOrUpdateSample.ts
[dicomservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/dicomServicesDeleteSample.ts
[dicomservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/dicomServicesGetSample.ts
[dicomserviceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/dicomServicesListByWorkspaceSample.ts
[dicomservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/dicomServicesUpdateSample.ts
[fhirdestinationslistbyiotconnectorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/fhirDestinationsListByIotConnectorSample.ts
[fhirservicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/fhirServicesCreateOrUpdateSample.ts
[fhirservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/fhirServicesDeleteSample.ts
[fhirservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/fhirServicesGetSample.ts
[fhirserviceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/fhirServicesListByWorkspaceSample.ts
[fhirservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/fhirServicesUpdateSample.ts
[iotconnectorfhirdestinationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorFhirDestinationCreateOrUpdateSample.ts
[iotconnectorfhirdestinationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorFhirDestinationDeleteSample.ts
[iotconnectorfhirdestinationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorFhirDestinationGetSample.ts
[iotconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorsCreateOrUpdateSample.ts
[iotconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorsDeleteSample.ts
[iotconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorsGetSample.ts
[iotconnectorslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorsListByWorkspaceSample.ts
[iotconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/iotConnectorsUpdateSample.ts
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/operationResultsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/privateEndpointConnectionsListByServiceSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/privateLinkResourcesListByServiceSample.ts
[serviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/servicesCheckNameAvailabilitySample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/servicesDeleteSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/servicesGetSample.ts
[serviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/servicesListByResourceGroupSample.ts
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/servicesListSample.ts
[servicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/servicesUpdateSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthcareapis/arm-healthcareapis/samples/v2-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-healthcareapis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthcareapis/arm-healthcareapis/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
