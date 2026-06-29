// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiCenterContext, ApiCenterClientOptionalParams } from "./api/index.js";
import { createApiCenter } from "./api/index.js";
import type { ApiDefinitionsOperations } from "./classic/apiDefinitions/index.js";
import { _getApiDefinitionsOperations } from "./classic/apiDefinitions/index.js";
import type { ApiSourcesOperations } from "./classic/apiSources/index.js";
import { _getApiSourcesOperations } from "./classic/apiSources/index.js";
import type { ApiVersionsOperations } from "./classic/apiVersions/index.js";
import { _getApiVersionsOperations } from "./classic/apiVersions/index.js";
import type { ApisOperations } from "./classic/apis/index.js";
import { _getApisOperations } from "./classic/apis/index.js";
import type { DeletedServicesOperations } from "./classic/deletedServices/index.js";
import { _getDeletedServicesOperations } from "./classic/deletedServices/index.js";
import type { DeploymentsOperations } from "./classic/deployments/index.js";
import { _getDeploymentsOperations } from "./classic/deployments/index.js";
import type { EnvironmentsOperations } from "./classic/environments/index.js";
import { _getEnvironmentsOperations } from "./classic/environments/index.js";
import type { MetadataSchemasOperations } from "./classic/metadataSchemas/index.js";
import { _getMetadataSchemasOperations } from "./classic/metadataSchemas/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ServicesOperations } from "./classic/services/index.js";
import { _getServicesOperations } from "./classic/services/index.js";
import type { WorkspacesOperations } from "./classic/workspaces/index.js";
import { _getWorkspacesOperations } from "./classic/workspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { ApiCenterClientOptionalParams } from "./api/apiCenterContext.js";

export class ApiCenterClient {
  private _client: ApiCenterContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure API Center Resource Provider. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ApiCenterClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createApiCenter(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.environments = _getEnvironmentsOperations(this._client);
    this.deployments = _getDeploymentsOperations(this._client);
    this.apiSources = _getApiSourcesOperations(this._client);
    this.apiDefinitions = _getApiDefinitionsOperations(this._client);
    this.apiVersions = _getApiVersionsOperations(this._client);
    this.apis = _getApisOperations(this._client);
    this.workspaces = _getWorkspacesOperations(this._client);
    this.metadataSchemas = _getMetadataSchemasOperations(this._client);
    this.deletedServices = _getDeletedServicesOperations(this._client);
    this.services = _getServicesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for environments */
  public readonly environments: EnvironmentsOperations;
  /** The operation groups for deployments */
  public readonly deployments: DeploymentsOperations;
  /** The operation groups for apiSources */
  public readonly apiSources: ApiSourcesOperations;
  /** The operation groups for apiDefinitions */
  public readonly apiDefinitions: ApiDefinitionsOperations;
  /** The operation groups for apiVersions */
  public readonly apiVersions: ApiVersionsOperations;
  /** The operation groups for apis */
  public readonly apis: ApisOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for metadataSchemas */
  public readonly metadataSchemas: MetadataSchemasOperations;
  /** The operation groups for deletedServices */
  public readonly deletedServices: DeletedServicesOperations;
  /** The operation groups for services */
  public readonly services: ServicesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
