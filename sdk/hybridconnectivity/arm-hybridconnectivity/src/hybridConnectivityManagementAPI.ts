// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createHybridConnectivityManagementAPI,
  HybridConnectivityManagementAPIContext,
  HybridConnectivityManagementAPIOptionalParams,
} from "./api/index.js";
import {
  SolutionTypesOperations,
  _getSolutionTypesOperations,
} from "./classic/solutionTypes/index.js";
import { InventoryOperations, _getInventoryOperations } from "./classic/inventory/index.js";
import {
  SolutionConfigurationsOperations,
  _getSolutionConfigurationsOperations,
} from "./classic/solutionConfigurations/index.js";
import {
  PublicCloudConnectorsOperations,
  _getPublicCloudConnectorsOperations,
} from "./classic/publicCloudConnectors/index.js";
import {
  GenerateAwsTemplateOperations,
  _getGenerateAwsTemplateOperations,
} from "./classic/generateAwsTemplate/index.js";
import {
  ServiceConfigurationsOperations,
  _getServiceConfigurationsOperations,
} from "./classic/serviceConfigurations/index.js";
import { EndpointsOperations, _getEndpointsOperations } from "./classic/endpoints/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { HybridConnectivityManagementAPIOptionalParams } from "./api/hybridConnectivityManagementAPIContext.js";

export class HybridConnectivityManagementAPI {
  private _client: HybridConnectivityManagementAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** REST API for public clouds. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: HybridConnectivityManagementAPIOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createHybridConnectivityManagementAPI(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.solutionTypes = _getSolutionTypesOperations(this._client);
    this.inventory = _getInventoryOperations(this._client);
    this.solutionConfigurations = _getSolutionConfigurationsOperations(this._client);
    this.publicCloudConnectors = _getPublicCloudConnectorsOperations(this._client);
    this.generateAwsTemplate = _getGenerateAwsTemplateOperations(this._client);
    this.serviceConfigurations = _getServiceConfigurationsOperations(this._client);
    this.endpoints = _getEndpointsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for solutionTypes */
  public readonly solutionTypes: SolutionTypesOperations;
  /** The operation groups for inventory */
  public readonly inventory: InventoryOperations;
  /** The operation groups for solutionConfigurations */
  public readonly solutionConfigurations: SolutionConfigurationsOperations;
  /** The operation groups for publicCloudConnectors */
  public readonly publicCloudConnectors: PublicCloudConnectorsOperations;
  /** The operation groups for generateAwsTemplate */
  public readonly generateAwsTemplate: GenerateAwsTemplateOperations;
  /** The operation groups for serviceConfigurations */
  public readonly serviceConfigurations: ServiceConfigurationsOperations;
  /** The operation groups for endpoints */
  public readonly endpoints: EndpointsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
