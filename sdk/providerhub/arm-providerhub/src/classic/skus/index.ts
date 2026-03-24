// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  listByResourceTypeRegistrationsNestedResourceTypeThird,
  deleteNestedResourceTypeThird,
  createOrUpdateNestedResourceTypeThird,
  getNestedResourceTypeThird,
  listByResourceTypeRegistrationsNestedResourceTypeSecond,
  deleteNestedResourceTypeSecond,
  createOrUpdateNestedResourceTypeSecond,
  getNestedResourceTypeSecond,
  listByResourceTypeRegistrations,
  $delete,
  createOrUpdate,
  get,
  listByResourceTypeRegistrationsNestedResourceTypeFirst,
  deleteNestedResourceTypeFirst,
  createOrUpdateNestedResourceTypeFirst,
  getNestedResourceTypeFirst,
} from "../../api/skus/operations.js";
import type {
  SkusListByResourceTypeRegistrationsNestedResourceTypeThirdOptionalParams,
  SkusDeleteNestedResourceTypeThirdOptionalParams,
  SkusCreateOrUpdateNestedResourceTypeThirdOptionalParams,
  SkusGetNestedResourceTypeThirdOptionalParams,
  SkusListByResourceTypeRegistrationsNestedResourceTypeSecondOptionalParams,
  SkusDeleteNestedResourceTypeSecondOptionalParams,
  SkusCreateOrUpdateNestedResourceTypeSecondOptionalParams,
  SkusGetNestedResourceTypeSecondOptionalParams,
  SkusListByResourceTypeRegistrationsOptionalParams,
  SkusDeleteOptionalParams,
  SkusCreateOrUpdateOptionalParams,
  SkusGetOptionalParams,
  SkusListByResourceTypeRegistrationsNestedResourceTypeFirstOptionalParams,
  SkusDeleteNestedResourceTypeFirstOptionalParams,
  SkusCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  SkusGetNestedResourceTypeFirstOptionalParams,
} from "../../api/skus/options.js";
import type { SkuResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Skus operations. */
export interface SkusOperations {
  /** Gets the list of skus for the given resource type. */
  listByResourceTypeRegistrationsNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    options?: SkusListByResourceTypeRegistrationsNestedResourceTypeThirdOptionalParams,
  ) => PagedAsyncIterableIterator<SkuResource>;
  /** Deletes a resource type sku. */
  deleteNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    sku: string,
    options?: SkusDeleteNestedResourceTypeThirdOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the resource type skus in the given resource type. */
  createOrUpdateNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    sku: string,
    properties: SkuResource,
    options?: SkusCreateOrUpdateNestedResourceTypeThirdOptionalParams,
  ) => Promise<SkuResource>;
  /** Gets the sku details for the given resource type and sku name. */
  getNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    sku: string,
    options?: SkusGetNestedResourceTypeThirdOptionalParams,
  ) => Promise<SkuResource>;
  /** Gets the list of skus for the given resource type. */
  listByResourceTypeRegistrationsNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    options?: SkusListByResourceTypeRegistrationsNestedResourceTypeSecondOptionalParams,
  ) => PagedAsyncIterableIterator<SkuResource>;
  /** Deletes a resource type sku. */
  deleteNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    sku: string,
    options?: SkusDeleteNestedResourceTypeSecondOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the resource type skus in the given resource type. */
  createOrUpdateNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    sku: string,
    properties: SkuResource,
    options?: SkusCreateOrUpdateNestedResourceTypeSecondOptionalParams,
  ) => Promise<SkuResource>;
  /** Gets the sku details for the given resource type and sku name. */
  getNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    sku: string,
    options?: SkusGetNestedResourceTypeSecondOptionalParams,
  ) => Promise<SkuResource>;
  /** Gets the list of skus for the given resource type. */
  listByResourceTypeRegistrations: (
    providerNamespace: string,
    resourceType: string,
    options?: SkusListByResourceTypeRegistrationsOptionalParams,
  ) => PagedAsyncIterableIterator<SkuResource>;
  /** Deletes a resource type sku. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    providerNamespace: string,
    resourceType: string,
    sku: string,
    options?: SkusDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the resource type skus in the given resource type. */
  createOrUpdate: (
    providerNamespace: string,
    resourceType: string,
    sku: string,
    properties: SkuResource,
    options?: SkusCreateOrUpdateOptionalParams,
  ) => Promise<SkuResource>;
  /** Gets the sku details for the given resource type and sku name. */
  get: (
    providerNamespace: string,
    resourceType: string,
    sku: string,
    options?: SkusGetOptionalParams,
  ) => Promise<SkuResource>;
  /** Gets the list of skus for the given resource type. */
  listByResourceTypeRegistrationsNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    options?: SkusListByResourceTypeRegistrationsNestedResourceTypeFirstOptionalParams,
  ) => PagedAsyncIterableIterator<SkuResource>;
  /** Deletes a resource type sku. */
  deleteNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    sku: string,
    options?: SkusDeleteNestedResourceTypeFirstOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the resource type skus in the given resource type. */
  createOrUpdateNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    sku: string,
    properties: SkuResource,
    options?: SkusCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  ) => Promise<SkuResource>;
  /** Gets the sku details for the given resource type and sku name. */
  getNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    sku: string,
    options?: SkusGetNestedResourceTypeFirstOptionalParams,
  ) => Promise<SkuResource>;
}

