// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeploymentEnvironmentsContext,
  DeploymentEnvironmentsClientOptionalParams,
  createDeploymentEnvironments,
} from "./api/index.js";
import { Environment, Catalog, EnvironmentDefinition, EnvironmentType } from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  listEnvironmentTypes,
  getEnvironmentDefinition,
  listEnvironmentDefinitionsByCatalog,
  listEnvironmentDefinitions,
  getCatalog,
  listCatalogs,
  deleteEnvironment,
  createOrUpdateEnvironment,
  getEnvironment,
  listEnvironments,
  listAllEnvironments,
} from "./api/operations.js";
import {
  ListEnvironmentTypesOptionalParams,
  GetEnvironmentDefinitionOptionalParams,
  ListEnvironmentDefinitionsByCatalogOptionalParams,
  ListEnvironmentDefinitionsOptionalParams,
  GetCatalogOptionalParams,
  ListCatalogsOptionalParams,
  DeleteEnvironmentOptionalParams,
  CreateOrUpdateEnvironmentOptionalParams,
  GetEnvironmentOptionalParams,
  ListEnvironmentsOptionalParams,
  ListAllEnvironmentsOptionalParams,
} from "./api/options.js";
import { TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DeploymentEnvironmentsClientOptionalParams } from "./api/deploymentEnvironmentsContext.js";

export class DeploymentEnvironmentsClient {
  private _client: DeploymentEnvironmentsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: DeploymentEnvironmentsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDeploymentEnvironments(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Lists all environment types configured for a project. */
  listEnvironmentTypes(
    projectName: string,
    options: ListEnvironmentTypesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<EnvironmentType> {
    return listEnvironmentTypes(this._client, projectName, options);
  }

  /** Get an environment definition from a catalog. */
  getEnvironmentDefinition(
    projectName: string,
    catalogName: string,
    definitionName: string,
    options: GetEnvironmentDefinitionOptionalParams = { requestOptions: {} },
  ): Promise<EnvironmentDefinition> {
    return getEnvironmentDefinition(
      this._client,
      projectName,
      catalogName,
      definitionName,
      options,
    );
  }

  /** Lists all environment definitions available within a catalog. */
  listEnvironmentDefinitionsByCatalog(
    projectName: string,
    catalogName: string,
    options: ListEnvironmentDefinitionsByCatalogOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<EnvironmentDefinition> {
    return listEnvironmentDefinitionsByCatalog(this._client, projectName, catalogName, options);
  }

  /** Lists all environment definitions available for a project. */
  listEnvironmentDefinitions(
    projectName: string,
    options: ListEnvironmentDefinitionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<EnvironmentDefinition> {
    return listEnvironmentDefinitions(this._client, projectName, options);
  }

  /** Gets the specified catalog within the project. */
  getCatalog(
    projectName: string,
    catalogName: string,
    options: GetCatalogOptionalParams = { requestOptions: {} },
  ): Promise<Catalog> {
    return getCatalog(this._client, projectName, catalogName, options);
  }

  /** Lists all of the catalogs available for a project. */
  listCatalogs(
    projectName: string,
    options: ListCatalogsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Catalog> {
    return listCatalogs(this._client, projectName, options);
  }

  /** Deletes an environment and all its associated resources */
  deleteEnvironment(
    projectName: string,
    userId: string,
    environmentName: string,
    options: DeleteEnvironmentOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<void>, void> {
    return deleteEnvironment(this._client, projectName, userId, environmentName, options);
  }

  /** Creates or updates an environment. */
  createOrUpdateEnvironment(
    projectName: string,
    userId: string,
    environmentName: string,
    body: Environment,
    options: CreateOrUpdateEnvironmentOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<Environment>, Environment> {
    return createOrUpdateEnvironment(
      this._client,
      projectName,
      userId,
      environmentName,
      body,
      options,
    );
  }

  /** Gets an environment. */
  getEnvironment(
    projectName: string,
    userId: string,
    environmentName: string,
    options: GetEnvironmentOptionalParams = { requestOptions: {} },
  ): Promise<Environment> {
    return getEnvironment(this._client, projectName, userId, environmentName, options);
  }

  /** Lists the environments for a project and user. */
  listEnvironments(
    projectName: string,
    userId: string,
    options: ListEnvironmentsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Environment> {
    return listEnvironments(this._client, projectName, userId, options);
  }

  /** Lists the environments for a project. */
  listAllEnvironments(
    projectName: string,
    options: ListAllEnvironmentsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<Environment> {
    return listAllEnvironments(this._client, projectName, options);
  }
}
