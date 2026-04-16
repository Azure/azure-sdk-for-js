// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrReplace,
  get,
} from "../../api/schemaRegistries/operations.js";
import type {
  SchemaRegistriesListBySubscriptionOptionalParams,
  SchemaRegistriesListByResourceGroupOptionalParams,
  SchemaRegistriesDeleteOptionalParams,
  SchemaRegistriesUpdateOptionalParams,
  SchemaRegistriesCreateOrReplaceOptionalParams,
  SchemaRegistriesGetOptionalParams,
} from "../../api/schemaRegistries/options.js";
import type { SchemaRegistry, SchemaRegistryUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SchemaRegistries operations. */
export interface SchemaRegistriesOperations {
  /** List SchemaRegistry resources by subscription ID */
  listBySubscription: (
    options?: SchemaRegistriesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaRegistry>;
  /** List SchemaRegistry resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SchemaRegistriesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SchemaRegistry>;
  /** Delete a SchemaRegistry */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    schemaRegistryName: string,
    options?: SchemaRegistriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a SchemaRegistry */
  update: (
    resourceGroupName: string,
    schemaRegistryName: string,
    properties: SchemaRegistryUpdate,
    options?: SchemaRegistriesUpdateOptionalParams,
  ) => PollerLike<OperationState<SchemaRegistry>, SchemaRegistry>;
  /** Create a SchemaRegistry */
  createOrReplace: (
    resourceGroupName: string,
    schemaRegistryName: string,
    resource: SchemaRegistry,
    options?: SchemaRegistriesCreateOrReplaceOptionalParams,
  ) => PollerLike<OperationState<SchemaRegistry>, SchemaRegistry>;
  /** Get a SchemaRegistry */
  get: (
    resourceGroupName: string,
    schemaRegistryName: string,
    options?: SchemaRegistriesGetOptionalParams,
  ) => Promise<SchemaRegistry>;
}

function _getSchemaRegistries(context: DeviceRegistryManagementContext) {
  return {
    listBySubscription: (options?: SchemaRegistriesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SchemaRegistriesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      schemaRegistryName: string,
      options?: SchemaRegistriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, schemaRegistryName, options),
    update: (
      resourceGroupName: string,
      schemaRegistryName: string,
      properties: SchemaRegistryUpdate,
      options?: SchemaRegistriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, schemaRegistryName, properties, options),
    createOrReplace: (
      resourceGroupName: string,
      schemaRegistryName: string,
      resource: SchemaRegistry,
      options?: SchemaRegistriesCreateOrReplaceOptionalParams,
    ) => createOrReplace(context, resourceGroupName, schemaRegistryName, resource, options),
    get: (
      resourceGroupName: string,
      schemaRegistryName: string,
      options?: SchemaRegistriesGetOptionalParams,
    ) => get(context, resourceGroupName, schemaRegistryName, options),
  };
}

export function _getSchemaRegistriesOperations(
  context: DeviceRegistryManagementContext,
): SchemaRegistriesOperations {
  return {
    ..._getSchemaRegistries(context),
  };
}
