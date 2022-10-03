# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                           |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dashboardsCreateOrUpdateSample.ts][dashboardscreateorupdatesample]                           | Creates or updates a Dashboard. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/createOrUpdateDashboard.json                                                                                                                               |
| [dashboardsDeleteSample.ts][dashboardsdeletesample]                                           | Deletes the Dashboard. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/deleteDashboard.json                                                                                                                                                |
| [dashboardsGetSample.ts][dashboardsgetsample]                                                 | Gets the Dashboard. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/getDashboard.json                                                                                                                                                      |
| [dashboardsListByResourceGroupSample.ts][dashboardslistbyresourcegroupsample]                 | Gets all the Dashboards within a resource group. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/listDashboardsByResourceGroup.json                                                                                                        |
| [dashboardsListBySubscriptionSample.ts][dashboardslistbysubscriptionsample]                   | Gets all the dashboards within a subscription. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/listDashboardsBySubscription.json                                                                                                           |
| [dashboardsUpdateSample.ts][dashboardsupdatesample]                                           | Updates an existing Dashboard. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/updateDashboard.json                                                                                                                                        |
| [listTenantConfigurationViolationsListSample.ts][listtenantconfigurationviolationslistsample] | Gets list of items that violate tenant's configuration. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/TenantConfiguration/GetListOfTenantConfigurationViolations.json                                                                    |
| [operationsListSample.ts][operationslistsample]                                               | The Microsoft Portal operations API. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/operationsList.json                                                                                                                                   |
| [tenantConfigurationsCreateSample.ts][tenantconfigurationscreatesample]                       | Create the tenant configuration. If configuration already exists - update it. User has to be a Tenant Admin for this operation. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/TenantConfiguration/CreateOrUpdateTenantConfiguration.json |
| [tenantConfigurationsDeleteSample.ts][tenantconfigurationsdeletesample]                       | Delete the tenant configuration. User has to be a Tenant Admin for this operation. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/TenantConfiguration/DeleteTenantConfiguration.json                                                      |
| [tenantConfigurationsGetSample.ts][tenantconfigurationsgetsample]                             | Gets the tenant configuration. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/TenantConfiguration/GetTenantConfiguration.json                                                                                                             |
| [tenantConfigurationsListSample.ts][tenantconfigurationslistsample]                           | Gets list of the tenant configurations. x-ms-original-file: specification/portal/resource-manager/Microsoft.Portal/preview/2020-09-01-preview/examples/TenantConfiguration/GetListOfTenantConfigurations.json                                                                                             |

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
node dist/dashboardsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/dashboardsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[dashboardscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/dashboardsCreateOrUpdateSample.ts
[dashboardsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/dashboardsDeleteSample.ts
[dashboardsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/dashboardsGetSample.ts
[dashboardslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/dashboardsListByResourceGroupSample.ts
[dashboardslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/dashboardsListBySubscriptionSample.ts
[dashboardsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/dashboardsUpdateSample.ts
[listtenantconfigurationviolationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/listTenantConfigurationViolationsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/operationsListSample.ts
[tenantconfigurationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/tenantConfigurationsCreateSample.ts
[tenantconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/tenantConfigurationsDeleteSample.ts
[tenantconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/tenantConfigurationsGetSample.ts
[tenantconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/portal/arm-portal/samples/v1-beta/typescript/src/tenantConfigurationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-portal?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/portal/arm-portal/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
