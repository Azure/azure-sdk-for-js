# @azure/arm-applink client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-applink in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                  |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [appLinkMembersCreateOrUpdateSample.ts][applinkmemberscreateorupdatesample]               | create an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_CreateOrUpdate.json                               |
| [appLinkMembersDeleteSample.ts][applinkmembersdeletesample]                               | delete an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Delete.json                                       |
| [appLinkMembersGetSample.ts][applinkmembersgetsample]                                     | get an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Get.json                                             |
| [appLinkMembersListByAppLinkSample.ts][applinkmemberslistbyapplinksample]                 | list AppLinkMember resources by AppLink. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_ListByAppLink.json                |
| [appLinkMembersUpdateSample.ts][applinkmembersupdatesample]                               | update an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Update.json                                       |
| [appLinksCreateOrUpdateSample.ts][applinkscreateorupdatesample]                           | create an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_CreateOrUpdate.json                                           |
| [appLinksDeleteSample.ts][applinksdeletesample]                                           | delete an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_Delete.json                                                   |
| [appLinksGetSample.ts][applinksgetsample]                                                 | get an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_Get.json                                                         |
| [appLinksListByResourceGroupSample.ts][applinkslistbyresourcegroupsample]                 | list AppLink resources by resource group. x-ms-original-file: 2025-08-01-preview/AppLinks_ListByResourceGroup.json               |
| [appLinksListBySubscriptionSample.ts][applinkslistbysubscriptionsample]                   | list AppLink resources by subscription. x-ms-original-file: 2025-08-01-preview/AppLinks_ListBySubscription.json                  |
| [appLinksUpdateSample.ts][applinksupdatesample]                                           | update an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_Update.json                                                   |
| [availableVersionsListByLocationSample.ts][availableversionslistbylocationsample]         | list AvailableVersion resources by location. x-ms-original-file: 2025-08-01-preview/AvailableVersions_ListByLocation.json        |
| [operationsListSample.ts][operationslistsample]                                           | list the operations for the provider x-ms-original-file: 2025-08-01-preview/Operations_List.json                                 |
| [upgradeHistoriesListByAppLinkMemberSample.ts][upgradehistorieslistbyapplinkmembersample] | list UpgradeHistory resources by AppLinkMember. x-ms-original-file: 2025-08-01-preview/UpgradeHistories_ListByAppLinkMember.json |

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
node dist/appLinkMembersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/appLinkMembersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applinkmemberscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinkMembersCreateOrUpdateSample.ts
[applinkmembersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinkMembersDeleteSample.ts
[applinkmembersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinkMembersGetSample.ts
[applinkmemberslistbyapplinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinkMembersListByAppLinkSample.ts
[applinkmembersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinkMembersUpdateSample.ts
[applinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinksCreateOrUpdateSample.ts
[applinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinksDeleteSample.ts
[applinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinksGetSample.ts
[applinkslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinksListByResourceGroupSample.ts
[applinkslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinksListBySubscriptionSample.ts
[applinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/appLinksUpdateSample.ts
[availableversionslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/availableVersionsListByLocationSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/operationsListSample.ts
[upgradehistorieslistbyapplinkmembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/applink/arm-applink/samples/v1-beta/typescript/src/upgradeHistoriesListByAppLinkMemberSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-applink?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/applink/arm-applink/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
