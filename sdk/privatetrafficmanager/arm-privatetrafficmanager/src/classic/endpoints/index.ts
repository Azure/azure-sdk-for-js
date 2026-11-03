// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateTrafficManagerManagementContext } from "../../api/privateTrafficManagerManagementContext.js";
import {
  listByParent,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/endpoints/operations.js";
import type {
  EndpointsListByParentOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import type { Endpoint, EndpointUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** Get Private Traffic Manager Endpoints by profile */
  listByParent: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    options?: EndpointsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<Endpoint>;
  /** Deletes a Private Traffic Manager endpoint. */
  delete: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    endpointName: string,
    options?: EndpointsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a Private Traffic Manager endpoint. */
  update: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    endpointName: string,
    properties: EndpointUpdate,
    options?: EndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Create or update a Private Traffic Manager endpoint. */
  createOrUpdate: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    endpointName: string,
    resource: Endpoint,
    options?: EndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Gets a Private Traffic Manager endpoint. */
  get: (
    resourceGroupName: string,
    privateTrafficManagerProfileName: string,
    endpointName: string,
    options?: EndpointsGetOptionalParams,
  ) => Promise<Endpoint>;
}

function _getEndpoints(context: PrivateTrafficManagerManagementContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      options?: EndpointsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, privateTrafficManagerProfileName, options),
    delete: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      endpointName: string,
      options?: EndpointsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, privateTrafficManagerProfileName, endpointName, options),
    update: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      endpointName: string,
      properties: EndpointUpdate,
      options?: EndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        endpointName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      endpointName: string,
      resource: Endpoint,
      options?: EndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        endpointName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateTrafficManagerProfileName: string,
      endpointName: string,
      options?: EndpointsGetOptionalParams,
    ) => get(context, resourceGroupName, privateTrafficManagerProfileName, endpointName, options),
  };
}

export function _getEndpointsOperations(
  context: PrivateTrafficManagerManagementContext,
): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
