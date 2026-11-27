// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  deleteNestedResourceTypeFirst,
  createOrUpdateNestedResourceTypeFirst,
  getNestedResourceTypeFirst,
  listByProviderRegistration,
  $delete,
  createOrUpdate,
  get,
} from "../../api/resourceTypeRegistrations/operations.js";
import type {
  ResourceTypeRegistrationsDeleteNestedResourceTypeFirstOptionalParams,
  ResourceTypeRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  ResourceTypeRegistrationsGetNestedResourceTypeFirstOptionalParams,
  ResourceTypeRegistrationsListByProviderRegistrationOptionalParams,
  ResourceTypeRegistrationsDeleteOptionalParams,
  ResourceTypeRegistrationsCreateOrUpdateOptionalParams,
  ResourceTypeRegistrationsGetOptionalParams,
} from "../../api/resourceTypeRegistrations/options.js";
import type { ResourceTypeRegistration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ResourceTypeRegistrations operations. */
export interface ResourceTypeRegistrationsOperations {
  /** Deletes a nested resource type. */
  deleteNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    options?: ResourceTypeRegistrationsDeleteNestedResourceTypeFirstOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a nested resource type. */
  createOrUpdateNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    properties: ResourceTypeRegistration,
    options?: ResourceTypeRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  ) => PollerLike<OperationState<ResourceTypeRegistration>, ResourceTypeRegistration>;
  /** Gets a nested resource type details in the given subscription and provider. */
  getNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    options?: ResourceTypeRegistrationsGetNestedResourceTypeFirstOptionalParams,
  ) => Promise<ResourceTypeRegistration>;
  /** Gets the list of the resource types for the given provider. */
  listByProviderRegistration: (
    providerNamespace: string,
    options?: ResourceTypeRegistrationsListByProviderRegistrationOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceTypeRegistration>;
  /** Deletes a resource type */
  delete: (
    providerNamespace: string,
    resourceType: string,
    options?: ResourceTypeRegistrationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates a resource type. */
  createOrUpdate: (
    providerNamespace: string,
    resourceType: string,
    properties: ResourceTypeRegistration,
    options?: ResourceTypeRegistrationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ResourceTypeRegistration>, ResourceTypeRegistration>;
  /** Gets a resource type details in the given subscription and provider. */
  get: (
    providerNamespace: string,
    resourceType: string,
    options?: ResourceTypeRegistrationsGetOptionalParams,
  ) => Promise<ResourceTypeRegistration>;
}

function _getResourceTypeRegistrations(context: ProviderHubContext) {
  return {
    deleteNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      options?: ResourceTypeRegistrationsDeleteNestedResourceTypeFirstOptionalParams,
    ) =>
      deleteNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        options,
      ),
    createOrUpdateNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      properties: ResourceTypeRegistration,
      options?: ResourceTypeRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams,
    ) =>
      createOrUpdateNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        properties,
        options,
      ),
    getNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      options?: ResourceTypeRegistrationsGetNestedResourceTypeFirstOptionalParams,
    ) =>
      getNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        options,
      ),
    listByProviderRegistration: (
      providerNamespace: string,
      options?: ResourceTypeRegistrationsListByProviderRegistrationOptionalParams,
    ) => listByProviderRegistration(context, providerNamespace, options),
    delete: (
      providerNamespace: string,
      resourceType: string,
      options?: ResourceTypeRegistrationsDeleteOptionalParams,
    ) => $delete(context, providerNamespace, resourceType, options),
    createOrUpdate: (
      providerNamespace: string,
      resourceType: string,
      properties: ResourceTypeRegistration,
      options?: ResourceTypeRegistrationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, providerNamespace, resourceType, properties, options),
    get: (
      providerNamespace: string,
      resourceType: string,
      options?: ResourceTypeRegistrationsGetOptionalParams,
    ) => get(context, providerNamespace, resourceType, options),
  };
}

export function _getResourceTypeRegistrationsOperations(
  context: ProviderHubContext,
): ResourceTypeRegistrationsOperations {
  return {
    ..._getResourceTypeRegistrations(context),
  };
}
