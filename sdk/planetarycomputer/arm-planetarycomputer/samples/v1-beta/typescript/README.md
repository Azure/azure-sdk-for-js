# @azure/arm-planetarycomputer client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-planetarycomputer in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                         |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [geoCatalogsCreateSample.ts][geocatalogscreatesample]                           | create a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Create.json                                      |
| [geoCatalogsDeleteSample.ts][geocatalogsdeletesample]                           | delete a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Delete.json                                      |
| [geoCatalogsGetSample.ts][geocatalogsgetsample]                                 | get a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Get.json                                            |
| [geoCatalogsListByResourceGroupSample.ts][geocatalogslistbyresourcegroupsample] | list GeoCatalog resources by resource group x-ms-original-file: 2025-02-11-preview/GeoCatalogs_ListByResourceGroup.json |
| [geoCatalogsListBySubscriptionSample.ts][geocatalogslistbysubscriptionsample]   | list GeoCatalog resources by subscription ID x-ms-original-file: 2025-02-11-preview/GeoCatalogs_ListBySubscription.json |
| [geoCatalogsUpdateSample.ts][geocatalogsupdatesample]                           | update a GeoCatalog x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Update.json                                      |

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
node dist/geoCatalogsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/geoCatalogsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[geocatalogscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/typescript/src/geoCatalogsCreateSample.ts
[geocatalogsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/typescript/src/geoCatalogsDeleteSample.ts
[geocatalogsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/typescript/src/geoCatalogsGetSample.ts
[geocatalogslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/typescript/src/geoCatalogsListByResourceGroupSample.ts
[geocatalogslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/typescript/src/geoCatalogsListBySubscriptionSample.ts
[geocatalogsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/planetarycomputer/arm-planetarycomputer/samples/v1-beta/typescript/src/geoCatalogsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-planetarycomputer?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/planetarycomputer/arm-planetarycomputer/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
