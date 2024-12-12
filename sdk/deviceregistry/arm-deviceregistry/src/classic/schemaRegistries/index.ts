// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  SchemaRegistriesGetOptionalParams,
  SchemaRegistriesCreateOrReplaceOptionalParams,
  SchemaRegistriesUpdateOptionalParams,
  SchemaRegistriesDeleteOptionalParams,
  SchemaRegistriesListByResourceGroupOptionalParams,
  SchemaRegistriesListBySubscriptionOptionalParams,
} from "../../api/options.js";
import {
  schemaRegistriesGet,
  schemaRegistriesCreateOrReplace,
  schemaRegistriesUpdate,
  schemaRegistriesDelete,
  schemaRegistriesListByResourceGroup,
  schemaRegistriesListBySubscription,
} from "../../api/schemaRegistries/index.js";
import { SchemaRegistry, SchemaRegistryUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SchemaRegistries operations. */
export interface SchemaRegistriesOperations {
  /** Get a SchemaRegistry */
  get: (
    resourceGroupName: string,
    schemaRegistryName: string,
    options?: SchemaRegistriesGetOptionalParams,
  ) => Promise<SchemaRegistry>;
  /** Create a SchemaRegistry */
  createOrReplace: (
    resourceGroupName: string,
    schemaRegistryName: string,
    resource: SchemaRegistry,
    options?: SchemaRegistriesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<SchemaRegistry>, SchemaRegistry>;
  /** Update a SchemaRegistry */
  update: (
    resourceGroupName: string,
    schemaRegistryName: string,
    properties: SchemaRegistryUpdate,
    options?: SchemaRegistriesUpdateOptionalParams,
  ) => PollerLike<OperationState<SchemaRegistry>, SchemaRegistry>;
  /** Delete a SchemaRegistry */
  delete: (
    resourceGroupName: string,
    schemaRegistryName: string,
    options?: SchemaRegistriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List SchemaRegistry resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SchemaRegistriesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaRegistry>;
  /** List SchemaRegistry resources by subscription ID */
  listBySubscription: (
    options?: SchemaRegistriesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaRegistry>;
}

export function getSchemaRegistries(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
) {
  return {
    get: (
      resourceGroupName: string,
      schemaRegistryName: string,
      options?: SchemaRegistriesGetOptionalParams,
    ) =>
      schemaRegistriesGet(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        options,
      ),
    createOrReplace: (
      resourceGroupName: string,
      schemaRegistryName: string,
      resource: SchemaRegistry,
      options?: SchemaRegistriesCreateOrReplaceOptionalParams,
    ) =>
      schemaRegistriesCreateOrReplace(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        resource,
        options,
      ),
    update: (
      resourceGroupName: string,
      schemaRegistryName: string,
      properties: SchemaRegistryUpdate,
      options?: SchemaRegistriesUpdateOptionalParams,
    ) =>
      schemaRegistriesUpdate(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        properties,
        options,
      ),
    delete: (
      resourceGroupName: string,
      schemaRegistryName: string,
      options?: SchemaRegistriesDeleteOptionalParams,
    ) =>
      schemaRegistriesDelete(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        options,
      ),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SchemaRegistriesListByResourceGroupOptionalParams,
    ) =>
      schemaRegistriesListByResourceGroup(
        context,
        subscriptionId,
        resourceGroupName,
        options,
      ),
    listBySubscription: (
      options?: SchemaRegistriesListBySubscriptionOptionalParams,
    ) => schemaRegistriesListBySubscription(context, subscriptionId, options),
  };
}

export function getSchemaRegistriesOperations(
  context: DeviceRegistryManagementContext,
  subscriptionId: string,
): SchemaRegistriesOperations {
  return {
    ...getSchemaRegistries(context, subscriptionId),
  };
}
