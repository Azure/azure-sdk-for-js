// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgresContext } from "../../api/postgresContext.js";
import { $delete, createOrUpdate, list } from "../../api/endpoints/operations.js";
import type {
  EndpointsDeleteOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsListOptionalParams,
} from "../../api/endpoints/options.js";
import type { Endpoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Endpoints operations. */
export interface EndpointsOperations {
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
  /** List Endpoint resources by Branch */
  list: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    branchName: string,
    options?: EndpointsListOptionalParams,
  ) => PagedAsyncIterableIterator<Endpoint>;
}

function _getEndpoints(context: PostgresContext) {
  return {
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
    list: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      branchName: string,
      options?: EndpointsListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, projectName, branchName, options),
  };
}

export function _getEndpointsOperations(context: PostgresContext): EndpointsOperations {
  return {
    ..._getEndpoints(context),
  };
}
