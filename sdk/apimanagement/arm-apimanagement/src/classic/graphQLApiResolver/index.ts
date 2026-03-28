// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByApi,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/graphQLApiResolver/operations.js";
import type {
  GraphQLApiResolverListByApiOptionalParams,
  GraphQLApiResolverDeleteOptionalParams,
  GraphQLApiResolverUpdateOptionalParams,
  GraphQLApiResolverCreateOrUpdateOptionalParams,
  GraphQLApiResolverGetEntityTagOptionalParams,
  GraphQLApiResolverGetOptionalParams,
} from "../../api/graphQLApiResolver/options.js";
import type { ResolverContract, ResolverUpdateContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GraphQLApiResolver operations. */
export interface GraphQLApiResolverOperations {
  /** Lists a collection of the resolvers for the specified GraphQL API. */
  listByApi: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    options?: GraphQLApiResolverListByApiOptionalParams,
  ) => PagedAsyncIterableIterator<ResolverContract>;
  /** Deletes the specified resolver in the GraphQL API. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    ifMatch: string,
    options?: GraphQLApiResolverDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the resolver in the GraphQL API specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    ifMatch: string,
    parameters: ResolverUpdateContract,
    options?: GraphQLApiResolverUpdateOptionalParams,
  ) => Promise<ResolverContract>;
  /** Creates a new resolver in the GraphQL API or updates an existing one. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    parameters: ResolverContract,
    options?: GraphQLApiResolverCreateOrUpdateOptionalParams,
  ) => Promise<ResolverContract>;
  /** Gets the entity state (Etag) version of the GraphQL API resolver specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    options?: GraphQLApiResolverGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the GraphQL API Resolver specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    options?: GraphQLApiResolverGetOptionalParams,
  ) => Promise<ResolverContract>;
}

function _getGraphQLApiResolver(context: ApiManagementContext) {
  return {
    listByApi: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      options?: GraphQLApiResolverListByApiOptionalParams,
    ) => listByApi(context, resourceGroupName, serviceName, apiId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      ifMatch: string,
      options?: GraphQLApiResolverDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, apiId, resolverId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      ifMatch: string,
      parameters: ResolverUpdateContract,
      options?: GraphQLApiResolverUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        resolverId,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      parameters: ResolverContract,
      options?: GraphQLApiResolverCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        resolverId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      options?: GraphQLApiResolverGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, apiId, resolverId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      options?: GraphQLApiResolverGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, resolverId, options),
  };
}

export function _getGraphQLApiResolverOperations(
  context: ApiManagementContext,
): GraphQLApiResolverOperations {
  return {
    ..._getGraphQLApiResolver(context),
  };
}
