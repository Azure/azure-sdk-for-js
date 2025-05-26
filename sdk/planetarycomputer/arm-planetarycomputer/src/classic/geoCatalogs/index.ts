// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SpatioContext } from "../../api/spatioContext.js";
import { GeoCatalog, GeoCatalogUpdate } from "../../models/models.js";
import {
  GeoCatalogsListBySubscriptionOptionalParams,
  GeoCatalogsListByResourceGroupOptionalParams,
  GeoCatalogsDeleteOptionalParams,
  GeoCatalogsUpdateOptionalParams,
  GeoCatalogsCreateOptionalParams,
  GeoCatalogsGetOptionalParams,
} from "../../api/geoCatalogs/options.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/geoCatalogs/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a GeoCatalogs operations. */
export interface GeoCatalogsOperations {
  /** List GeoCatalog resources by subscription ID */
  listBySubscription: (
    options?: GeoCatalogsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<GeoCatalog>;
  /** List GeoCatalog resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: GeoCatalogsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<GeoCatalog>;
  /** Delete a GeoCatalog */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    catalogName: string,
    options?: GeoCatalogsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a GeoCatalog */
  update: (
    resourceGroupName: string,
    catalogName: string,
    properties: GeoCatalogUpdate,
    options?: GeoCatalogsUpdateOptionalParams,
  ) => PollerLike<OperationState<GeoCatalog>, GeoCatalog>;
  /** Create a GeoCatalog */
  create: (
    resourceGroupName: string,
    catalogName: string,
    resource: GeoCatalog,
    options?: GeoCatalogsCreateOptionalParams,
  ) => PollerLike<OperationState<GeoCatalog>, GeoCatalog>;
  /** Get a GeoCatalog */
  get: (
    resourceGroupName: string,
    catalogName: string,
    options?: GeoCatalogsGetOptionalParams,
  ) => Promise<GeoCatalog>;
}

function _getGeoCatalogs(context: SpatioContext) {
  return {
    listBySubscription: (options?: GeoCatalogsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: GeoCatalogsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      catalogName: string,
      options?: GeoCatalogsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, catalogName, options),
    update: (
      resourceGroupName: string,
      catalogName: string,
      properties: GeoCatalogUpdate,
      options?: GeoCatalogsUpdateOptionalParams,
    ) => update(context, resourceGroupName, catalogName, properties, options),
    create: (
      resourceGroupName: string,
      catalogName: string,
      resource: GeoCatalog,
      options?: GeoCatalogsCreateOptionalParams,
    ) => create(context, resourceGroupName, catalogName, resource, options),
    get: (resourceGroupName: string, catalogName: string, options?: GeoCatalogsGetOptionalParams) =>
      get(context, resourceGroupName, catalogName, options),
  };
}

export function _getGeoCatalogsOperations(context: SpatioContext): GeoCatalogsOperations {
  return {
    ..._getGeoCatalogs(context),
  };
}
