// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

export interface MongoClustersOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersGetOptionalParams,
  ) => Promise<MongoCluster>;
  createOrUpdate: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    resource: MongoCluster,
    options?: MongoClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<MongoCluster>, MongoCluster>;
  update: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    properties: MongoClusterUpdate,
    options?: MongoClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<MongoCluster>, MongoCluster>;
  delete: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  listByResourceGroup: (
    subscriptionId: string,
    resourceGroupName: string,
    options?: MongoClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<MongoCluster>;
  list: (
    subscriptionId: string,
    options?: MongoClustersListOptionalParams,
  ) => PagedAsyncIterableIterator<MongoCluster>;
  listConnectionStrings: (
    subscriptionId: string,
    resourceGroupName: string,
    mongoClusterName: string,
    options?: MongoClustersListConnectionStringsOptionalParams,
  ) => Promise<ListConnectionStringsResult>;
  checkNameAvailability: (
    subscriptionId: string,
    location: string,
    body: CheckNameAvailabilityRequest,
    options?: MongoClustersCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameAvailabilityResponse>;
}

export function getMongoClusters(context: DocumentDBContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersGetOptionalParams,
    ) =>
      mongoClustersGet(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    createOrUpdate: (
      subscriptionId: string,
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
      subscriptionId: string,
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
      subscriptionId: string,
      resourceGroupName: string,
      mongoClusterName: string,
      options?: MongoClustersDeleteOptionalParams,
    ) =>
      mongoClustersDelete(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
    listByResourceGroup: (
      subscriptionId: string,
      resourceGroupName: string,
      options?: MongoClustersListByResourceGroupOptionalParams,
    ) =>
      mongoClustersListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    list: (subscriptionId: string, options?: MongoClustersListOptionalParams) =>
      mongoClustersList(context, subscriptionId, options),
    listConnectionStrings: (
      subscriptionId: string,
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
      subscriptionId: string,
      location: string,
      body: CheckNameAvailabilityRequest,
      options?: MongoClustersCheckNameAvailabilityOptionalParams,
    ) =>
      mongoClustersCheckNameAvailability(
        context,
        subscriptionId,
        location,
        body,
        options,
      ),
  };
}

export function getMongoClustersOperations(
  context: DocumentDBContext,
): MongoClustersOperations {
  return {
    ...getMongoClusters(context),
  };
}
