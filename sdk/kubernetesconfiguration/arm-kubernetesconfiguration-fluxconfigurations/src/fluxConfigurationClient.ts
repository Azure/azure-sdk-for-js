// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  FluxConfigurationContext,
  FluxConfigurationClientOptionalParams,
  createFluxConfiguration,
} from "./api/index.js";
import {
  FluxConfigOperationStatusOperations,
  _getFluxConfigOperationStatusOperations,
} from "./classic/fluxConfigOperationStatus/index.js";
import {
  FluxConfigurationsOperations,
  _getFluxConfigurationsOperations,
} from "./classic/fluxConfigurations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { FluxConfigurationClientOptionalParams } from "./api/fluxConfigurationContext.js";

export class FluxConfigurationClient {
  private _client: FluxConfigurationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Use these APIs to create Flux Configuration resources through ARM, for Kubernetes Clusters. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: FluxConfigurationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createFluxConfiguration(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.fluxConfigOperationStatus = _getFluxConfigOperationStatusOperations(this._client);
    this.fluxConfigurations = _getFluxConfigurationsOperations(this._client);
  }

  /** The operation groups for fluxConfigOperationStatus */
  public readonly fluxConfigOperationStatus: FluxConfigOperationStatusOperations;
  /** The operation groups for fluxConfigurations */
  public readonly fluxConfigurations: FluxConfigurationsOperations;
}
