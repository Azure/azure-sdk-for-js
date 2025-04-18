// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { Endpoint } from "../../models/models.js";
import {
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
} from "../../api/endpoints/options.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/endpoints/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
  /** List Endpoint resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: EndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<Endpoint>;
  /** Delete a Endpoint */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    endpointName: string,
    options?: EndpointsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update a Endpoint */
  update: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    endpointName: string,
    properties: Endpoint,
    options?: EndpointsUpdateOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Create a Endpoint */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    endpointName: string,
    resource: Endpoint,
    options?: EndpointsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Endpoint>, Endpoint>;
  /** Get a Endpoint */
  get: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    endpointName: string,
    options?: EndpointsGetOptionalParams,
  ) => Promise<Endpoint>;
}

function _getEndpoints(context: PostgresContext) {
  return {
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: EndpointsListOptionalParams,
    ) =>
      list(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      endpointName: string,
      options?: EndpointsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        endpointName,
        options,
      ),
    update: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      endpointName: string,
      properties: Endpoint,
      options?: EndpointsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        endpointName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      endpointName: string,
      resource: Endpoint,
      options?: EndpointsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        endpointName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      endpointName: string,
      options?: EndpointsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        branchName,
        endpointName,
        options,
      ),
  };
}

export function _getEndpointsOperations(
  context: PostgresContext,
): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
