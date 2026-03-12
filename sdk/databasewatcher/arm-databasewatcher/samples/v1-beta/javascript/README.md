# @azure/arm-databasewatcher client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-databasewatcher in some common scenarios.

| **File Name**                                                                                                                                         | **Description**                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.js][alertruleresourcesalertruleresourcescreateorupdatesample]                               | create a AlertRuleResource x-ms-original-file: 2025-01-02/AlertRuleResources_CreateOrUpdate_MaximumSet_Gen.json                                 |
| [alertRuleResourcesAlertRuleResourcesDeleteSample.js][alertruleresourcesalertruleresourcesdeletesample]                                               | delete a AlertRuleResource x-ms-original-file: 2025-01-02/AlertRuleResources_Delete_MaximumSet_Gen.json                                         |
| [alertRuleResourcesAlertRuleResourcesGetSample.js][alertruleresourcesalertruleresourcesgetsample]                                                     | get a AlertRuleResource x-ms-original-file: 2025-01-02/AlertRuleResources_Get_MaximumSet_Gen.json                                               |
| [alertRuleResourcesAlertRuleResourcesListByParentSample.js][alertruleresourcesalertruleresourceslistbyparentsample]                                   | list AlertRuleResource resources by Watcher x-ms-original-file: 2025-01-02/AlertRuleResources_ListByParent_MaximumSet_Gen.json                  |
| [healthValidationsHealthValidationsGetSample.js][healthvalidationshealthvalidationsgetsample]                                                         | get a HealthValidation x-ms-original-file: 2025-01-02/HealthValidations_Get_MaximumSet_Gen.json                                                 |
| [healthValidationsHealthValidationsListByParentSample.js][healthvalidationshealthvalidationslistbyparentsample]                                       | list HealthValidation resources by Watcher x-ms-original-file: 2025-01-02/HealthValidations_ListByParent_MaximumSet_Gen.json                    |
| [healthValidationsHealthValidationsStartValidationSample.js][healthvalidationshealthvalidationsstartvalidationsample]                                 | starts health validation for a watcher. x-ms-original-file: 2025-01-02/HealthValidations_StartValidation_MaximumSet_Gen.json                    |
| [operationsOperationsListSample.js][operationsoperationslistsample]                                                                                   | list the operations for the provider x-ms-original-file: 2025-01-02/Operations_List_MaximumSet_Gen.json                                         |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesCreateSample.js][sharedprivatelinkresourcessharedprivatelinkresourcescreatesample]               | create a SharedPrivateLinkResource x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Create_MaximumSet_Gen.json                         |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesDeleteSample.js][sharedprivatelinkresourcessharedprivatelinkresourcesdeletesample]               | delete a SharedPrivateLinkResource x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Delete_MaximumSet_Gen.json                         |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesGetSample.js][sharedprivatelinkresourcessharedprivatelinkresourcesgetsample]                     | get a SharedPrivateLinkResource x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_Get_MaximumSet_Gen.json                               |
| [sharedPrivateLinkResourcesSharedPrivateLinkResourcesListByWatcherSample.js][sharedprivatelinkresourcessharedprivatelinkresourceslistbywatchersample] | list SharedPrivateLinkResource resources by Watcher x-ms-original-file: 2025-01-02/SharedPrivateLinkResources_ListByWatcher_MaximumSet_Gen.json |
| [targetsTargetsCreateOrUpdateSample.js][targetstargetscreateorupdatesample]                                                                           | create a Target x-ms-original-file: 2025-01-02/Targets_CreateOrUpdate_MaximumSet_Gen.json                                                       |
| [targetsTargetsDeleteSample.js][targetstargetsdeletesample]                                                                                           | delete a Target x-ms-original-file: 2025-01-02/Targets_Delete_MaximumSet_Gen.json                                                               |
| [targetsTargetsGetSample.js][targetstargetsgetsample]                                                                                                 | get a Target x-ms-original-file: 2025-01-02/Targets_Get_MaximumSet_Gen.json                                                                     |
| [targetsTargetsListByWatcherSample.js][targetstargetslistbywatchersample]                                                                             | list Target resources by Watcher x-ms-original-file: 2025-01-02/Targets_ListByWatcher_MaximumSet_Gen.json                                       |
| [watchersWatchersCreateOrUpdateSample.js][watcherswatcherscreateorupdatesample]                                                                       | create a Watcher x-ms-original-file: 2025-01-02/Watchers_CreateOrUpdate_MaximumSet_Gen.json                                                     |
| [watchersWatchersDeleteSample.js][watcherswatchersdeletesample]                                                                                       | delete a Watcher x-ms-original-file: 2025-01-02/Watchers_Delete_MaximumSet_Gen.json                                                             |
| [watchersWatchersGetSample.js][watcherswatchersgetsample]                                                                                             | get a Watcher x-ms-original-file: 2025-01-02/Watchers_Get_MaximumSet_Gen.json                                                                   |
| [watchersWatchersListByResourceGroupSample.js][watcherswatcherslistbyresourcegroupsample]                                                             | list Watcher resources by resource group x-ms-original-file: 2025-01-02/Watchers_ListByResourceGroup_MaximumSet_Gen.json                        |
| [watchersWatchersListBySubscriptionSample.js][watcherswatcherslistbysubscriptionsample]                                                               | list Watcher resources by subscription ID x-ms-original-file: 2025-01-02/Watchers_ListBySubscription_MaximumSet_Gen.json                        |
| [watchersWatchersStartSample.js][watcherswatchersstartsample]                                                                                         | the action to start monitoring all targets configured for a database watcher. x-ms-original-file: 2025-01-02/Watchers_Start_MaximumSet_Gen.json |
| [watchersWatchersStopSample.js][watcherswatchersstopsample]                                                                                           | the action to stop monitoring all targets configured for a database watcher. x-ms-original-file: 2025-01-02/Watchers_Stop_MaximumSet_Gen.json   |
| [watchersWatchersUpdateSample.js][watcherswatchersupdatesample]                                                                                       | update a Watcher x-ms-original-file: 2025-01-02/Watchers_Update_MaximumSet_Gen.json                                                             |

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
node alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alertruleresourcesalertruleresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/alertRuleResourcesAlertRuleResourcesCreateOrUpdateSample.js
[alertruleresourcesalertruleresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/alertRuleResourcesAlertRuleResourcesDeleteSample.js
[alertruleresourcesalertruleresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/alertRuleResourcesAlertRuleResourcesGetSample.js
[alertruleresourcesalertruleresourceslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/alertRuleResourcesAlertRuleResourcesListByParentSample.js
[healthvalidationshealthvalidationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/healthValidationsHealthValidationsGetSample.js
[healthvalidationshealthvalidationslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/healthValidationsHealthValidationsListByParentSample.js
[healthvalidationshealthvalidationsstartvalidationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/healthValidationsHealthValidationsStartValidationSample.js
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/operationsOperationsListSample.js
[sharedprivatelinkresourcessharedprivatelinkresourcescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/sharedPrivateLinkResourcesSharedPrivateLinkResourcesCreateSample.js
[sharedprivatelinkresourcessharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/sharedPrivateLinkResourcesSharedPrivateLinkResourcesDeleteSample.js
[sharedprivatelinkresourcessharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/sharedPrivateLinkResourcesSharedPrivateLinkResourcesGetSample.js
[sharedprivatelinkresourcessharedprivatelinkresourceslistbywatchersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/sharedPrivateLinkResourcesSharedPrivateLinkResourcesListByWatcherSample.js
[targetstargetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/targetsTargetsCreateOrUpdateSample.js
[targetstargetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/targetsTargetsDeleteSample.js
[targetstargetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/targetsTargetsGetSample.js
[targetstargetslistbywatchersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/targetsTargetsListByWatcherSample.js
[watcherswatcherscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersCreateOrUpdateSample.js
[watcherswatchersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersDeleteSample.js
[watcherswatchersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersGetSample.js
[watcherswatcherslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersListByResourceGroupSample.js
[watcherswatcherslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersListBySubscriptionSample.js
[watcherswatchersstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersStartSample.js
[watcherswatchersstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersStopSample.js
[watcherswatchersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databasewatcher/arm-databasewatcher/samples/v1-beta/javascript/watchersWatchersUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-databasewatcher?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databasewatcher/arm-databasewatcher/README.md
