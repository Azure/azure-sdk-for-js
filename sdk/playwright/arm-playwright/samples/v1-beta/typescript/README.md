# @azure/arm-playwright client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-playwright in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                         | list the operations for the provider x-ms-original-file: 2026-02-01-preview/Operations_List.json                                                        |
| [playwrightQuotasGetSample.ts][playwrightquotasgetsample]                                                               | gets a subscription-level location-based Playwright quota resource by name. x-ms-original-file: 2026-02-01-preview/PlaywrightQuotas_Get.json            |
| [playwrightQuotasListBySubscriptionSample.ts][playwrightquotaslistbysubscriptionsample]                                 | lists Playwright quota resources for a given subscription ID. x-ms-original-file: 2026-02-01-preview/PlaywrightQuotas_ListBySubscription.json           |
| [playwrightWorkspaceQuotasGetSample.ts][playwrightworkspacequotasgetsample]                                             | gets a Playwright workspace quota resource by name. x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaceQuotas_Get.json                           |
| [playwrightWorkspaceQuotasListByPlaywrightWorkspaceSample.ts][playwrightworkspacequotaslistbyplaywrightworkspacesample] | lists quota resources for a given Playwright workspace. x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaceQuotas_ListByPlaywrightWorkspace.json |
| [playwrightWorkspacesCheckNameAvailabilitySample.ts][playwrightworkspaceschecknameavailabilitysample]                   | checks if a Playwright workspace name is available globally. x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_CheckNameAvailability.json     |
| [playwrightWorkspacesCreateOrUpdateSample.ts][playwrightworkspacescreateorupdatesample]                                 | create a PlaywrightWorkspace x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_CreateOrUpdate.json                                            |
| [playwrightWorkspacesDeleteSample.ts][playwrightworkspacesdeletesample]                                                 | deletes a Playwright workspace resource asynchronously. x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_Delete.json                         |
| [playwrightWorkspacesGetSample.ts][playwrightworkspacesgetsample]                                                       | get a PlaywrightWorkspace x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_Get.json                                                          |
| [playwrightWorkspacesListByResourceGroupSample.ts][playwrightworkspaceslistbyresourcegroupsample]                       | list PlaywrightWorkspace resources by resource group x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_ListByResourceGroup.json               |
| [playwrightWorkspacesListBySubscriptionSample.ts][playwrightworkspaceslistbysubscriptionsample]                         | list PlaywrightWorkspace resources by subscription ID x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_ListBySubscription.json               |
| [playwrightWorkspacesUpdateSample.ts][playwrightworkspacesupdatesample]                                                 | updates a Playwright workspace resource synchronously. x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_Update.json                          |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/operationsListSample.ts
[playwrightquotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightQuotasGetSample.ts
[playwrightquotaslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightQuotasListBySubscriptionSample.ts
[playwrightworkspacequotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspaceQuotasGetSample.ts
[playwrightworkspacequotaslistbyplaywrightworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspaceQuotasListByPlaywrightWorkspaceSample.ts
[playwrightworkspaceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspacesCheckNameAvailabilitySample.ts
[playwrightworkspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspacesCreateOrUpdateSample.ts
[playwrightworkspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspacesDeleteSample.ts
[playwrightworkspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspacesGetSample.ts
[playwrightworkspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspacesListByResourceGroupSample.ts
[playwrightworkspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspacesListBySubscriptionSample.ts
[playwrightworkspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwright/arm-playwright/samples/v1-beta/typescript/src/playwrightWorkspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-playwright?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/playwright/arm-playwright/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
