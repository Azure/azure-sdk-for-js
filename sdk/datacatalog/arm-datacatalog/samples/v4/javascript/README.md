# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [adcCatalogsCreateOrUpdateSample.js][adccatalogscreateorupdatesample]             | The Create Azure Data Catalog service operation creates a new data catalog service with the specified parameters. If the specific service already exists, then any patchable properties will be updated and any immutable properties will remain unchanged. x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/CreateOrUpdateADCCatalog.json |
| [adcCatalogsDeleteSample.js][adccatalogsdeletesample]                             | The Delete Azure Data Catalog Service operation deletes an existing data catalog. x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/DeleteADCCatalog.json                                                                                                                                                                                   |
| [adcCatalogsGetSample.js][adccatalogsgetsample]                                   | The Get Azure Data Catalog Service operation retrieves a json representation of the data catalog. x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/GetADCCatalog.json                                                                                                                                                                      |
| [adcCatalogsListtByResourceGroupSample.js][adccatalogslisttbyresourcegroupsample] | The List catalogs in Resource Group operation lists all the Azure Data Catalogs available under the given resource group. x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/ListADCCatalogsByResourceGroup.json                                                                                                                             |
| [adcCatalogsUpdateSample.js][adccatalogsupdatesample]                             | The Update Azure Data Catalog Service operation can be used to update the existing deployment. The update call only supports the properties listed in the PATCH body. x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/UpdateADCCatalog.json                                                                                               |
| [adcOperationsListSample.js][adcoperationslistsample]                             | Lists all the available Azure Data Catalog service operations. x-ms-original-file: specification/datacatalog/resource-manager/Microsoft.DataCatalog/stable/2016-03-30/examples/GetOperations.json                                                                                                                                                                                                         |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node adcCatalogsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node adcCatalogsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[adccatalogscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datacatalog/arm-datacatalog/samples/v4/javascript/adcCatalogsCreateOrUpdateSample.js
[adccatalogsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datacatalog/arm-datacatalog/samples/v4/javascript/adcCatalogsDeleteSample.js
[adccatalogsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datacatalog/arm-datacatalog/samples/v4/javascript/adcCatalogsGetSample.js
[adccatalogslisttbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datacatalog/arm-datacatalog/samples/v4/javascript/adcCatalogsListtByResourceGroupSample.js
[adccatalogsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datacatalog/arm-datacatalog/samples/v4/javascript/adcCatalogsUpdateSample.js
[adcoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datacatalog/arm-datacatalog/samples/v4/javascript/adcOperationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-datacatalog?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/datacatalog/arm-datacatalog/README.md
