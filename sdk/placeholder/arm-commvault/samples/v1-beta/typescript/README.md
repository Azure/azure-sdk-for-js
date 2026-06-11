# @azure/arm-commvault client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-commvault in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudAccountsCreateOrUpdateSample.ts][cloudaccountscreateorupdatesample]                                                 | create a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_CreateOrUpdate_MaximumSet_Gen.json                                                                                         |
| [cloudAccountsDeleteSample.ts][cloudaccountsdeletesample]                                                                 | delete a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_Delete_MaximumSet_Gen.json                                                                                                 |
| [cloudAccountsGetSample.ts][cloudaccountsgetsample]                                                                       | get a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_Get_MaximumSet_Gen.json                                                                                                       |
| [cloudAccountsLatestLinkedSaaSSample.ts][cloudaccountslatestlinkedsaassample]                                             | returns the latest SaaS linked to the cloud account. x-ms-original-file: 2026-07-03-preview/CloudAccounts_LatestLinkedSaaS_MaximumSet_Gen.json                                                        |
| [cloudAccountsLinkSaaSSample.ts][cloudaccountslinksaassample]                                                             | links a new SaaS to the cloud account. x-ms-original-file: 2026-07-03-preview/CloudAccounts_LinkSaaS_MaximumSet_Gen.json                                                                              |
| [cloudAccountsListByResourceGroupSample.ts][cloudaccountslistbyresourcegroupsample]                                       | list CloudAccount resources by resource group x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListByResourceGroup_MaximumSet_Gen.json                                                            |
| [cloudAccountsListBySubscriptionSample.ts][cloudaccountslistbysubscriptionsample]                                         | list CloudAccount resources by subscription ID x-ms-original-file: 2026-07-03-preview/CloudAccounts_ListBySubscription_MaximumSet_Gen.json                                                            |
| [cloudAccountsUpdateSample.ts][cloudaccountsupdatesample]                                                                 | update a CloudAccount x-ms-original-file: 2026-07-03-preview/CloudAccounts_Update_MaximumSet_Gen.json                                                                                                 |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-07-03-preview/Operations_List_MaximumSet_Gen.json                                                                                       |
| [plansCreateOrupdateSample.ts][planscreateorupdatesample]                                                                 | create a CommvaultPlan x-ms-original-file: 2026-07-03-preview/Plans_CreateOrupdate_MaximumSet_Gen.json                                                                                                |
| [plansDeleteSample.ts][plansdeletesample]                                                                                 | delete a CommvaultPlan x-ms-original-file: 2026-07-03-preview/Plans_Delete_MaximumSet_Gen.json                                                                                                        |
| [plansGetSample.ts][plansgetsample]                                                                                       | get a CommvaultPlan x-ms-original-file: 2026-07-03-preview/Plans_Get_MaximumSet_Gen.json                                                                                                              |
| [plansListByCloudAccountSample.ts][planslistbycloudaccountsample]                                                         | list CommvaultPlan resources by CloudAccount x-ms-original-file: 2026-07-03-preview/Plans_ListByCloudAccount_MaximumSet_Gen.json                                                                      |
| [protectedItemsGetRestorePointsSample.ts][protecteditemsgetrestorepointssample]                                           | limits used for creation of resources. x-ms-original-file: 2026-07-03-preview/ProtectedItems_GetRestorePoints_MaximumSet_Gen.json                                                                     |
| [protectedItemsGetSample.ts][protecteditemsgetsample]                                                                     | get a ProtectedItem x-ms-original-file: 2026-07-03-preview/ProtectedItems_Get_MaximumSet_Gen.json                                                                                                     |
| [protectedItemsListByProtectionGroupSample.ts][protecteditemslistbyprotectiongroupsample]                                 | list ProtectedItem resources by ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectedItems_ListByProtectionGroup_MaximumSet_Gen.json                                                       |
| [protectedItemsOperationGroupCountByProtectionGroupsSample.ts][protecteditemsoperationgroupcountbyprotectiongroupssample] | gets the count of protected items for provided CCA resource IDs across subscriptions. x-ms-original-file: 2026-07-03-preview/ProtectedItemsOperationGroup_CountByProtectionGroups_MaximumSet_Gen.json |
| [protectedItemsRestoreSample.ts][protecteditemsrestoresample]                                                             | restore resource for a protected item. x-ms-original-file: 2026-07-03-preview/ProtectedItems_Restore_MaximumSet_Gen.json                                                                              |
| [protectionGroupsBackupSample.ts][protectiongroupsbackupsample]                                                           | ad-hoc backup of protected items resource in given protection group. x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Backup_MaximumSet_Gen.json                                               |
| [protectionGroupsCreateOrupdateSample.ts][protectiongroupscreateorupdatesample]                                           | create a ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectionGroups_CreateOrupdate_MaximumSet_Gen.json                                                                                   |
| [protectionGroupsDeleteSample.ts][protectiongroupsdeletesample]                                                           | delete a ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Delete_MaximumSet_Gen.json                                                                                           |
| [protectionGroupsGetSample.ts][protectiongroupsgetsample]                                                                 | get a ProtectionGroup x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Get_MaximumSet_Gen.json                                                                                                 |
| [protectionGroupsListByCloudAccountSample.ts][protectiongroupslistbycloudaccountsample]                                   | list ProtectionGroup resources by CloudAccount x-ms-original-file: 2026-07-03-preview/ProtectionGroups_ListByCloudAccount_MaximumSet_Gen.json                                                         |
| [protectionGroupsRestoreSample.ts][protectiongroupsrestoresample]                                                         | restore resource for a protected items in given protection group. x-ms-original-file: 2026-07-03-preview/ProtectionGroups_Restore_MaximumSet_Gen.json                                                 |
| [protectionGroupsResumeBackupSample.ts][protectiongroupsresumebackupsample]                                               | resume Backup for a Protection Group. x-ms-original-file: 2026-07-03-preview/ProtectionGroups_ResumeBackup_MaximumSet_Gen.json                                                                        |
| [protectionGroupsStopBackupSample.ts][protectiongroupsstopbackupsample]                                                   | stop Backup for a Protection Group x-ms-original-file: 2026-07-03-preview/ProtectionGroups_StopBackup_MaximumSet_Gen.json                                                                             |
| [roleMappingsCreateOrUpdateSample.ts][rolemappingscreateorupdatesample]                                                   | create a RoleMapping x-ms-original-file: 2026-07-03-preview/RoleMappings_CreateOrUpdate_MaximumSet_Gen.json                                                                                           |
| [roleMappingsDeleteSample.ts][rolemappingsdeletesample]                                                                   | delete a RoleMapping x-ms-original-file: 2026-07-03-preview/RoleMappings_Delete_MaximumSet_Gen.json                                                                                                   |
| [roleMappingsGetSample.ts][rolemappingsgetsample]                                                                         | get a RoleMapping x-ms-original-file: 2026-07-03-preview/RoleMappings_Get_MaximumSet_Gen.json                                                                                                         |
| [roleMappingsListSample.ts][rolemappingslistsample]                                                                       | list RoleMapping resources by CloudAccount x-ms-original-file: 2026-07-03-preview/RoleMappings_List_MaximumSet_Gen.json                                                                               |
| [saaSOperationGroupActivateResourceSample.ts][saasoperationgroupactivateresourcesample]                                   | resolve the token to get the SaaS resource ID and activate the SaaS resource x-ms-original-file: 2026-07-03-preview/SaaSOperationGroup_ActivateResource_MaximumSet_Gen.json                           |
| [storagesCreateOrUpdateSample.ts][storagescreateorupdatesample]                                                           | create a Storage x-ms-original-file: 2026-07-03-preview/Storages_CreateOrUpdate_MaximumSet_Gen.json                                                                                                   |
| [storagesDeleteSample.ts][storagesdeletesample]                                                                           | delete a Storage x-ms-original-file: 2026-07-03-preview/Storages_Delete_MaximumSet_Gen.json                                                                                                           |
| [storagesGetSample.ts][storagesgetsample]                                                                                 | get a Storage x-ms-original-file: 2026-07-03-preview/Storages_Get_MaximumSet_Gen.json                                                                                                                 |
| [storagesListByCloudAccountSample.ts][storageslistbycloudaccountsample]                                                   | list Storage resources by CloudAccount x-ms-original-file: 2026-07-03-preview/Storages_ListByCloudAccount_MaximumSet_Gen.json                                                                         |

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
node dist/cloudAccountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/cloudAccountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudaccountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsCreateOrUpdateSample.ts
[cloudaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsDeleteSample.ts
[cloudaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsGetSample.ts
[cloudaccountslatestlinkedsaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsLatestLinkedSaaSSample.ts
[cloudaccountslinksaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsLinkSaaSSample.ts
[cloudaccountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsListByResourceGroupSample.ts
[cloudaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsListBySubscriptionSample.ts
[cloudaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/cloudAccountsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/operationsListSample.ts
[planscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/plansCreateOrupdateSample.ts
[plansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/plansDeleteSample.ts
[plansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/plansGetSample.ts
[planslistbycloudaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/plansListByCloudAccountSample.ts
[protecteditemsgetrestorepointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectedItemsGetRestorePointsSample.ts
[protecteditemsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectedItemsGetSample.ts
[protecteditemslistbyprotectiongroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectedItemsListByProtectionGroupSample.ts
[protecteditemsoperationgroupcountbyprotectiongroupssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectedItemsOperationGroupCountByProtectionGroupsSample.ts
[protecteditemsrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectedItemsRestoreSample.ts
[protectiongroupsbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsBackupSample.ts
[protectiongroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsCreateOrupdateSample.ts
[protectiongroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsDeleteSample.ts
[protectiongroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsGetSample.ts
[protectiongroupslistbycloudaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsListByCloudAccountSample.ts
[protectiongroupsrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsRestoreSample.ts
[protectiongroupsresumebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsResumeBackupSample.ts
[protectiongroupsstopbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/protectionGroupsStopBackupSample.ts
[rolemappingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/roleMappingsCreateOrUpdateSample.ts
[rolemappingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/roleMappingsDeleteSample.ts
[rolemappingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/roleMappingsGetSample.ts
[rolemappingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/roleMappingsListSample.ts
[saasoperationgroupactivateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/saaSOperationGroupActivateResourceSample.ts
[storagescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/storagesCreateOrUpdateSample.ts
[storagesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/storagesDeleteSample.ts
[storagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/storagesGetSample.ts
[storageslistbycloudaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/placeholder/arm-commvault/samples/v1-beta/typescript/src/storagesListByCloudAccountSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-commvault?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/placeholder/arm-commvault/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
