# @azure/arm-commvault client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-commvault in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudAccountsCreateOrUpdateSample.js][cloudaccountscreateorupdatesample]                                                 | create a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_CreateOrUpdate_MaximumSet_Gen.json                                                                                         |
| [cloudAccountsDeleteSample.js][cloudaccountsdeletesample]                                                                 | delete a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_Delete_MaximumSet_Gen.json                                                                                                 |
| [cloudAccountsGetSample.js][cloudaccountsgetsample]                                                                       | get a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_Get_MaximumSet_Gen.json                                                                                                       |
| [cloudAccountsLatestLinkedSaaSSample.js][cloudaccountslatestlinkedsaassample]                                             | returns the latest SaaS linked to the cloud account. x-ms-original-file: 2026-07-03-preview/CloudAccounts_LatestLinkedSaaS_MaximumSet_Gen.json                                                        |
| [cloudAccountsLinkSaaSSample.js][cloudaccountslinksaassample]                                                             | links a new SaaS to the cloud account. x-ms-original-file: 2026-07-03-preview/CloudAccounts_LinkSaaS_MaximumSet_Gen.json                                                                              |
| [cloudAccountsListByResourceGroupSample.js][cloudaccountslistbyresourcegroupsample]                                       | list CloudAccount resources by resource group x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListByResourceGroup_MaximumSet_Gen.json                                                            |
| [cloudAccountsListBySubscriptionSample.js][cloudaccountslistbysubscriptionsample]                                         | list CloudAccount resources by subscription ID x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListBySubscription_MaximumSet_Gen.json                                                            |
| [cloudAccountsUpdateSample.js][cloudaccountsupdatesample]                                                                 | update a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_Update_MaximumSet_Gen.json                                                                                                 |
| [operationsListSample.js][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-07-03-preview/Operations_List_MaximumSet_Gen.json                                                                                       |
| [plansCreateOrupdateSample.js][planscreateorupdatesample]                                                                 | create a CommvaultPlan x-ms-original-file: 2026-07-03-preview/Plans_CreateOrupdate_MaximumSet_Gen.json                                                                                                |
| [plansDeleteSample.js][plansdeletesample]                                                                                 | delete a CommvaultPlan x-ms-original-file: 2026-07-03-preview/Plans_Delete_MaximumSet_Gen.json                                                                                                        |
| [plansGetSample.js][plansgetsample]                                                                                       | get a CommvaultPlan x-ms-original-file: 2026-07-03-preview/Plans_Get_MaximumSet_Gen.json                                                                                                              |
| [plansListByCloudAccountSample.js][planslistbycloudaccountsample]                                                         | list CommvaultPlan resources by CloudAccount x-ms-original-file: 2026-07-03-preview/Plans_ListByCloudAccount_MaximumSet_Gen.json                                                                      |
| [protectedItemsGetRestorePointsSample.js][protecteditemsgetrestorepointssample]                                           | limits used for creation of resources. x-ms-original-file: 2026-07-03-preview/ProtectedItems_GetRestorePoints_MaximumSet_Gen.json                                                                     |
| [protectedItemsGetSample.js][protecteditemsgetsample]                                                                     | get a ProtectedItem x-ms-original-file: 2026-07-03-preview/ProtectedItems_Get_MaximumSet_Gen.json                                                                                                     |
| [protectedItemsListByProtectionGroupSample.js][protecteditemslistbyprotectiongroupsample]                                 | list ProtectedItem resources by ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectedItems_ListByProtectionGroup_MaximumSet_Gen.json                                                       |
| [protectedItemsOperationGroupCountByProtectionGroupsSample.js][protecteditemsoperationgroupcountbyprotectiongroupssample] | gets the count of protected items for provided CCA resource IDs across subscriptions. x-ms-original-file: 2026-07-03-preview/ProtectedItemsOperationGroup_CountByProtectionGroups_MaximumSet_Gen.json |
| [protectedItemsRestoreSample.js][protecteditemsrestoresample]                                                             | restore resource for a protected item. x-ms-original-file: 2026-07-03-preview/ProtectedItems_Restore_MaximumSet_Gen.json                                                                              |
| [protectionGroupsBackupSample.js][protectiongroupsbackupsample]                                                           | ad-hoc backup of protected items resource in given protection group. x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Backup_MaximumSet_Gen.json                                               |
| [protectionGroupsCreateOrupdateSample.js][protectiongroupscreateorupdatesample]                                           | create a ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectionGroups_CreateOrupdate_MaximumSet_Gen.json                                                                                   |
| [protectionGroupsDeleteSample.js][protectiongroupsdeletesample]                                                           | delete a ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Delete_MaximumSet_Gen.json                                                                                           |
| [protectionGroupsGetSample.js][protectiongroupsgetsample]                                                                 | get a ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Get_MaximumSet_Gen.json                                                                                                 |
| [protectionGroupsListByCloudAccountSample.js][protectiongroupslistbycloudaccountsample]                                   | list ProtectionGroup resources by CloudAccount x-ms-original-file: 2026-07-03-preview/ProtectionGroups_ListByCloudAccount_MaximumSet_Gen.json                                                         |
| [protectionGroupsRestoreSample.js][protectiongroupsrestoresample]                                                         | restore resource for a protected items in given protection group. x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Restore_MaximumSet_Gen.json                                                 |
| [protectionGroupsResumeBackupSample.js][protectiongroupsresumebackupsample]                                               | resume Backup for a Protection Group. x-ms-original-file: 2026-07-03-preview/ProtectionGroups_ResumeBackup_MaximumSet_Gen.json                                                                        |
| [protectionGroupsStopBackupSample.js][protectiongroupsstopbackupsample]                                                   | stop Backup for a Protection Group x-ms-original-file: 2026-07-03-preview/ProtectionGroups_StopBackup_MaximumSet_Gen.json                                                                             |
| [roleMappingsCreateOrUpdateSample.js][rolemappingscreateorupdatesample]                                                   | create a RoleMapping x-ms-original-file: 2026-07-03-preview/RoleMappings_CreateOrUpdate_MaximumSet_Gen.json                                                                                           |
| [roleMappingsDeleteSample.js][rolemappingsdeletesample]                                                                   | delete a RoleMapping x-ms-original-file: 2026-07-03-preview/RoleMappings_Delete_MaximumSet_Gen.json                                                                                                   |
| [roleMappingsGetSample.js][rolemappingsgetsample]                                                                         | get a RoleMapping x-ms-original-file: 2026-07-03-preview/RoleMappings_Get_MaximumSet_Gen.json                                                                                                         |
| [roleMappingsListSample.js][rolemappingslistsample]                                                                       | list RoleMapping resources by CloudAccount x-ms-original-file: 2026-07-03-preview/RoleMappings_List_MaximumSet_Gen.json                                                                               |
| [saaSOperationGroupActivateResourceSample.js][saasoperationgroupactivateresourcesample]                                   | resolve the token to get the SaaS resource ID and activate the SaaS resource x-ms-original-file: 2026-07-03-preview/SaaSOperationGroup_ActivateResource_MaximumSet_Gen.json                           |
| [storagesCreateOrUpdateSample.js][storagescreateorupdatesample]                                                           | create a Storage x-ms-original-file: 2026-07-03-preview/Storages_CreateOrUpdate_MaximumSet_Gen.json                                                                                                   |
| [storagesDeleteSample.js][storagesdeletesample]                                                                           | delete a Storage x-ms-original-file: 2026-07-03-preview/Storages_Delete_MaximumSet_Gen.json                                                                                                           |
| [storagesGetSample.js][storagesgetsample]                                                                                 | get a Storage x-ms-original-file: 2026-07-03-preview/Storages_Get_MaximumSet_Gen.json                                                                                                                 |
| [storagesListByCloudAccountSample.js][storageslistbycloudaccountsample]                                                   | list Storage resources by CloudAccount x-ms-original-file: 2026-07-03-preview/Storages_ListByCloudAccount_MaximumSet_Gen.json                                                                         |

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
node cloudAccountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node cloudAccountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudaccountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsCreateOrUpdateSample.js
[cloudaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsDeleteSample.js
[cloudaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsGetSample.js
[cloudaccountslatestlinkedsaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsLatestLinkedSaaSSample.js
[cloudaccountslinksaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsLinkSaaSSample.js
[cloudaccountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsListByResourceGroupSample.js
[cloudaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsListBySubscriptionSample.js
[cloudaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/cloudAccountsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/operationsListSample.js
[planscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/plansCreateOrupdateSample.js
[plansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/plansDeleteSample.js
[plansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/plansGetSample.js
[planslistbycloudaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/plansListByCloudAccountSample.js
[protecteditemsgetrestorepointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectedItemsGetRestorePointsSample.js
[protecteditemsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectedItemsGetSample.js
[protecteditemslistbyprotectiongroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectedItemsListByProtectionGroupSample.js
[protecteditemsoperationgroupcountbyprotectiongroupssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectedItemsOperationGroupCountByProtectionGroupsSample.js
[protecteditemsrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectedItemsRestoreSample.js
[protectiongroupsbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsBackupSample.js
[protectiongroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsCreateOrupdateSample.js
[protectiongroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsDeleteSample.js
[protectiongroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsGetSample.js
[protectiongroupslistbycloudaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsListByCloudAccountSample.js
[protectiongroupsrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsRestoreSample.js
[protectiongroupsresumebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsResumeBackupSample.js
[protectiongroupsstopbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/protectionGroupsStopBackupSample.js
[rolemappingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/roleMappingsCreateOrUpdateSample.js
[rolemappingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/roleMappingsDeleteSample.js
[rolemappingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/roleMappingsGetSample.js
[rolemappingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/roleMappingsListSample.js
[saasoperationgroupactivateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/saaSOperationGroupActivateResourceSample.js
[storagescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/storagesCreateOrUpdateSample.js
[storagesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/storagesDeleteSample.js
[storagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/storagesGetSample.js
[storageslistbycloudaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/javascript/storagesListByCloudAccountSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-commvault?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/placeholder/arm-commvault/README.md
