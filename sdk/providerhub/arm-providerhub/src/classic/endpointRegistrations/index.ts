// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext } from "../../api/providerHubContext.js";
import {
  listByResourceTypeRegistrationNestedResourceTypeThird,
  deleteNestedResourceTypeThird,
  createOrUpdateNestedResourceTypeThird,
  getNestedResourceTypeThird,
  listByResourceTypeRegistrationNestedResourceTypeSecond,
  deleteNestedResourceTypeSecond,
  createOrUpdateNestedResourceTypeSecond,
  getNestedResourceTypeSecond,
  listByResourceTypeRegistrationNestedResourceTypeFirst,
  deleteNestedResourceTypeFirst,
  createOrUpdateNestedResourceTypeFirst,
  getNestedResourceTypeFirst,
  listByResourceTypeRegistration,
  $delete,
  createOrUpdate,
  get,
} from "../../api/endpointRegistrations/operations.js";
import type {
  EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsDeleteNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsCreateOrUpdateNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsGetNestedResourceTypeThirdOptionalParams,
  EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsDeleteNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsCreateOrUpdateNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsGetNestedResourceTypeSecondOptionalParams,
  EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsDeleteNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsGetNestedResourceTypeFirstOptionalParams,
  EndpointRegistrationsListByResourceTypeRegistrationOptionalParams,
  EndpointRegistrationsDeleteOptionalParams,
  EndpointRegistrationsCreateOrUpdateOptionalParams,
  EndpointRegistrationsGetOptionalParams,
} from "../../api/endpointRegistrations/options.js";
import type { EndpointRegistration } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EndpointRegistrations operations. */
export interface EndpointRegistrationsOperations {
  /** Lists endpoint registrations for a third-level nested resource type. */
  listByResourceTypeRegistrationNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    options?: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThirdOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointRegistration>;
  /** Deletes an endpoint registration for a third-level nested resource type. */
  deleteNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    endpointName: string,
    options?: EndpointRegistrationsDeleteNestedResourceTypeThirdOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces an endpoint registration for a third-level nested resource type. */
  createOrUpdateNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    endpointName: string,
    properties: EndpointRegistration,
    options?: EndpointRegistrationsCreateOrUpdateNestedResourceTypeThirdOptionalParams,
  ) => Promise<EndpointRegistration>;
  /** Gets an endpoint registration for a third-level nested resource type. */
  getNestedResourceTypeThird: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    nestedResourceTypeThird: string,
    endpointName: string,
    options?: EndpointRegistrationsGetNestedResourceTypeThirdOptionalParams,
  ) => Promise<EndpointRegistration>;
  /** Lists endpoint registrations for a second-level nested resource type. */
  listByResourceTypeRegistrationNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    options?: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecondOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointRegistration>;
  /** Deletes an endpoint registration for a second-level nested resource type. */
  deleteNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    endpointName: string,
    options?: EndpointRegistrationsDeleteNestedResourceTypeSecondOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces an endpoint registration for a second-level nested resource type. */
  createOrUpdateNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    endpointName: string,
    properties: EndpointRegistration,
    options?: EndpointRegistrationsCreateOrUpdateNestedResourceTypeSecondOptionalParams,
  ) => Promise<EndpointRegistration>;
  /** Gets an endpoint registration for a second-level nested resource type. */
  getNestedResourceTypeSecond: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    nestedResourceTypeSecond: string,
    endpointName: string,
    options?: EndpointRegistrationsGetNestedResourceTypeSecondOptionalParams,
  ) => Promise<EndpointRegistration>;
  /** Lists endpoint registrations for a first-level nested resource type. */
  listByResourceTypeRegistrationNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    options?: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeFirstOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointRegistration>;
  /** Deletes an endpoint registration for a first-level nested resource type. */
  deleteNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    endpointName: string,
    options?: EndpointRegistrationsDeleteNestedResourceTypeFirstOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces an endpoint registration for a first-level nested resource type. */
  createOrUpdateNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    endpointName: string,
    properties: EndpointRegistration,
    options?: EndpointRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams,
  ) => Promise<EndpointRegistration>;
  /** Gets an endpoint registration for a first-level nested resource type. */
  getNestedResourceTypeFirst: (
    providerNamespace: string,
    resourceType: string,
    nestedResourceTypeFirst: string,
    endpointName: string,
    options?: EndpointRegistrationsGetNestedResourceTypeFirstOptionalParams,
  ) => Promise<EndpointRegistration>;
  /** Lists endpoint registrations for a resource type registration. */
  listByResourceTypeRegistration: (
    providerNamespace: string,
    resourceType: string,
    options?: EndpointRegistrationsListByResourceTypeRegistrationOptionalParams,
  ) => PagedAsyncIterableIterator<EndpointRegistration>;
  /** Deletes an endpoint registration. */
  delete: (
    providerNamespace: string,
    resourceType: string,
    endpointName: string,
    options?: EndpointRegistrationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or replaces an endpoint registration. */
  createOrUpdate: (
    providerNamespace: string,
    resourceType: string,
    endpointName: string,
    properties: EndpointRegistration,
    options?: EndpointRegistrationsCreateOrUpdateOptionalParams,
  ) => Promise<EndpointRegistration>;
  /** Gets an endpoint registration. */
  get: (
    providerNamespace: string,
    resourceType: string,
    endpointName: string,
    options?: EndpointRegistrationsGetOptionalParams,
  ) => Promise<EndpointRegistration>;
}

