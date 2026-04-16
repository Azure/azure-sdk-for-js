# @azure/arm-agricultureplatform client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-agricultureplatform in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                 |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [agriServiceCreateOrUpdateSample.js][agriservicecreateorupdatesample]                 | create a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_CreateOrUpdate_MaximumSet_Gen.json                              |
| [agriServiceDeleteSample.js][agriservicedeletesample]                                 | delete a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_Delete_MaximumSet_Gen.json                                      |
| [agriServiceGetSample.js][agriservicegetsample]                                       | get a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_Get_MaximumSet_Gen.json                                            |
| [agriServiceListAvailableSolutionsSample.js][agriservicelistavailablesolutionssample] | returns the list of available agri solutions. x-ms-original-file: 2024-06-01-preview/AgriService_ListAvailableSolutions_MaximumSet_Gen.json     |
| [agriServiceListByResourceGroupSample.js][agriservicelistbyresourcegroupsample]       | list AgriServiceResource resources by resource group x-ms-original-file: 2024-06-01-preview/AgriService_ListByResourceGroup_MaximumSet_Gen.json |
| [agriServiceListBySubscriptionSample.js][agriservicelistbysubscriptionsample]         | list AgriServiceResource resources by subscription ID x-ms-original-file: 2024-06-01-preview/AgriService_ListBySubscription_MaximumSet_Gen.json |
| [agriServiceUpdateSample.js][agriserviceupdatesample]                                 | update a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_Update_MaximumSet_Gen.json                                      |
| [operationsListSample.js][operationslistsample]                                       | list the operations for the provider x-ms-original-file: 2024-06-01-preview/Operations_List_MaximumSet_Gen.json                                 |

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
node agriServiceCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node agriServiceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agriservicecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/agriServiceCreateOrUpdateSample.js
[agriservicedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/agriServiceDeleteSample.js
[agriservicegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/agriServiceGetSample.js
[agriservicelistavailablesolutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/agriServiceListAvailableSolutionsSample.js
[agriservicelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/agriServiceListByResourceGroupSample.js
[agriservicelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/agriServiceListBySubscriptionSample.js
[agriserviceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/agriServiceUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-agricultureplatform?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/agricultureplatform/arm-agricultureplatform/README.md
