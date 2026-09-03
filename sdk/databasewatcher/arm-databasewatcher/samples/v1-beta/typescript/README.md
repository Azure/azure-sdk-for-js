# @azure/arm-databasewatcher client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-databasewatcher in some common scenarios.

| **File Name**                                                                                                                                         | **Description**                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.ts][alertruleresourcesalertruleresourcescreateorupdatesample]                               | create a AlertRuleResource x-ms-original-file: 2025-01-02/AlertRuleResources_CreateOrUpdate_MaximumSet_Gen.json                                 |
| [alertRuleResourcesAlertRuleResourcesDeleteSample.ts][alertruleresourcesalertruleresourcesdeletesample]                                               | delete a AlertRuleResource x-ms-original-file: 2025-01-02/AlertRuleResources_Delete_MaximumSet_Gen.json                                         |
| [alertRuleResourcesAlertRuleResourcesGetSample.ts][alertruleresourcesalertruleresourcesgetsample]                                                     | get a AlertRuleResource x-ms-original-file: 2025-01-02/AlertRuleResources_Get_MaximumSet_Gen.json                                               |
| [alertRuleResourcesAlertRuleResourcesListByParentSample.ts][alertruleresourcesalertruleresourceslistbyparentsample]                                   | list AlertRuleResource resources by Watcher x-ms-original-file: 2025-01-02/AlertRuleResources_ListByParent_MaximumSet_Gen.json                  |
| [healthValidationsHealthValidationsGetSample.ts][healthvalidationshealthvalidationsgetsample]                                                         | get a HealthValidation x-ms-original-file: 2025-01-02/HealthValidations_Get_MaximumSet_Gen.json                                                 |
| [healthValidationsHealthValidationsListByParentSample.ts][healthvalidationshealthvalidationslistbyparentsample]                                       | list HealthValidation resources by Watcher x-ms-original-file: 2025-01-02/HealthValidations_ListByParent_MaximumSet_Gen.json                    |
| [healthValidationsHealthValidationsStartValidationSample.ts][healthvalidationshealthvalidationsstartvalidationsample]                                 | starts health validation for a watcher. x-ms-original-file: 2025-01-02/HealthValidations_StartValidation_MaximumSet_Gen.json                    |
| [operationsOperationsListSample.ts][operationsoperationslistsample]                                                                                   | list the operations for the provider x-ms-original-file: 2025-01-02/Operations_List_MaximumSet_Gen.json                                         |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesCreateSample.ts][sharedprivatelinkresourcessharedprivatelinkresourcescreatesample]               | create a SharedPrivateLinkResource x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Create_MaximumSet_Gen.json                         |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesDeleteSample.ts][sharedprivatelinkresourcessharedprivatelinkresourcesdeletesample]               | delete a SharedPrivateLinkResource x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Delete_MaximumSet_Gen.json                         |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesGetSample.ts][sharedprivatelinkresourcessharedprivatelinkresourcesgetsample]                     | get a SharedPrivateLinkResource x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Get_MaximumSet_Gen.json                               |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesListByWatcherSample.ts][sharedprivatelinkresourcessharedprivatelinkresourceslistbywatchersample] | list SharedPrivateLinkResource resources by Watcher x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_ListByWatcher_MaximumSet_Gen.json |
| [targetsTargetsCreateOrUpdateSample.ts][targetstargetscreateorupdatesample]                                                                           | create a Target x-ms-original-file: 2025-01-02/Targets_CreateOrUpdate_MaximumSet_Gen.json                                                       |
| [targetsTargetsDeleteSample.ts][targetstargetsdeletesample]                                                                                           | delete a Target x-ms-original-file: 2025-01-02/Targets_Delete_MaximumSet_Gen.json                                                               |
| [targetsTargetsGetSample.ts][targetstargetsgetsample]                                                                                                 | get a Target x-ms-original-file: 2025-01-02/Targets_Get_MaximumSet_Gen.json                                                                     |
| [targetsTargetsListByWatcherSample.ts][targetstargetslistbywatchersample]                                                                             | list Target resources by Watcher x-ms-original-file: 2025-01-02/Targets_ListByWatcher_MaximumSet_Gen.json                                       |
| [watchersWatchersCreateOrUpdateSample.ts][watcherswatcherscreateorupdatesample]                                                                       | create a Watcher x-ms-original-file: 2025-01-02/Watchers_CreateOrUpdate_MaximumSet_Gen.json                                                     |
| [watchersWatchersDeleteSample.ts][watcherswatchersdeletesample]                                                                                       | delete a Watcher x-ms-original-file: 2025-01-02/Watchers_Delete_MaximumSet_Gen.json                                                             |
| [watchersWatchersGetSample.ts][watcherswatchersgetsample]                                                                                             | get a Watcher x-ms-original-file: 2025-01-02/Watchers_Get_MaximumSet_Gen.json                                                                   |
| [watchersWatchersListByResourceGroupSample.ts][watcherswatcherslistbyresourcegroupsample]                                                             | list Watcher resources by resource group x-ms-original-file: 2025-01-02/Watchers_ListByResourceGroup_MaximumSet_Gen.json                        |
| [watchersWatchersListBySubscriptionSample.ts][watcherswatcherslistbysubscriptionsample]                                                               | list Watcher resources by subscription ID x-ms-original-file: 2025-01-02/Watchers_ListBySubscription_MaximumSet_Gen.json                        |
| [watchersWatchersStartSample.ts][watcherswatchersstartsample]                                                                                         | the action to start monitoring all targets configured for a database watcher. x-ms-original-file: 2025-01-02/Watchers_Start_MaximumSet_Gen.json |
| [watchersWatchersStopSample.ts][watcherswatchersstopsample]                                                                                           | the action to stop monitoring all targets configured for a database watcher. x-ms-original-file: 2025-01-02/Watchers_Stop_MaximumSet_Gen.json   |
| [watchersWatchersUpdateSample.ts][watcherswatchersupdatesample]                                                                                       | update a Watcher x-ms-original-file: 2025-01-02/Watchers_Update_MaximumSet_Gen.json                                                             |

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
node dist/alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alertruleresourcesalertruleresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.ts
[alertruleresourcesalertruleresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/alertRuleResourcesAlertRuleResourcesDeleteSample.ts
[alertruleresourcesalertruleresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/alertRuleResourcesAlertRuleResourcesGetSample.ts
[alertruleresourcesalertruleresourceslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/alertRuleResourcesAlertRuleResourcesListByParentSample.ts
[healthvalidationshealthvalidationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/healthValidationsHealthValidationsGetSample.ts
[healthvalidationshealthvalidationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/healthValidationsHealthValidationsListByParentSample.ts
[healthvalidationshealthvalidationsstartvalidationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/healthValidationsHealthValidationsStartValidationSample.ts
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/operationsOperationsListSample.ts
[sharedprivatelinkresourcessharedprivatelinkresourcescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/sharedPrivateLinkResourcesSharedPrivateLinkResourcesCreateSample.ts
[sharedprivatelinkresourcessharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/sharedPrivateLinkResourcesSharedPrivateLinkResourcesDeleteSample.ts
[sharedprivatelinkresourcessharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/sharedPrivateLinkResourcesSharedPrivateLinkResourcesGetSample.ts
[sharedprivatelinkresourcessharedprivatelinkresourceslistbywatchersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/sharedPrivateLinkResourcesSharedPrivateLinkResourcesListByWatcherSample.ts
[targetstargetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/targetsTargetsCreateOrUpdateSample.ts
[targetstargetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/targetsTargetsDeleteSample.ts
[targetstargetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/targetsTargetsGetSample.ts
[targetstargetslistbywatchersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/targetsTargetsListByWatcherSample.ts
[watcherswatcherscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersCreateOrUpdateSample.ts
[watcherswatchersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersDeleteSample.ts
[watcherswatchersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersGetSample.ts
[watcherswatcherslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersListByResourceGroupSample.ts
[watcherswatcherslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersListBySubscriptionSample.ts
[watcherswatchersstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersStartSample.ts
[watcherswatchersstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersStopSample.ts
[watcherswatchersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/typescript/src/watchersWatchersUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-databasewatcher?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databasewatcher/arm-databasewatcher/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
