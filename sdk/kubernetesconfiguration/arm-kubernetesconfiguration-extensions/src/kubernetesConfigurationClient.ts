// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KubernetesConfigurationContext,
  KubernetesConfigurationClientOptionalParams,
} from "./api/index.js";
import { createKubernetesConfiguration } from "./api/index.js";
import type { ExtensionsOperations } from "./classic/extensions/index.js";
import { _getExtensionsOperations } from "./classic/extensions/index.js";
import type { OperationStatusOperations } from "./classic/operationStatus/index.js";
import { _getOperationStatusOperations } from "./classic/operationStatus/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { KubernetesConfigurationClientOptionalParams } from "./api/kubernetesConfigurationContext.js";

export class KubernetesConfigurationClient {
  private _client: KubernetesConfigurationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Use these APIs to create extension resources through ARM, for Kubernetes Clusters. */
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
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.extensions = _getExtensionsOperations(this._client);
  }

  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for extensions */
  public readonly extensions: ExtensionsOperations;
}
