# @azure/arm-healthdataaiservices client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-healthdataaiservices in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deidServicesCreateSample.js][deidservicescreatesample]                                                   | create a DeidService x-ms-original-file: 2024-09-20/DeidServices_Create_MaximumSet_Gen.json                                                             |
| [deidServicesDeleteSample.js][deidservicesdeletesample]                                                   | delete a DeidService x-ms-original-file: 2024-09-20/DeidServices_Delete_MaximumSet_Gen.json                                                             |
| [deidServicesGetSample.js][deidservicesgetsample]                                                         | get a DeidService x-ms-original-file: 2024-09-20/DeidServices_Get_MaximumSet_Gen.json                                                                   |
| [deidServicesListByResourceGroupSample.js][deidserviceslistbyresourcegroupsample]                         | list DeidService resources by resource group x-ms-original-file: 2024-09-20/DeidServices_ListByResourceGroup_MaximumSet_Gen.json                        |
| [deidServicesListBySubscriptionSample.js][deidserviceslistbysubscriptionsample]                           | list DeidService resources by subscription ID x-ms-original-file: 2024-09-20/DeidServices_ListBySubscription_MaximumSet_Gen.json                        |
| [deidServicesUpdateSample.js][deidservicesupdatesample]                                                   | update a DeidService x-ms-original-file: 2024-09-20/DeidServices_Update_MaximumSet_Gen.json                                                             |
| [operationsListSample.js][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2024-09-20/Operations_List_MaximumSet_Gen.json                                                 |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                       | create a Private endpoint connection x-ms-original-file: 2024-09-20/PrivateEndpointConnections_Create_MaximumSet_Gen.json                               |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                       | delete the private endpoint connection x-ms-original-file: 2024-09-20/PrivateEndpointConnections_Delete_MaximumSet_Gen.json                             |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                             | get a specific private connection x-ms-original-file: 2024-09-20/PrivateEndpointConnections_Get_MaximumSet_Gen.json                                     |
| [privateEndpointConnectionsListByDeidServiceSample.js][privateendpointconnectionslistbydeidservicesample] | list private endpoint connections on the given resource x-ms-original-file: 2024-09-20/PrivateEndpointConnections_ListByDeidService_MaximumSet_Gen.json |
| [privateLinksListByDeidServiceSample.js][privatelinkslistbydeidservicesample]                             | list private links on the given resource x-ms-original-file: 2024-09-20/PrivateLinks_ListByDeidService_MaximumSet_Gen.json                              |

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
node deidServicesCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node deidServicesCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deidservicescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/deidServicesCreateSample.js
[deidservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/deidServicesDeleteSample.js
[deidservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/deidServicesGetSample.js
[deidserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/deidServicesListByResourceGroupSample.js
[deidserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/deidServicesListBySubscriptionSample.js
[deidservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/deidServicesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbydeidservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/privateEndpointConnectionsListByDeidServiceSample.js
[privatelinkslistbydeidservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples/v1/javascript/privateLinksListByDeidServiceSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-healthdataaiservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/arm-healthdataaiservices/README.md
