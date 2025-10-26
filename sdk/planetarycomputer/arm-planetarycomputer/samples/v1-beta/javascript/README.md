# @azure/arm-planetarycomputer client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-planetarycomputer in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                         |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [geoCatalogsCreateSample.js][geocatalogscreatesample]                           | create a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Create.json                                      |
| [geoCatalogsDeleteSample.js][geocatalogsdeletesample]                           | delete a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Delete.json                                      |
| [geoCatalogsGetSample.js][geocatalogsgetsample]                                 | get a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Get.json                                            |
| [geoCatalogsListByResourceGroupSample.js][geocatalogslistbyresourcegroupsample] | list GeoCatalog resources by resource group x-ms-original-file: 2025-02-11-preview/GeoCatalogs_ListByResourceGroup.json |
| [geoCatalogsListBySubscriptionSample.js][geocatalogslistbysubscriptionsample]   | list GeoCatalog resources by subscription ID x-ms-original-file: 2025-02-11-preview/GeoCatalogs_ListBySubscription.json |
| [geoCatalogsUpdateSample.js][geocatalogsupdatesample]                           | update a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Update.json                                      |

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
node geoCatalogsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node geoCatalogsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[geocatalogscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/javascript/geoCatalogsCreateSample.js
[geocatalogsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/javascript/geoCatalogsDeleteSample.js
[geocatalogsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/javascript/geoCatalogsGetSample.js
[geocatalogslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/javascript/geoCatalogsListByResourceGroupSample.js
[geocatalogslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/javascript/geoCatalogsListBySubscriptionSample.js
[geocatalogsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/javascript/geoCatalogsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-planetarycomputer?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/arm-planetarycomputer/README.md
