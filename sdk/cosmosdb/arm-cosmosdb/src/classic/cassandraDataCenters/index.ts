// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import {
  list,
  $delete,
  update,
  createUpdate,
  get,
} from "../../api/cassandraDataCenters/operations.js";
import type {
  CassandraDataCentersListOptionalParams,
  CassandraDataCentersDeleteOptionalParams,
  CassandraDataCentersUpdateOptionalParams,
  CassandraDataCentersCreateUpdateOptionalParams,
  CassandraDataCentersGetOptionalParams,
} from "../../api/cassandraDataCenters/options.js";
import type { DataCenterResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CassandraDataCenters operations. */
export interface CassandraDataCentersOperations {
  /** List all data centers in a particular managed Cassandra cluster. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraDataCentersListOptionalParams,
  ) => PagedAsyncIterableIterator<DataCenterResource>;
  /** Delete a managed Cassandra data center. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    options?: CassandraDataCentersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    options?: CassandraDataCentersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    options?: CassandraDataCentersDeleteOptionalParams,
  ) => Promise<void>;
  /** Update some of the properties of a managed Cassandra data center. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    body: DataCenterResource,
    options?: CassandraDataCentersUpdateOptionalParams,
  ) => PollerLike<OperationState<DataCenterResource>, DataCenterResource>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    body: DataCenterResource,
    options?: CassandraDataCentersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataCenterResource>, DataCenterResource>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    body: DataCenterResource,
    options?: CassandraDataCentersUpdateOptionalParams,
  ) => Promise<DataCenterResource>;
  /** Create or update a managed Cassandra data center. When updating, overwrite all properties. To update only some properties, use PATCH. */
  createUpdate: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    body: DataCenterResource,
    options?: CassandraDataCentersCreateUpdateOptionalParams,
  ) => PollerLike<OperationState<DataCenterResource>, DataCenterResource>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdate: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    body: DataCenterResource,
    options?: CassandraDataCentersCreateUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataCenterResource>, DataCenterResource>>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    body: DataCenterResource,
    options?: CassandraDataCentersCreateUpdateOptionalParams,
  ) => Promise<DataCenterResource>;
  /** Get the properties of a managed Cassandra data center. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    dataCenterName: string,
    options?: CassandraDataCentersGetOptionalParams,
  ) => Promise<DataCenterResource>;
}

function _getCassandraDataCenters(context: CosmosDBManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      options?: CassandraDataCentersListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      options?: CassandraDataCentersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, dataCenterName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      options?: CassandraDataCentersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, clusterName, dataCenterName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      options?: CassandraDataCentersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, clusterName, dataCenterName, options);
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      body: DataCenterResource,
      options?: CassandraDataCentersUpdateOptionalParams,
    ) => update(context, resourceGroupName, clusterName, dataCenterName, body, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      body: DataCenterResource,
      options?: CassandraDataCentersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, clusterName, dataCenterName, body, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      body: DataCenterResource,
      options?: CassandraDataCentersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, clusterName, dataCenterName, body, options);
    },
    createUpdate: (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      body: DataCenterResource,
      options?: CassandraDataCentersCreateUpdateOptionalParams,
    ) => createUpdate(context, resourceGroupName, clusterName, dataCenterName, body, options),
    beginCreateUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      body: DataCenterResource,
      options?: CassandraDataCentersCreateUpdateOptionalParams,
    ) => {
      const poller = createUpdate(
        context,
        resourceGroupName,
        clusterName,
        dataCenterName,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      body: DataCenterResource,
      options?: CassandraDataCentersCreateUpdateOptionalParams,
    ) => {
      return await createUpdate(
        context,
        resourceGroupName,
        clusterName,
        dataCenterName,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      dataCenterName: string,
      options?: CassandraDataCentersGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, dataCenterName, options),
  };
}

export function _getCassandraDataCentersOperations(
  context: CosmosDBManagementContext,
): CassandraDataCentersOperations {
  return {
    ..._getCassandraDataCenters(context),
  };
}
