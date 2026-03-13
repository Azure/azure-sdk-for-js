// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KubernetesConfigurationContext,
  KubernetesConfigurationClientOptionalParams,
} from "./api/index.js";
import { createKubernetesConfiguration } from "./api/index.js";
import type { FluxConfigOperationStatusOperations } from "./classic/fluxConfigOperationStatus/index.js";
import { _getFluxConfigOperationStatusOperations } from "./classic/fluxConfigOperationStatus/index.js";
import type { FluxConfigurationsOperations } from "./classic/fluxConfigurations/index.js";
import { _getFluxConfigurationsOperations } from "./classic/fluxConfigurations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { KubernetesConfigurationClientOptionalParams } from "./api/kubernetesConfigurationContext.js";

export class KubernetesConfigurationClient {
  private _client: KubernetesConfigurationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Use these APIs to create Flux Configuration resources through ARM, for Kubernetes Clusters. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: KubernetesConfigurationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKubernetesConfiguration(credential, subscriptionId, {
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
