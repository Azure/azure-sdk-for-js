# @azure/arm-sitemanager client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-sitemanager in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                         |
| --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [sitesByServiceGroupCreateOrUpdateSample.js][sitesbyservicegroupcreateorupdatesample]         | create or update Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_CreateOrUpdate_MaximumSet_Gen.json |
| [sitesByServiceGroupDeleteSample.js][sitesbyservicegroupdeletesample]                         | delete Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_Delete_MaximumSet_Gen.json                   |
| [sitesByServiceGroupGetSample.js][sitesbyservicegroupgetsample]                               | get Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_Get_MaximumSet_Gen.json                         |
| [sitesByServiceGroupListByServiceGroupSample.js][sitesbyservicegrouplistbyservicegroupsample] | list Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_ListByServiceGroup_MaximumSet_Gen.json         |
| [sitesByServiceGroupUpdateSample.js][sitesbyservicegroupupdatesample]                         | update Site at SG scope x-ms-original-file: 2025-06-01/SitesByServiceGroup_Update_MaximumSet_Gen.json                   |
| [sitesBySubscriptionCreateOrUpdateSample.js][sitesbysubscriptioncreateorupdatesample]         | create a Site x-ms-original-file: 2025-06-01/SitesBySubscription_CreateOrUpdate_MaximumSet_Gen.json                     |
| [sitesBySubscriptionDeleteSample.js][sitesbysubscriptiondeletesample]                         | delete a Site x-ms-original-file: 2025-06-01/SitesBySubscription_Delete_MaximumSet_Gen.json                             |
| [sitesBySubscriptionGetSample.js][sitesbysubscriptiongetsample]                               | get a Site x-ms-original-file: 2025-06-01/SitesBySubscription_Get_MaximumSet_Gen.json                                   |
| [sitesBySubscriptionListSample.js][sitesbysubscriptionlistsample]                             | list Site resources by subscription ID x-ms-original-file: 2025-06-01/SitesBySubscription_List_MaximumSet_Gen.json      |
| [sitesBySubscriptionUpdateSample.js][sitesbysubscriptionupdatesample]                         | update a Site x-ms-original-file: 2025-06-01/SitesBySubscription_Update_MaximumSet_Gen.json                             |
| [sitesCreateOrUpdateSample.js][sitescreateorupdatesample]                                     | create a Site x-ms-original-file: 2025-06-01/Sites_CreateOrUpdate_MaximumSet_Gen.json                                   |
| [sitesDeleteSample.js][sitesdeletesample]                                                     | delete a Site x-ms-original-file: 2025-06-01/Sites_Delete_MaximumSet_Gen.json                                           |
| [sitesGetSample.js][sitesgetsample]                                                           | get a Site x-ms-original-file: 2025-06-01/Sites_Get_MaximumSet_Gen.json                                                 |
| [sitesListByResourceGroupSample.js][siteslistbyresourcegroupsample]                           | list Site resources by resource group x-ms-original-file: 2025-06-01/Sites_ListByResourceGroup_MaximumSet_Gen.json      |
| [sitesUpdateSample.js][sitesupdatesample]                                                     | update a Site x-ms-original-file: 2025-06-01/Sites_Update_MaximumSet_Gen.json                                           |

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
node sitesByServiceGroupCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node sitesByServiceGroupCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sitesbyservicegroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesByServiceGroupCreateOrUpdateSample.js
[sitesbyservicegroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesByServiceGroupDeleteSample.js
[sitesbyservicegroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesByServiceGroupGetSample.js
[sitesbyservicegrouplistbyservicegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesByServiceGroupListByServiceGroupSample.js
[sitesbyservicegroupupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesByServiceGroupUpdateSample.js
[sitesbysubscriptioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesBySubscriptionCreateOrUpdateSample.js
[sitesbysubscriptiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesBySubscriptionDeleteSample.js
[sitesbysubscriptiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesBySubscriptionGetSample.js
[sitesbysubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesBySubscriptionListSample.js
[sitesbysubscriptionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesBySubscriptionUpdateSample.js
[sitescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesCreateOrUpdateSample.js
[sitesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesDeleteSample.js
[sitesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesGetSample.js
[siteslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesListByResourceGroupSample.js
[sitesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sitemanager/arm-sitemanager/samples/v1/javascript/sitesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sitemanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sitemanager/arm-sitemanager/README.md