function _getEndpointRegistrations(context: ProviderHubContext) {
  return {
    listByResourceTypeRegistrationNestedResourceTypeThird: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      nestedResourceTypeThird: string,
      options?: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThirdOptionalParams,
    ) =>
      listByResourceTypeRegistrationNestedResourceTypeThird(
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
      endpointName: string,
      options?: EndpointRegistrationsDeleteNestedResourceTypeThirdOptionalParams,
    ) =>
      deleteNestedResourceTypeThird(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        endpointName,
        options,
      ),
    createOrUpdateNestedResourceTypeThird: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      nestedResourceTypeThird: string,
      endpointName: string,
      properties: EndpointRegistration,
      options?: EndpointRegistrationsCreateOrUpdateNestedResourceTypeThirdOptionalParams,
    ) =>
      createOrUpdateNestedResourceTypeThird(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        endpointName,
        properties,
        options,
      ),
    getNestedResourceTypeThird: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      nestedResourceTypeThird: string,
      endpointName: string,
      options?: EndpointRegistrationsGetNestedResourceTypeThirdOptionalParams,
    ) =>
      getNestedResourceTypeThird(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        nestedResourceTypeThird,
        endpointName,
        options,
      ),
    listByResourceTypeRegistrationNestedResourceTypeSecond: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      options?: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecondOptionalParams,
    ) =>
      listByResourceTypeRegistrationNestedResourceTypeSecond(
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
      endpointName: string,
      options?: EndpointRegistrationsDeleteNestedResourceTypeSecondOptionalParams,
    ) =>
      deleteNestedResourceTypeSecond(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        endpointName,
        options,
      ),
    createOrUpdateNestedResourceTypeSecond: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      endpointName: string,
      properties: EndpointRegistration,
      options?: EndpointRegistrationsCreateOrUpdateNestedResourceTypeSecondOptionalParams,
    ) =>
      createOrUpdateNestedResourceTypeSecond(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        endpointName,
        properties,
        options,
      ),
    getNestedResourceTypeSecond: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      nestedResourceTypeSecond: string,
      endpointName: string,
      options?: EndpointRegistrationsGetNestedResourceTypeSecondOptionalParams,
    ) =>
      getNestedResourceTypeSecond(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        nestedResourceTypeSecond,
        endpointName,
        options,
      ),
    listByResourceTypeRegistrationNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      options?: EndpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeFirstOptionalParams,
    ) =>
      listByResourceTypeRegistrationNestedResourceTypeFirst(
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
      endpointName: string,
      options?: EndpointRegistrationsDeleteNestedResourceTypeFirstOptionalParams,
    ) =>
      deleteNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        endpointName,
        options,
      ),
    createOrUpdateNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      endpointName: string,
      properties: EndpointRegistration,
      options?: EndpointRegistrationsCreateOrUpdateNestedResourceTypeFirstOptionalParams,
    ) =>
      createOrUpdateNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        endpointName,
        properties,
        options,
      ),
    getNestedResourceTypeFirst: (
      providerNamespace: string,
      resourceType: string,
      nestedResourceTypeFirst: string,
      endpointName: string,
      options?: EndpointRegistrationsGetNestedResourceTypeFirstOptionalParams,
    ) =>
      getNestedResourceTypeFirst(
        context,
        providerNamespace,
        resourceType,
        nestedResourceTypeFirst,
        endpointName,
        options,
      ),
    listByResourceTypeRegistration: (
      providerNamespace: string,
      resourceType: string,
      options?: EndpointRegistrationsListByResourceTypeRegistrationOptionalParams,
    ) => listByResourceTypeRegistration(context, providerNamespace, resourceType, options),
    delete: (
      providerNamespace: string,
      resourceType: string,
      endpointName: string,
      options?: EndpointRegistrationsDeleteOptionalParams,
    ) => $delete(context, providerNamespace, resourceType, endpointName, options),
    createOrUpdate: (
      providerNamespace: string,
      resourceType: string,
      endpointName: string,
      properties: EndpointRegistration,
      options?: EndpointRegistrationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, providerNamespace, resourceType, endpointName, properties, options),
    get: (
      providerNamespace: string,
      resourceType: string,
      endpointName: string,
      options?: EndpointRegistrationsGetOptionalParams,
    ) => get(context, providerNamespace, resourceType, endpointName, options),
  };
}

export function _getEndpointRegistrationsOperations(
  context: ProviderHubContext,
): EndpointRegistrationsOperations {
  return {
    ..._getEndpointRegistrations(context),
  };
}