function _getSkus(context: ProviderHubContext) {
  return {
    listByResourceTypeRegistrationsNestedResourceTypeThird: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      nestedResourceTypeThird: string,
      options?: SkusListByResourceTypeRegistrationsNestedResourceTypeThirdOptionalParams,
    ) =>
      listByResourceTypeRegistrationsNestedResourceTypeThird(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        options,
      ),
    deleteNestedResourceTypeThird: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      nestedResourceTypeThird: string,
      sku: string,
      options?: SkusDeleteNestedResourceTypeThirdOptionalParams,
    ) =>
      deleteNestedResourceTypeThird(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        sku,
        options,
      ),
    createOrUpdateNestedResourceTypeThird: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      nestedResourceTypeThird: string,
      sku: string,
      properties: SkuResource,
      options?: SkusCreateOrUpdateNestedResourceTypeThirdOptionalParams,
    ) =>
      createOrUpdateNestedResourceTypeThird(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        sku,
        properties,
        options,
      ),
    getNestedResourceTypeThird: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      nestedResourceTypeThird: string,
      sku: string,
      options?: SkusGetNestedResourceTypeThirdOptionalParams,
    ) =>
      getNestedResourceTypeThird(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        sku,
        options,
      ),
    listByResourceTypeRegistrationsNestedResourceTypeSecond: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      options?: SkusListByResourceTypeRegistrationsNestedResourceTypeSecondOptionalParams,
    ) =>
      listByResourceTypeRegistrationsNestedResourceTypeSecond(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        options,
      ),
    deleteNestedResourceTypeSecond: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      sku: string,
      options?: SkusDeleteNestedResourceTypeSecondOptionalParams,
    ) =>
      deleteNestedResourceTypeSecond(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        sku,
        options,
      ),
    createOrUpdateNestedResourceTypeSecond: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      sku: string,
      properties: SkuResource,
      options?: SkusCreateOrUpdateNestedResourceTypeSecondOptionalParams,
    ) =>
      createOrUpdateNestedResourceTypeSecond(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        sku,
        properties,
        options,
      ),
    getNestedResourceTypeSecond: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      sku: string,
      options?: SkusGetNestedResourceTypeSecondOptionalParams,
    ) =>
      getNestedResourceTypeSecond(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        sku,
        options,
      ),
    listByResourceTypeRegistrations: (
      providerNamespace: string,
      resourceType: string,
      options?: SkusListByResourceTypeRegistrationsOptionalParams,
    ) => listByResourceTypeRegistrations(context, providerNamespace, resourceType, options),
    delete: (
      providerNamespace: string,
      resourceType: string,
      sku: string,
      options?: SkusDeleteOptionalParams,
    ) => $delete(context, providerNamespace, resourceType, sku, options),
    createOrUpdate: (
      providerNamespace: string,
      resourceType: string,
      sku: string,
      properties: SkuResource,
      options?: SkusCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, resourceType, sku, properties, options),
    get: (
      providerNamespace: string,
      resourceType: string,
      sku: string,
      options?: SkusGetOptionalParams,
    ) => get(context, providerNamespace, resourceType, sku, options),
    listByResourceTypeRegistrationsNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      options?: SkusListByResourceTypeRegistrationsNestedResourceTypeFirstOptionalParams,
    ) =>
      listByResourceTypeRegistrationsNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        options,
      ),
    deleteNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      sku: string,
      options?: SkusDeleteNestedResourceTypeFirstOptionalParams,
    ) =>
      deleteNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        sku,
        options,
      ),
    createOrUpdateNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      sku: string,
      properties: SkuResource,
      options?: SkusCreateOrUpdateNestedResourceTypeFirstOptionalParams,
    ) =>
      createOrUpdateNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        sku,
        properties,
        options,
      ),
    getNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      sku: string,
      options?: SkusGetNestedResourceTypeFirstOptionalParams,
    ) =>
      getNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        sku,
        options,
      ),
  };
}

export function _getSkusOperations(context: ProviderHubContext): SkusOperations {
  return {
    ..._getSkus(context),
  };
}
