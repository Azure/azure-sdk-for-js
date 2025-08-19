// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementContext } from "../../api/mongoClusterManagementContext.js";
import {
  MongoCluster,
  MongoClusterUpdate,
  ListConnectionStringsResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  PromoteReplicaRequest,
} from "../../models/models.js";
import {
  MongoClustersPromoteOptionalParams,
  MongoClustersCheckNameAvailabilityOptionalParams,
  MongoClustersListConnectionStringsOptionalParams,
  MongoClustersListOptionalParams,
  MongoClustersListByResourceGroupOptionalParams,
  MongoClustersDeleteOptionalParams,
  MongoClustersUpdateOptionalParams,
  MongoClustersCreateOrUpdateOptionalParams,
  MongoClustersGetOptionalParams,
} from "../../api/mongoClusters/options.js";
import {
  promote,
  checkNameAvailability,
  listConnectionStrings,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/mongoClusters/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a MongoClusters operations. */
export interface MongoClustersOperations {
  /** Promotes a replica mongo cluster to a primary role. */
  promote: (
    resourceGroupName: string,
    mongoClusterName: string,
    body: PromoteReplicaRequest,
    options?: MongoClustersPromoteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Check if mongo cluster name is available for use. */
  checkNameAvailability: (
    location: string,
    body: CheckNameAvailabilityRequest,
    options?: MongoClustersCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
  /** List mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster. */
  listConnectionStrings: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersListConnectionStringsOptionalParams,
  ) => Promise<ListConnectionStringsResult>;
  /** List all the mongo clusters in a given subscription. */
  list: (options?: MongoClustersListOptionalParams) => PagedAsyncIterableIterator<MongoCluster>;
  /** List all the mongo clusters in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MongoClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MongoCluster>;
  /** Deletes a mongo cluster. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition. */
  update: (
    resourceGroupName: string,
    mongoClusterName: string,
    properties: MongoClusterUpdate,
    options?: MongoClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<MongoCluster>, MongoCluster>;
  /** Create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH. */
  createOrUpdate: (
    resourceGroupName: string,
    mongoClusterName: string,
    resource: MongoCluster,
    options?: MongoClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MongoCluster>, MongoCluster>;
  /** Gets information about a mongo cluster. */
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersGetOptionalParams,
  ) => Promise<MongoCluster>;
}

function _getMongoClusters(context: MongoClusterManagementContext) {
  return {
    promote: (
      resourceGroupName: string,
      mongoClusterName: string,
      body: PromoteReplicaRequest,
      options?: MongoClustersPromoteOptionalParams,
    ) => promote(context, resourceGroupName, mongoClusterName, body, options),
    checkNameAvailability: (
      location: string,
      body: CheckNameAvailabilityRequest,
      options?: MongoClustersCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, location, body, options),
    listConnectionStrings: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersListConnectionStringsOptionalParams,
    ) => listConnectionStrings(context, resourceGroupName, mongoClusterName, options),
    list: (options?: MongoClustersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MongoClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, mongoClusterName, options),
    update: (
      resourceGroupName: string,
      mongoClusterName: string,
      properties: MongoClusterUpdate,
      options?: MongoClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, mongoClusterName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      mongoClusterName: string,
      resource: MongoCluster,
      options?: MongoClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, mongoClusterName, resource, options),
    get: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersGetOptionalParams,
    ) => get(context, resourceGroupName, mongoClusterName, options),
  };
}

export function _getMongoClustersOperations(
  context: MongoClusterManagementContext,
): MongoClustersOperations {
  return {
    ..._getMongoClusters(context),
  };
}
