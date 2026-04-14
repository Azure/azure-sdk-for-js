// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  checkNameExists,
  listMetricDefinitions,
  listUsages,
  listMetrics,
  regenerateKey,
  listReadOnlyKeys,
  getReadOnlyKeys,
  onlineRegion,
  offlineRegion,
  listConnectionStrings,
  listKeys,
  failoverPriorityChange,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/databaseAccounts/operations.js";
import type {
  DatabaseAccountsCheckNameExistsOptionalParams,
  DatabaseAccountsListMetricDefinitionsOptionalParams,
  DatabaseAccountsListUsagesOptionalParams,
  DatabaseAccountsListMetricsOptionalParams,
  DatabaseAccountsRegenerateKeyOptionalParams,
  DatabaseAccountsListReadOnlyKeysOptionalParams,
  DatabaseAccountsGetReadOnlyKeysOptionalParams,
  DatabaseAccountsOnlineRegionOptionalParams,
  DatabaseAccountsOfflineRegionOptionalParams,
  DatabaseAccountsListConnectionStringsOptionalParams,
  DatabaseAccountsListKeysOptionalParams,
  DatabaseAccountsFailoverPriorityChangeOptionalParams,
  DatabaseAccountsListOptionalParams,
  DatabaseAccountsListByResourceGroupOptionalParams,
  DatabaseAccountsDeleteOptionalParams,
  DatabaseAccountsUpdateOptionalParams,
  DatabaseAccountsCreateOrUpdateOptionalParams,
  DatabaseAccountsGetOptionalParams,
} from "../../api/databaseAccounts/options.js";
import type {
  DatabaseAccountGetResults,
  DatabaseAccountCreateUpdateParameters,
  DatabaseAccountUpdateParameters,
  FailoverPolicies,
  DatabaseAccountListKeysResult,
  DatabaseAccountListReadOnlyKeysResult,
  DatabaseAccountListConnectionStringsResult,
  RegionForOnlineOffline,
  DatabaseAccountRegenerateKeyParameters,
  Metric,
  Usage,
  MetricDefinition,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DatabaseAccounts operations. */
export interface DatabaseAccountsOperations {
  /** Checks that the Azure Cosmos DB account name already exists. A valid account name may contain only lowercase letters, numbers, and the '-' character, and must be between 3 and 50 characters. */
  checkNameExists: (
    accountName: string,
    options?: DatabaseAccountsCheckNameExistsOptionalParams,
  ) => Promise<void>;
  /** Retrieves metric definitions for the given database account. */
  listMetricDefinitions: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsListMetricDefinitionsOptionalParams,
  ) => PagedAsyncIterableIterator<MetricDefinition>;
  /** Retrieves the usages (most recent data) for the given database account. */
  listUsages: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsListUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<Usage>;
  /** Retrieves the metrics determined by the given filter for the given database account. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    filter: string,
    options?: DatabaseAccountsListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<Metric>;
  /** Regenerates an access key for the specified Azure Cosmos DB database account. */
  regenerateKey: (
    resourceGroupName: string,
    accountName: string,
    keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
    options?: DatabaseAccountsRegenerateKeyOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKey: (
    resourceGroupName: string,
    accountName: string,
    keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
    options?: DatabaseAccountsRegenerateKeyOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use regenerateKey instead */
  beginRegenerateKeyAndWait: (
    resourceGroupName: string,
    accountName: string,
    keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
    options?: DatabaseAccountsRegenerateKeyOptionalParams,
  ) => Promise<void>;
  /** Lists the read-only access keys for the specified Azure Cosmos DB database account. */
  listReadOnlyKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsListReadOnlyKeysOptionalParams,
  ) => Promise<DatabaseAccountListReadOnlyKeysResult>;
  /** Lists the read-only access keys for the specified Azure Cosmos DB database account. */
  getReadOnlyKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsGetReadOnlyKeysOptionalParams,
  ) => Promise<DatabaseAccountListReadOnlyKeysResult>;
  /** Online the specified region for the specified Azure Cosmos DB database account. */
  onlineRegion: (
    resourceGroupName: string,
    accountName: string,
    regionParameterForOnline: RegionForOnlineOffline,
    options?: DatabaseAccountsOnlineRegionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use onlineRegion instead */
  beginOnlineRegion: (
    resourceGroupName: string,
    accountName: string,
    regionParameterForOnline: RegionForOnlineOffline,
    options?: DatabaseAccountsOnlineRegionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use onlineRegion instead */
  beginOnlineRegionAndWait: (
    resourceGroupName: string,
    accountName: string,
    regionParameterForOnline: RegionForOnlineOffline,
    options?: DatabaseAccountsOnlineRegionOptionalParams,
  ) => Promise<void>;
  /** Offline the specified region for the specified Azure Cosmos DB database account. */
  offlineRegion: (
    resourceGroupName: string,
    accountName: string,
    regionParameterForOffline: RegionForOnlineOffline,
    options?: DatabaseAccountsOfflineRegionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use offlineRegion instead */
  beginOfflineRegion: (
    resourceGroupName: string,
    accountName: string,
    regionParameterForOffline: RegionForOnlineOffline,
    options?: DatabaseAccountsOfflineRegionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use offlineRegion instead */
  beginOfflineRegionAndWait: (
    resourceGroupName: string,
    accountName: string,
    regionParameterForOffline: RegionForOnlineOffline,
    options?: DatabaseAccountsOfflineRegionOptionalParams,
  ) => Promise<void>;
  /** Lists the connection strings for the specified Azure Cosmos DB database account. */
  listConnectionStrings: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsListConnectionStringsOptionalParams,
  ) => Promise<DatabaseAccountListConnectionStringsResult>;
  /** Lists the access keys for the specified Azure Cosmos DB database account. */
  listKeys: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsListKeysOptionalParams,
  ) => Promise<DatabaseAccountListKeysResult>;
  /** Changes the failover priority for the Azure Cosmos DB database account. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists. */
  failoverPriorityChange: (
    resourceGroupName: string,
    accountName: string,
    failoverParameters: FailoverPolicies,
    options?: DatabaseAccountsFailoverPriorityChangeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use failoverPriorityChange instead */
  beginFailoverPriorityChange: (
    resourceGroupName: string,
    accountName: string,
    failoverParameters: FailoverPolicies,
    options?: DatabaseAccountsFailoverPriorityChangeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use failoverPriorityChange instead */
  beginFailoverPriorityChangeAndWait: (
    resourceGroupName: string,
    accountName: string,
    failoverParameters: FailoverPolicies,
    options?: DatabaseAccountsFailoverPriorityChangeOptionalParams,
  ) => Promise<void>;
  /** Lists all the Azure Cosmos DB database accounts available under the subscription. */
  list: (
    options?: DatabaseAccountsListOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseAccountGetResults>;
  /** Lists all the Azure Cosmos DB database accounts available under the given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DatabaseAccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<DatabaseAccountGetResults>;
  /** Deletes an existing Azure Cosmos DB database account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the properties of an existing Azure Cosmos DB database account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    updateParameters: DatabaseAccountUpdateParameters,
    options?: DatabaseAccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    updateParameters: DatabaseAccountUpdateParameters,
    options?: DatabaseAccountsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    updateParameters: DatabaseAccountUpdateParameters,
    options?: DatabaseAccountsUpdateOptionalParams,
  ) => Promise<DatabaseAccountGetResults>;
  /** Creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    createUpdateParameters: DatabaseAccountCreateUpdateParameters,
    options?: DatabaseAccountsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    createUpdateParameters: DatabaseAccountCreateUpdateParameters,
    options?: DatabaseAccountsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DatabaseAccountGetResults>, DatabaseAccountGetResults>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    createUpdateParameters: DatabaseAccountCreateUpdateParameters,
    options?: DatabaseAccountsCreateOrUpdateOptionalParams,
  ) => Promise<DatabaseAccountGetResults>;
  /** Retrieves the properties of an existing Azure Cosmos DB database account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: DatabaseAccountsGetOptionalParams,
  ) => Promise<DatabaseAccountGetResults>;
}

function _getDatabaseAccounts(context: CosmosDBManagementContext) {
  return {
    checkNameExists: (
      accountName: string,
      options?: DatabaseAccountsCheckNameExistsOptionalParams,
    ) => checkNameExists(context, accountName, options),
    listMetricDefinitions: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsListMetricDefinitionsOptionalParams,
    ) => listMetricDefinitions(context, resourceGroupName, accountName, options),
    listUsages: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, accountName, options),
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      filter: string,
      options?: DatabaseAccountsListMetricsOptionalParams,
    ) => listMetrics(context, resourceGroupName, accountName, filter, options),
    regenerateKey: (
      resourceGroupName: string,
      accountName: string,
      keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
      options?: DatabaseAccountsRegenerateKeyOptionalParams,
    ) => regenerateKey(context, resourceGroupName, accountName, keyToRegenerate, options),
    beginRegenerateKey: async (
      resourceGroupName: string,
      accountName: string,
      keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
      options?: DatabaseAccountsRegenerateKeyOptionalParams,
    ) => {
      const poller = regenerateKey(
        context,
        resourceGroupName,
        accountName,
        keyToRegenerate,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRegenerateKeyAndWait: async (
      resourceGroupName: string,
      accountName: string,
      keyToRegenerate: DatabaseAccountRegenerateKeyParameters,
      options?: DatabaseAccountsRegenerateKeyOptionalParams,
    ) => {
      return await regenerateKey(context, resourceGroupName, accountName, keyToRegenerate, options);
    },
    listReadOnlyKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsListReadOnlyKeysOptionalParams,
    ) => listReadOnlyKeys(context, resourceGroupName, accountName, options),
    getReadOnlyKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsGetReadOnlyKeysOptionalParams,
    ) => getReadOnlyKeys(context, resourceGroupName, accountName, options),
    onlineRegion: (
      resourceGroupName: string,
      accountName: string,
      regionParameterForOnline: RegionForOnlineOffline,
      options?: DatabaseAccountsOnlineRegionOptionalParams,
    ) => onlineRegion(context, resourceGroupName, accountName, regionParameterForOnline, options),
    beginOnlineRegion: async (
      resourceGroupName: string,
      accountName: string,
      regionParameterForOnline: RegionForOnlineOffline,
      options?: DatabaseAccountsOnlineRegionOptionalParams,
    ) => {
      const poller = onlineRegion(
        context,
        resourceGroupName,
        accountName,
        regionParameterForOnline,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginOnlineRegionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      regionParameterForOnline: RegionForOnlineOffline,
      options?: DatabaseAccountsOnlineRegionOptionalParams,
    ) => {
      return await onlineRegion(
        context,
        resourceGroupName,
        accountName,
        regionParameterForOnline,
        options,
      );
    },
    offlineRegion: (
      resourceGroupName: string,
      accountName: string,
      regionParameterForOffline: RegionForOnlineOffline,
      options?: DatabaseAccountsOfflineRegionOptionalParams,
    ) => offlineRegion(context, resourceGroupName, accountName, regionParameterForOffline, options),
    beginOfflineRegion: async (
      resourceGroupName: string,
      accountName: string,
      regionParameterForOffline: RegionForOnlineOffline,
      options?: DatabaseAccountsOfflineRegionOptionalParams,
    ) => {
      const poller = offlineRegion(
        context,
        resourceGroupName,
        accountName,
        regionParameterForOffline,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginOfflineRegionAndWait: async (
      resourceGroupName: string,
      accountName: string,
      regionParameterForOffline: RegionForOnlineOffline,
      options?: DatabaseAccountsOfflineRegionOptionalParams,
    ) => {
      return await offlineRegion(
        context,
        resourceGroupName,
        accountName,
        regionParameterForOffline,
        options,
      );
    },
    listConnectionStrings: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsListConnectionStringsOptionalParams,
    ) => listConnectionStrings(context, resourceGroupName, accountName, options),
    listKeys: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsListKeysOptionalParams,
    ) => listKeys(context, resourceGroupName, accountName, options),
    failoverPriorityChange: (
      resourceGroupName: string,
      accountName: string,
      failoverParameters: FailoverPolicies,
      options?: DatabaseAccountsFailoverPriorityChangeOptionalParams,
    ) =>
      failoverPriorityChange(context, resourceGroupName, accountName, failoverParameters, options),
    beginFailoverPriorityChange: async (
      resourceGroupName: string,
      accountName: string,
      failoverParameters: FailoverPolicies,
      options?: DatabaseAccountsFailoverPriorityChangeOptionalParams,
    ) => {
      const poller = failoverPriorityChange(
        context,
        resourceGroupName,
        accountName,
        failoverParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverPriorityChangeAndWait: async (
      resourceGroupName: string,
      accountName: string,
      failoverParameters: FailoverPolicies,
      options?: DatabaseAccountsFailoverPriorityChangeOptionalParams,
    ) => {
      return await failoverPriorityChange(
        context,
        resourceGroupName,
        accountName,
        failoverParameters,
        options,
      );
    },
    list: (options?: DatabaseAccountsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DatabaseAccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      updateParameters: DatabaseAccountUpdateParameters,
      options?: DatabaseAccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, updateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      updateParameters: DatabaseAccountUpdateParameters,
      options?: DatabaseAccountsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, accountName, updateParameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      updateParameters: DatabaseAccountUpdateParameters,
      options?: DatabaseAccountsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, accountName, updateParameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      createUpdateParameters: DatabaseAccountCreateUpdateParameters,
      options?: DatabaseAccountsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, createUpdateParameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      createUpdateParameters: DatabaseAccountCreateUpdateParameters,
      options?: DatabaseAccountsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        createUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      createUpdateParameters: DatabaseAccountCreateUpdateParameters,
      options?: DatabaseAccountsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        createUpdateParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      options?: DatabaseAccountsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, options),
  };
}

export function _getDatabaseAccountsOperations(
  context: CosmosDBManagementContext,
): DatabaseAccountsOperations {
  return {
    ..._getDatabaseAccounts(context),
  };
}
