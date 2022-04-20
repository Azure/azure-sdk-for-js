# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [marketplaceAgreementsCreateSample.js][marketplaceagreementscreatesample]         | Create Confluent Marketplace agreement in the subscription. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/MarketplaceAgreements_Create.json    |
| [marketplaceAgreementsListSample.js][marketplaceagreementslistsample]             | List Confluent marketplace agreements in the subscription. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/MarketplaceAgreements_List.json       |
| [organizationCreateSample.js][organizationcreatesample]                           | Create Organization resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Create.json                                            |
| [organizationDeleteSample.js][organizationdeletesample]                           | Delete Organization resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Delete.json                                            |
| [organizationGetSample.js][organizationgetsample]                                 | Get the properties of a specific Organization resource. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Get.json                    |
| [organizationListByResourceGroupSample.js][organizationlistbyresourcegroupsample] | List all Organizations under the specified resource group. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_ListByResourceGroup.json |
| [organizationListBySubscriptionSample.js][organizationlistbysubscriptionsample]   | List all organizations under the specified subscription. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_ListBySubscription.json    |
| [organizationOperationsListSample.js][organizationoperationslistsample]           | List all operations provided by Microsoft.Confluent. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/OrganizationOperations_List.json            |
| [organizationUpdateSample.js][organizationupdatesample]                           | Update Organization resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Update.json                                            |
| [validationsValidateOrganizationSample.js][validationsvalidateorganizationsample] | Organization Validate proxy resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Validations_ValidateOrganizations.json                      |

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
node marketplaceAgreementsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node marketplaceAgreementsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[marketplaceagreementscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/marketplaceAgreementsCreateSample.js
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/marketplaceAgreementsListSample.js
[organizationcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/organizationCreateSample.js
[organizationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/organizationDeleteSample.js
[organizationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/organizationGetSample.js
[organizationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/organizationListByResourceGroupSample.js
[organizationlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/organizationListBySubscriptionSample.js
[organizationoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/organizationOperationsListSample.js
[organizationupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/organizationUpdateSample.js
[validationsvalidateorganizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/javascript/validationsValidateOrganizationSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-confluent?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confluent/arm-confluent/README.md
