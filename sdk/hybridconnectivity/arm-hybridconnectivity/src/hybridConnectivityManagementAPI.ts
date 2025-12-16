// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HybridConnectivityManagementAPIContext,
  HybridConnectivityManagementAPIOptionalParams,
} from "./api/index.js";
import { createHybridConnectivityManagementAPI } from "./api/index.js";
import type { EndpointsOperations } from "./classic/endpoints/index.js";
import { _getEndpointsOperations } from "./classic/endpoints/index.js";
import type { GenerateAwsTemplateOperations } from "./classic/generateAwsTemplate/index.js";
import { _getGenerateAwsTemplateOperations } from "./classic/generateAwsTemplate/index.js";
import type { InventoryOperations } from "./classic/inventory/index.js";
import { _getInventoryOperations } from "./classic/inventory/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PublicCloudConnectorsOperations } from "./classic/publicCloudConnectors/index.js";
import { _getPublicCloudConnectorsOperations } from "./classic/publicCloudConnectors/index.js";
import type { ServiceConfigurationsOperations } from "./classic/serviceConfigurations/index.js";
import { _getServiceConfigurationsOperations } from "./classic/serviceConfigurations/index.js";
import type { SolutionConfigurationsOperations } from "./classic/solutionConfigurations/index.js";
import { _getSolutionConfigurationsOperations } from "./classic/solutionConfigurations/index.js";
import type { SolutionTypesOperations } from "./classic/solutionTypes/index.js";
import { _getSolutionTypesOperations } from "./classic/solutionTypes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { HybridConnectivityManagementAPIOptionalParams } from "./api/hybridConnectivityManagementAPIContext.js";

export class HybridConnectivityManagementAPI {
  private _client: HybridConnectivityManagementAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: HybridConnectivityManagementAPIOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: HybridConnectivityManagementAPIOptionalParams,
  );
  /** REST API for public clouds. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | HybridConnectivityManagementAPIOptionalParams,
    options?: HybridConnectivityManagementAPIOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createHybridConnectivityManagementAPI(credential, subscriptionId ?? "", {
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
