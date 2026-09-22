# @azure/arm-appnetwork client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-appnetwork in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                  |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [appLinkMembersCreateOrUpdateSample.js][applinkmemberscreateorupdatesample]               | create an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_CreateOrUpdate.json                               |
| [appLinkMembersDeleteSample.js][applinkmembersdeletesample]                               | delete an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Delete.json                                       |
| [appLinkMembersGetSample.js][applinkmembersgetsample]                                     | get an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Get.json                                             |
| [appLinkMembersListByAppLinkSample.js][applinkmemberslistbyapplinksample]                 | list AppLinkMember resources by AppLink. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_ListByAppLink.json                |
| [appLinkMembersUpdateSample.js][applinkmembersupdatesample]                               | update an AppLinkMember. x-ms-original-file: 2025-08-01-preview/AppLinkMembers_Update.json                                       |
| [appLinksCreateOrUpdateSample.js][applinkscreateorupdatesample]                           | create an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_CreateOrUpdate.json                                           |
| [appLinksDeleteSample.js][applinksdeletesample]                                           | delete an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_Delete.json                                                   |
| [appLinksGetSample.js][applinksgetsample]                                                 | get an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_Get.json                                                         |
| [appLinksListByResourceGroupSample.js][applinkslistbyresourcegroupsample]                 | list AppLink resources by resource group. x-ms-original-file: 2025-08-01-preview/AppLinks_ListByResourceGroup.json               |
| [appLinksListBySubscriptionSample.js][applinkslistbysubscriptionsample]                   | list AppLink resources by subscription. x-ms-original-file: 2025-08-01-preview/AppLinks_ListBySubscription.json                  |
| [appLinksUpdateSample.js][applinksupdatesample]                                           | update an AppLink. x-ms-original-file: 2025-08-01-preview/AppLinks_Update.json                                                   |
| [availableVersionsListByLocationSample.js][availableversionslistbylocationsample]         | list AvailableVersion resources by location. x-ms-original-file: 2025-08-01-preview/AvailableVersions_ListByLocation.json        |
| [operationsListSample.js][operationslistsample]                                           | list the operations for the provider x-ms-original-file: 2025-08-01-preview/Operations_List.json                                 |
| [upgradeHistoriesListByAppLinkMemberSample.js][upgradehistorieslistbyapplinkmembersample] | list UpgradeHistory resources by AppLinkMember. x-ms-original-file: 2025-08-01-preview/UpgradeHistories_ListByAppLinkMember.json |

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
node appLinkMembersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node appLinkMembersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applinkmemberscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinkMembersCreateOrUpdateSample.js
[applinkmembersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinkMembersDeleteSample.js
[applinkmembersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinkMembersGetSample.js
[applinkmemberslistbyapplinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinkMembersListByAppLinkSample.js
[applinkmembersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinkMembersUpdateSample.js
[applinkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinksCreateOrUpdateSample.js
[applinksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinksDeleteSample.js
[applinksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinksGetSample.js
[applinkslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinksListByResourceGroupSample.js
[applinkslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinksListBySubscriptionSample.js
[applinksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/appLinksUpdateSample.js
[availableversionslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/availableVersionsListByLocationSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/operationsListSample.js
[upgradehistorieslistbyapplinkmembersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appnetwork/arm-appnetwork/samples/v1-beta/javascript/upgradeHistoriesListByAppLinkMemberSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-appnetwork?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appnetwork/arm-appnetwork/README.md
