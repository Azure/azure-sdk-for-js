# @azure/arm-sitemanager client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-sitemanager in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                         |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [sitesByServiceGroupCreateOrUpdateSample.ts][sitesbyservicegroupcreateorupdatesample]         | create or update Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_CreateOrUpdate_MaximumSet_Gen.json |
| [sitesByServiceGroupDeleteSample.ts][sitesbyservicegroupdeletesample]                         | delete Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_Delete_MaximumSet_Gen.json                   |
| [sitesByServiceGroupGetSample.ts][sitesbyservicegroupgetsample]                               | get Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_Get_MaximumSet_Gen.json                         |
| [sitesByServiceGroupListByServiceGroupSample.ts][sitesbyservicegrouplistbyservicegroupsample] | list Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_ListByServiceGroup_MaximumSet_Gen.json         |
| [sitesByServiceGroupUpdateSample.ts][sitesbyservicegroupupdatesample]                         | update Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_Update_MaximumSet_Gen.json                   |
| [sitesBySubscriptionCreateOrUpdateSample.ts][sitesbysubscriptioncreateorupdatesample]         | create a Site x-ms-original-file: 2025-06-01/SitesBySubscription_CreateOrUpdate_MaximumSet_Gen.json                     |
| [sitesBySubscriptionDeleteSample.ts][sitesbysubscriptiondeletesample]                         | delete a Site x-ms-original-file: 2025-06-01/SitesBySubscription_Delete_MaximumSet_Gen.json                             |
| [sitesBySubscriptionGetSample.ts][sitesbysubscriptiongetsample]                               | get a Site x-ms-original-file: 2025-06-01/SitesBySubscription_Get_MaximumSet_Gen.json                                   |
| [sitesBySubscriptionListSample.ts][sitesbysubscriptionlistsample]                             | list Site resources by subscription ID x-ms-original-file: 2025-06-01/SitesBySubscription_List_MaximumSet_Gen.json      |
| [sitesBySubscriptionUpdateSample.ts][sitesbysubscriptionupdatesample]                         | update a Site x-ms-original-file: 2025-06-01/SitesBySubscription_Update_MaximumSet_Gen.json                             |
| [sitesCreateOrUpdateSample.ts][sitescreateorupdatesample]                                     | create a Site x-ms-original-file: 2025-06-01/Sites_CreateOrUpdate_MaximumSet_Gen.json                                   |
| [sitesDeleteSample.ts][sitesdeletesample]                                                     | delete a Site x-ms-original-file: 2025-06-01/Sites_Delete_MaximumSet_Gen.json                                           |
| [sitesGetSample.ts][sitesgetsample]                                                           | get a Site x-ms-original-file: 2025-06-01/Sites_Get_MaximumSet_Gen.json                                                 |
| [sitesListByResourceGroupSample.ts][siteslistbyresourcegroupsample]                           | list Site resources by resource group x-ms-original-file: 2025-06-01/Sites_ListByResourceGroup_MaximumSet_Gen.json      |
| [sitesUpdateSample.ts][sitesupdatesample]                                                     | update a Site x-ms-original-file: 2025-06-01/Sites_Update_MaximumSet_Gen.json                                           |

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
node dist/sitesByServiceGroupCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/sitesByServiceGroupCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sitesbyservicegroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesByServiceGroupCreateOrUpdateSample.ts
[sitesbyservicegroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesByServiceGroupDeleteSample.ts
[sitesbyservicegroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesByServiceGroupGetSample.ts
[sitesbyservicegrouplistbyservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesByServiceGroupListByServiceGroupSample.ts
[sitesbyservicegroupupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesByServiceGroupUpdateSample.ts
[sitesbysubscriptioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesBySubscriptionCreateOrUpdateSample.ts
[sitesbysubscriptiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesBySubscriptionDeleteSample.ts
[sitesbysubscriptiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesBySubscriptionGetSample.ts
[sitesbysubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesBySubscriptionListSample.ts
[sitesbysubscriptionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesBySubscriptionUpdateSample.ts
[sitescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesCreateOrUpdateSample.ts
[sitesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesDeleteSample.ts
[sitesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesGetSample.ts
[siteslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesListByResourceGroupSample.ts
[sitesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/typescript/src/sitesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sitemanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sitemanager/arm-sitemanager/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
