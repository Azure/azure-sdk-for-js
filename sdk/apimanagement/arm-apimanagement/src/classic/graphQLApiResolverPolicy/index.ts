// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByResolver,
  $delete,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/graphQLApiResolverPolicy/operations.js";
import type {
  GraphQLApiResolverPolicyListByResolverOptionalParams,
  GraphQLApiResolverPolicyDeleteOptionalParams,
  GraphQLApiResolverPolicyCreateOrUpdateOptionalParams,
  GraphQLApiResolverPolicyGetEntityTagOptionalParams,
  GraphQLApiResolverPolicyGetOptionalParams,
} from "../../api/graphQLApiResolverPolicy/options.js";
import type { PolicyContract, PolicyIdName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GraphQLApiResolverPolicy operations. */
export interface GraphQLApiResolverPolicyOperations {
  /** Get the list of policy configuration at the GraphQL API Resolver level. */
  listByResolver: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    options?: GraphQLApiResolverPolicyListByResolverOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyContract>;
  /** Deletes the policy configuration at the GraphQL Api Resolver. */
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
    policyId: PolicyIdName,
    ifMatch: string,
    options?: GraphQLApiResolverPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates policy configuration for the GraphQL API Resolver level. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: GraphQLApiResolverPolicyCreateOrUpdateOptionalParams,
  ) => Promise<PolicyContract>;
  /** Gets the entity state (Etag) version of the GraphQL API resolver policy specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    policyId: PolicyIdName,
    options?: GraphQLApiResolverPolicyGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Get the policy configuration at the GraphQL API Resolver level. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    policyId: PolicyIdName,
    options?: GraphQLApiResolverPolicyGetOptionalParams,
  ) => Promise<PolicyContract>;
}

function _getGraphQLApiResolverPolicy(context: ApiManagementContext) {
  return {
    listByResolver: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      options?: GraphQLApiResolverPolicyListByResolverOptionalParams,
    ) => listByResolver(context, resourceGroupName, serviceName, apiId, resolverId, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      policyId: PolicyIdName,
      ifMatch: string,
      options?: GraphQLApiResolverPolicyDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        resolverId,
        policyId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      policyId: PolicyIdName,
      parameters: PolicyContract,
      options?: GraphQLApiResolverPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        apiId,
        resolverId,
        policyId,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      policyId: PolicyIdName,
      options?: GraphQLApiResolverPolicyGetEntityTagOptionalParams,
    ) =>
      getEntityTag(context, resourceGroupName, serviceName, apiId, resolverId, policyId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      apiId: string,
      resolverId: string,
      policyId: PolicyIdName,
      options?: GraphQLApiResolverPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, apiId, resolverId, policyId, options),
  };
}

export function _getGraphQLApiResolverPolicyOperations(
  context: ApiManagementContext,
): GraphQLApiResolverPolicyOperations {
  return {
    ..._getGraphQLApiResolverPolicy(context),
  };
}
