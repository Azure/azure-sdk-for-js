// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  getCustomerInitiatedMigration,
  revokeUserDelegationKeys,
  restoreBlobRanges,
  customerInitiatedMigration,
  abortHierarchicalNamespaceMigration,
  hierarchicalNamespaceMigration,
  failover,
  listServiceSAS,
  listAccountSAS,
  regenerateKey,
  listKeys,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  getProperties,
  checkNameAvailability,
} from "../../api/storageAccounts/operations.js";
import {
  StorageAccountsGetCustomerInitiatedMigrationOptionalParams,
  StorageAccountsRevokeUserDelegationKeysOptionalParams,
  StorageAccountsRestoreBlobRangesOptionalParams,
  StorageAccountsCustomerInitiatedMigrationOptionalParams,
  StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
  StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
  StorageAccountsFailoverOptionalParams,
  StorageAccountsListServiceSASOptionalParams,
  StorageAccountsListAccountSASOptionalParams,
  StorageAccountsRegenerateKeyOptionalParams,
  StorageAccountsListKeysOptionalParams,
  StorageAccountsListOptionalParams,
  StorageAccountsListByResourceGroupOptionalParams,
  StorageAccountsDeleteOptionalParams,
  StorageAccountsUpdateOptionalParams,
  StorageAccountsCreateOptionalParams,
  StorageAccountsGetPropertiesOptionalParams,
  StorageAccountsCheckNameAvailabilityOptionalParams,
} from "../../api/storageAccounts/options.js";
import {
  StorageAccountCheckNameAvailabilityParameters,
  CheckNameAvailabilityResult,
  StorageAccount,
  BlobRestoreStatus,
  BlobRestoreParameters,
  StorageAccountCreateParameters,
  StorageAccountUpdateParameters,
  StorageAccountListKeysResult,
  StorageAccountRegenerateKeyParameters,
  AccountSasParameters,
  ListAccountSasResponse,
  ServiceSasParameters,
  ListServiceSasResponse,
  StorageAccountMigration,
  MigrationName,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a StorageAccounts operations. */
export interface StorageAccountsOperations {
  /** Gets the status of the ongoing migration for the specified storage account. */
  getCustomerInitiatedMigration: (
    resourceGroupName: string,
    accountName: string,
    migrationName: MigrationName,
    options?: StorageAccountsGetCustomerInitiatedMigrationOptionalParams,
  ) => Promise<StorageAccountMigration>;
  /** Revoke user delegation keys. */
  revokeUserDelegationKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsRevokeUserDelegationKeysOptionalParams,
  ) => Promise<void>;
  /** Restore blobs in the specified blob ranges */
  restoreBlobRanges: (
    resourceGroupName: string,
    accountName: string,
    parameters: BlobRestoreParameters,
    options?: StorageAccountsRestoreBlobRangesOptionalParams,
  ) => PollerLike<OperationState<BlobRestoreStatus>, BlobRestoreStatus>;
  /** @deprecated use restoreBlobRanges instead */
  beginRestoreBlobRanges: (
    resourceGroupName: string,
    accountName: string,
    parameters: BlobRestoreParameters,
    options?: StorageAccountsRestoreBlobRangesOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<BlobRestoreStatus>, BlobRestoreStatus>>;
  /** @deprecated use restoreBlobRanges instead */
  beginRestoreBlobRangesAndWait: (
    resourceGroupName: string,
    accountName: string,
    parameters: BlobRestoreParameters,
    options?: StorageAccountsRestoreBlobRangesOptionalParams,
  ) => Promise<BlobRestoreStatus>;
  /** Account Migration request can be triggered for a storage account to change its redundancy level. The migration updates the non-zonal redundant storage account to a zonal redundant account or vice-versa in order to have better reliability and availability. Zone-redundant storage (ZRS) replicates your storage account synchronously across three Azure availability zones in the primary region. */
  customerInitiatedMigration: (
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountMigration,
    options?: StorageAccountsCustomerInitiatedMigrationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use customerInitiatedMigration instead */
  beginCustomerInitiatedMigration: (
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountMigration,
    options?: StorageAccountsCustomerInitiatedMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use customerInitiatedMigration instead */
  beginCustomerInitiatedMigrationAndWait: (
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountMigration,
    options?: StorageAccountsCustomerInitiatedMigrationOptionalParams,
  ) => Promise<void>;
  /** Abort live Migration of storage account to enable Hns */
  abortHierarchicalNamespaceMigration: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use abortHierarchicalNamespaceMigration instead */
  beginAbortHierarchicalNamespaceMigration: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use abortHierarchicalNamespaceMigration instead */
  beginAbortHierarchicalNamespaceMigrationAndWait: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
  ) => Promise<void>;
  /** Live Migration of storage account to enable Hns */
  hierarchicalNamespaceMigration: (
    resourceGroupName: string,
    accountName: string,
    requestType: string,
    options?: StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use hierarchicalNamespaceMigration instead */
  beginHierarchicalNamespaceMigration: (
    resourceGroupName: string,
    accountName: string,
    requestType: string,
    options?: StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use hierarchicalNamespaceMigration instead */
  beginHierarchicalNamespaceMigrationAndWait: (
    resourceGroupName: string,
    accountName: string,
    requestType: string,
    options?: StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
  ) => Promise<void>;
  /** A failover request can be triggered for a storage account in the event a primary endpoint becomes unavailable for any reason. The failover occurs from the storage account's primary cluster to the secondary cluster for RA-GRS accounts. The secondary cluster will become primary after failover and the account is converted to LRS. In the case of a Planned Failover, the primary and secondary clusters are swapped after failover and the account remains geo-replicated. Failover should continue to be used in the event of availability issues as Planned failover is only available while the primary and secondary endpoints are available. The primary use case of a Planned Failover is disaster recovery testing drills. This type of failover is invoked by setting FailoverType parameter to 'Planned'. Learn more about the failover options here- https://learn.microsoft.com/azure/storage/common/storage-disaster-recovery-guidance */
  failover: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsFailoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsFailoverOptionalParams,
  ) => Promise<void>;
  /** List service SAS credentials of a specific resource. */
  listServiceSAS: (
    resourceGroupName: string,
    accountName: string,
    parameters: ServiceSasParameters,
    options?: StorageAccountsListServiceSASOptionalParams,
  ) => Promise<ListServiceSasResponse>;
  /** List SAS credentials of a storage account. */
  listAccountSAS: (
    resourceGroupName: string,
    accountName: string,
    parameters: AccountSasParameters,
    options?: StorageAccountsListAccountSASOptionalParams,
  ) => Promise<ListAccountSasResponse>;
  /** Regenerates one of the access keys or Kerberos keys for the specified storage account. */
  regenerateKey: (
    resourceGroupName: string,
    accountName: string,
    regenerateKeyParameter: StorageAccountRegenerateKeyParameters,
    options?: StorageAccountsRegenerateKeyOptionalParams,
  ) => Promise<StorageAccountListKeysResult>;
  /** Lists the access keys or Kerberos keys (if active directory enabled) for the specified storage account. */
  listKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsListKeysOptionalParams,
  ) => Promise<StorageAccountListKeysResult>;
  /** Lists all the storage accounts available under the subscription. Note that storage keys are not returned; use the ListKeys operation for this. */
  list: (options?: StorageAccountsListOptionalParams) => PagedAsyncIterableIterator<StorageAccount>;
  /** Lists all the storage accounts available under the given resource group. Note that storage keys are not returned; use the ListKeys operation for this. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: StorageAccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<StorageAccount>;
  /** Deletes a storage account in Microsoft Azure. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation. */
  update: (
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountUpdateParameters,
    options?: StorageAccountsUpdateOptionalParams,
  ) => Promise<StorageAccount>;
  /** Asynchronously creates a new storage account with the specified parameters. If an account is already created and a subsequent create request is issued with different properties, the account properties will be updated. If an account is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed. */
  create: (
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountCreateParameters,
    options?: StorageAccountsCreateOptionalParams,
  ) => PollerLike<OperationState<StorageAccount>, StorageAccount>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountCreateParameters,
    options?: StorageAccountsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<StorageAccount>, StorageAccount>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    accountName: string,
    parameters: StorageAccountCreateParameters,
    options?: StorageAccountsCreateOptionalParams,
  ) => Promise<StorageAccount>;
  /** Returns the properties for the specified storage account including but not limited to name, SKU name, location, and account status. The ListKeys operation should be used to retrieve storage keys. */
  getProperties: (
    resourceGroupName: string,
    accountName: string,
    options?: StorageAccountsGetPropertiesOptionalParams,
  ) => Promise<StorageAccount>;
  /** Checks that the storage account name is valid and is not already in use. */
  checkNameAvailability: (
    accountName: StorageAccountCheckNameAvailabilityParameters,
    options?: StorageAccountsCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResult>;
}

function _getStorageAccounts(context: StorageManagementContext) {
  return {
    getCustomerInitiatedMigration: (
      resourceGroupName: string,
      accountName: string,
      migrationName: MigrationName,
      options?: StorageAccountsGetCustomerInitiatedMigrationOptionalParams,
    ) =>
      getCustomerInitiatedMigration(
        context,
        resourceGroupName,
        accountName,
        migrationName,
        options,
      ),
    revokeUserDelegationKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsRevokeUserDelegationKeysOptionalParams,
    ) => revokeUserDelegationKeys(context, resourceGroupName, accountName, options),
    restoreBlobRanges: (
      resourceGroupName: string,
      accountName: string,
      parameters: BlobRestoreParameters,
      options?: StorageAccountsRestoreBlobRangesOptionalParams,
    ) => restoreBlobRanges(context, resourceGroupName, accountName, parameters, options),
    beginRestoreBlobRanges: async (
      resourceGroupName: string,
      accountName: string,
      parameters: BlobRestoreParameters,
      options?: StorageAccountsRestoreBlobRangesOptionalParams,
    ) => {
      const poller = restoreBlobRanges(
        context,
        resourceGroupName,
        accountName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestoreBlobRangesAndWait: async (
      resourceGroupName: string,
      accountName: string,
      parameters: BlobRestoreParameters,
      options?: StorageAccountsRestoreBlobRangesOptionalParams,
    ) => {
      return await restoreBlobRanges(context, resourceGroupName, accountName, parameters, options);
    },
    customerInitiatedMigration: (
      resourceGroupName: string,
      accountName: string,
      parameters: StorageAccountMigration,
      options?: StorageAccountsCustomerInitiatedMigrationOptionalParams,
    ) => customerInitiatedMigration(context, resourceGroupName, accountName, parameters, options),
    beginCustomerInitiatedMigration: async (
      resourceGroupName: string,
      accountName: string,
      parameters: StorageAccountMigration,
      options?: StorageAccountsCustomerInitiatedMigrationOptionalParams,
    ) => {
      const poller = customerInitiatedMigration(
        context,
        resourceGroupName,
        accountName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCustomerInitiatedMigrationAndWait: async (
      resourceGroupName: string,
      accountName: string,
      parameters: StorageAccountMigration,
      options?: StorageAccountsCustomerInitiatedMigrationOptionalParams,
    ) => {
      return await customerInitiatedMigration(
        context,
        resourceGroupName,
        accountName,
        parameters,
        options,
      );
    },
    abortHierarchicalNamespaceMigration: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
    ) => abortHierarchicalNamespaceMigration(context, resourceGroupName, accountName, options),
    beginAbortHierarchicalNamespaceMigration: async (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
    ) => {
      const poller = abortHierarchicalNamespaceMigration(
        context,
        resourceGroupName,
        accountName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAbortHierarchicalNamespaceMigrationAndWait: async (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsAbortHierarchicalNamespaceMigrationOptionalParams,
    ) => {
      return await abortHierarchicalNamespaceMigration(
        context,
        resourceGroupName,
        accountName,
        options,
      );
    },
    hierarchicalNamespaceMigration: (
      resourceGroupName: string,
      accountName: string,
      requestType: string,
      options?: StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
    ) =>
      hierarchicalNamespaceMigration(context, resourceGroupName, accountName, requestType, options),
    beginHierarchicalNamespaceMigration: async (
      resourceGroupName: string,
      accountName: string,
      requestType: string,
      options?: StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
    ) => {
      const poller = hierarchicalNamespaceMigration(
        context,
        resourceGroupName,
        accountName,
        requestType,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginHierarchicalNamespaceMigrationAndWait: async (
      resourceGroupName: string,
      accountName: string,
      requestType: string,
      options?: StorageAccountsHierarchicalNamespaceMigrationOptionalParams,
    ) => {
      return await hierarchicalNamespaceMigration(
        context,
        resourceGroupName,
        accountName,
        requestType,
        options,
      );
    },
    failover: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsFailoverOptionalParams,
    ) => failover(context, resourceGroupName, accountName, options),
    beginFailover: async (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsFailoverOptionalParams,
    ) => {
      const poller = failover(context, resourceGroupName, accountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsFailoverOptionalParams,
    ) => {
      return await failover(context, resourceGroupName, accountName, options);
    },
    listServiceSAS: (
      resourceGroupName: string,
      accountName: string,
      parameters: ServiceSasParameters,
      options?: StorageAccountsListServiceSASOptionalParams,
    ) => listServiceSAS(context, resourceGroupName, accountName, parameters, options),
    listAccountSAS: (
      resourceGroupName: string,
      accountName: string,
      parameters: AccountSasParameters,
      options?: StorageAccountsListAccountSASOptionalParams,
    ) => listAccountSAS(context, resourceGroupName, accountName, parameters, options),
    regenerateKey: (
      resourceGroupName: string,
      accountName: string,
      regenerateKeyParameter: StorageAccountRegenerateKeyParameters,
      options?: StorageAccountsRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, accountName, regenerateKeyParameter, options),
    listKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, accountName, options),
    list: (options?: StorageAccountsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: StorageAccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      parameters: StorageAccountUpdateParameters,
      options?: StorageAccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, parameters, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      parameters: StorageAccountCreateParameters,
      options?: StorageAccountsCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, parameters, options),
    beginCreate: async (
      resourceGroupName: string,
      accountName: string,
      parameters: StorageAccountCreateParameters,
      options?: StorageAccountsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, accountName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      parameters: StorageAccountCreateParameters,
      options?: StorageAccountsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, accountName, parameters, options);
    },
    getProperties: (
      resourceGroupName: string,
      accountName: string,
      options?: StorageAccountsGetPropertiesOptionalParams,
    ) => getProperties(context, resourceGroupName, accountName, options),
    checkNameAvailability: (
      accountName: StorageAccountCheckNameAvailabilityParameters,
      options?: StorageAccountsCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, accountName, options),
  };
}

export function _getStorageAccountsOperations(
  context: StorageManagementContext,
): StorageAccountsOperations {
  return {
    ..._getStorageAccounts(context),
  };
}
