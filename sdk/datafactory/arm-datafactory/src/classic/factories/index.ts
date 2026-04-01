// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  configureFactoryRepo,
  getDataPlaneAccess,
  getGitHubAccessToken,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/factories/operations.js";
import type {
  FactoriesConfigureFactoryRepoOptionalParams,
  FactoriesGetDataPlaneAccessOptionalParams,
  FactoriesGetGitHubAccessTokenOptionalParams,
  FactoriesListOptionalParams,
  FactoriesListByResourceGroupOptionalParams,
  FactoriesDeleteOptionalParams,
  FactoriesUpdateOptionalParams,
  FactoriesCreateOrUpdateOptionalParams,
  FactoriesGetOptionalParams,
} from "../../api/factories/options.js";
import type {
  Factory,
  FactoryUpdateParameters,
  GitHubAccessTokenRequest,
  GitHubAccessTokenResponse,
  UserAccessPolicy,
  AccessPolicyResponse,
  FactoryRepoUpdate,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Factories operations. */
export interface FactoriesOperations {
  /** Updates a factory's repo information. */
  configureFactoryRepo: (
    locationId: string,
    factoryRepoUpdate: FactoryRepoUpdate,
    options?: FactoriesConfigureFactoryRepoOptionalParams,
  ) => Promise<Factory>;
  /** Get Data Plane access. */
  getDataPlaneAccess: (
    resourceGroupName: string,
    factoryName: string,
    policy: UserAccessPolicy,
    options?: FactoriesGetDataPlaneAccessOptionalParams,
  ) => Promise<AccessPolicyResponse>;
  /** Get GitHub Access Token. */
  getGitHubAccessToken: (
    resourceGroupName: string,
    factoryName: string,
    gitHubAccessTokenRequest: GitHubAccessTokenRequest,
    options?: FactoriesGetGitHubAccessTokenOptionalParams,
  ) => Promise<GitHubAccessTokenResponse>;
  /** Lists factories under the specified subscription. */
  list: (options?: FactoriesListOptionalParams) => PagedAsyncIterableIterator<Factory>;
  /** Lists factories. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: FactoriesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Factory>;
  /** Deletes a factory. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    options?: FactoriesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a factory. */
  update: (
    resourceGroupName: string,
    factoryName: string,
    factoryUpdateParameters: FactoryUpdateParameters,
    options?: FactoriesUpdateOptionalParams,
  ) => Promise<Factory>;
  /** Creates or updates a factory. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    factory: Factory,
    options?: FactoriesCreateOrUpdateOptionalParams,
  ) => Promise<Factory>;
  /** Gets a factory. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    options?: FactoriesGetOptionalParams,
  ) => Promise<Factory>;
}

function _getFactories(context: DataFactoryManagementContext) {
  return {
    configureFactoryRepo: (
      locationId: string,
      factoryRepoUpdate: FactoryRepoUpdate,
      options?: FactoriesConfigureFactoryRepoOptionalParams,
    ) => configureFactoryRepo(context, locationId, factoryRepoUpdate, options),
    getDataPlaneAccess: (
      resourceGroupName: string,
      factoryName: string,
      policy: UserAccessPolicy,
      options?: FactoriesGetDataPlaneAccessOptionalParams,
    ) => getDataPlaneAccess(context, resourceGroupName, factoryName, policy, options),
    getGitHubAccessToken: (
      resourceGroupName: string,
      factoryName: string,
      gitHubAccessTokenRequest: GitHubAccessTokenRequest,
      options?: FactoriesGetGitHubAccessTokenOptionalParams,
    ) =>
      getGitHubAccessToken(
        context,
        resourceGroupName,
        factoryName,
        gitHubAccessTokenRequest,
        options,
      ),
    list: (options?: FactoriesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: FactoriesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      options?: FactoriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, options),
    update: (
      resourceGroupName: string,
      factoryName: string,
      factoryUpdateParameters: FactoryUpdateParameters,
      options?: FactoriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, factoryName, factoryUpdateParameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      factory: Factory,
      options?: FactoriesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, factoryName, factory, options),
    get: (resourceGroupName: string, factoryName: string, options?: FactoriesGetOptionalParams) =>
      get(context, resourceGroupName, factoryName, options),
  };
}

export function _getFactoriesOperations(
  context: DataFactoryManagementContext,
): FactoriesOperations {
  return {
    ..._getFactories(context),
  };
}
