# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [marketplaceAgreementsCreateSample.ts][marketplaceagreementscreatesample]         | Create Confluent Marketplace agreement in the subscription. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/MarketplaceAgreements_Create.json    |
| [marketplaceAgreementsListSample.ts][marketplaceagreementslistsample]             | List Confluent marketplace agreements in the subscription. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/MarketplaceAgreements_List.json       |
| [organizationCreateSample.ts][organizationcreatesample]                           | Create Organization resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Create.json                                            |
| [organizationDeleteSample.ts][organizationdeletesample]                           | Delete Organization resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Delete.json                                            |
| [organizationGetSample.ts][organizationgetsample]                                 | Get the properties of a specific Organization resource. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Get.json                    |
| [organizationListByResourceGroupSample.ts][organizationlistbyresourcegroupsample] | List all Organizations under the specified resource group. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_ListByResourceGroup.json |
| [organizationListBySubscriptionSample.ts][organizationlistbysubscriptionsample]   | List all organizations under the specified subscription. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_ListBySubscription.json    |
| [organizationOperationsListSample.ts][organizationoperationslistsample]           | List all operations provided by Microsoft.Confluent. x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/OrganizationOperations_List.json            |
| [organizationUpdateSample.ts][organizationupdatesample]                           | Update Organization resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Organization_Update.json                                            |
| [validationsValidateOrganizationSample.ts][validationsvalidateorganizationsample] | Organization Validate proxy resource x-ms-original-file: specification/confluent/resource-manager/Microsoft.Confluent/preview/2021-09-01-preview/examples/Validations_ValidateOrganizations.json                      |

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
node dist/marketplaceAgreementsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/marketplaceAgreementsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[marketplaceagreementscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/marketplaceAgreementsCreateSample.ts
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/marketplaceAgreementsListSample.ts
[organizationcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/organizationCreateSample.ts
[organizationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/organizationDeleteSample.ts
[organizationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/organizationGetSample.ts
[organizationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/organizationListByResourceGroupSample.ts
[organizationlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/organizationListBySubscriptionSample.ts
[organizationoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/organizationOperationsListSample.ts
[organizationupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/organizationUpdateSample.ts
[validationsvalidateorganizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confluent/arm-confluent/samples/v3-beta/typescript/src/validationsValidateOrganizationSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-confluent?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confluent/arm-confluent/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
