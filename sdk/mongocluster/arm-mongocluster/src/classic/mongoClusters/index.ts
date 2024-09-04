// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import {
  MongoCluster,
  MongoClusterUpdate,
  ListConnectionStringsResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
} from "../../models/models.js";
import {
  mongoClustersGet,
  mongoClustersCreateOrUpdate,
  mongoClustersUpdate,
  mongoClustersDelete,
  mongoClustersListByResourceGroup,
  mongoClustersList,
  mongoClustersListConnectionStrings,
  mongoClustersCheckNameAvailability,
} from "../../api/mongoClusters/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PollerLike, OperationState } from "@azure/core-lro";
import {
  MongoClustersGetOptionalParams,
  MongoClustersCreateOrUpdateOptionalParams,
  MongoClustersUpdateOptionalParams,
  MongoClustersDeleteOptionalParams,
  MongoClustersListByResourceGroupOptionalParams,
  MongoClustersListOptionalParams,
  MongoClustersListConnectionStringsOptionalParams,
  MongoClustersCheckNameAvailabilityOptionalParams,
} from "../../models/options.js";

/** Interface representing a MongoClusters operations. */
export interface MongoClustersOperations {
  /** Gets information about a mongo cluster. */
  get: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersGetOptionalParams,
  ) => Promise<MongoCluster>;
  /** Create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH. */
  createOrUpdate: (
    resourceGroupName: string,
    mongoClusterName: string,
    resource: MongoCluster,
    options?: MongoClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MongoCluster>, MongoCluster>;
  /** Updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition. */
  update: (
    resourceGroupName: string,
    mongoClusterName: string,
    properties: MongoClusterUpdate,
    options?: MongoClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<MongoCluster>, MongoCluster>;
  /** Deletes a mongo cluster. */
  delete: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all the mongo clusters in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: MongoClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MongoCluster>;
  /** List all the mongo clusters in a given subscription. */
  list: (options?: MongoClustersListOptionalParams) => PagedAsyncIterableIterator<MongoCluster>;
  /** List mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster. */
  listConnectionStrings: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersListConnectionStringsOptionalParams,
  ) => Promise<ListConnectionStringsResult>;
  /** Check if mongo cluster name is available for use. */
  checkNameAvailability: (
    location: string,
    body: CheckNameAvailabilityRequest,
    options?: MongoClustersCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
}

export function getMongoClusters(context: DocumentDBContext, subscriptionId: string) {
  return {
    get: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersGetOptionalParams,
    ) => mongoClustersGet(context, subscriptionId, resourceGroupName, mongoClusterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      mongoClusterName: string,
      resource: MongoCluster,
      options?: MongoClustersCreateOrUpdateOptionalParams,
    ) =>
      mongoClustersCreateOrUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      mongoClusterName: string,
      properties: MongoClusterUpdate,
      options?: MongoClustersUpdateOptionalParams,
    ) =>
      mongoClustersUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersDeleteOptionalParams,
    ) => mongoClustersDelete(context, subscriptionId, resourceGroupName, mongoClusterName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: MongoClustersListByResourceGroupOptionalParams,
    ) => mongoClustersListByResourceGroup(context, subscriptionId, resourceGroupName, options),
    list: (options?: MongoClustersListOptionalParams) =>
      mongoClustersList(context, subscriptionId, options),
    listConnectionStrings: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersListConnectionStringsOptionalParams,
    ) =>
      mongoClustersListConnectionStrings(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    checkNameAvailability: (
      location: string,
      body: CheckNameAvailabilityRequest,
      options?: MongoClustersCheckNameAvailabilityOptionalParams,
    ) => mongoClustersCheckNameAvailability(context, subscriptionId, location, body, options),
  };
}

export function getMongoClustersOperations(
  context: DocumentDBContext,
  subscriptionId: string,
): MongoClustersOperations {
  return {
    ...getMongoClusters(context, subscriptionId),
  };
}
