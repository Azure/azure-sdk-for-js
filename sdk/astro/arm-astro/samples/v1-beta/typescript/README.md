# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                     | List the operations for the provider x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.ts][organizationscreateorupdatesample]           | Create a OrganizationResource x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.ts][organizationsdeletesample]                           | Delete a OrganizationResource x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetSample.ts][organizationsgetsample]                                 | Get a OrganizationResource x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.ts][organizationslistbyresourcegroupsample] | List OrganizationResource resources by resource group x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.ts][organizationslistbysubscriptionsample]   | List OrganizationResource resources by subscription ID x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.ts][organizationsupdatesample]                           | Update a OrganizationResource x-ms-original-file: specification/liftrastronomer/resource-manager/Astronomer.Astro/stable/2023-08-01/examples/Organizations_Update_MaximumSet_Gen.json                                      |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env ASTRO_SUBSCRIPTION_ID="<astro subscription id>" node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/astro/arm-astro/samples/v1-beta/typescript/src/operationsListSample.ts
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/astro/arm-astro/samples/v1-beta/typescript/src/organizationsCreateOrUpdateSample.ts
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/astro/arm-astro/samples/v1-beta/typescript/src/organizationsDeleteSample.ts
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/astro/arm-astro/samples/v1-beta/typescript/src/organizationsGetSample.ts
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/astro/arm-astro/samples/v1-beta/typescript/src/organizationsListByResourceGroupSample.ts
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/astro/arm-astro/samples/v1-beta/typescript/src/organizationsListBySubscriptionSample.ts
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/astro/arm-astro/samples/v1-beta/typescript/src/organizationsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-astro?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/astro/arm-astro/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
