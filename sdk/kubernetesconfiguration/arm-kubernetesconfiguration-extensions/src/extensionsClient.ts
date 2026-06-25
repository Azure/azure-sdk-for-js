// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ExtensionsContext,
  ExtensionsClientOptionalParams,
  createExtensions,
} from "./api/index.js";
import { ExtensionsOperations, _getExtensionsOperations } from "./classic/extensions/index.js";
import {
  OperationStatusOperations,
  _getOperationStatusOperations,
} from "./classic/operationStatus/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ExtensionsClientOptionalParams } from "./api/extensionsContext.js";

export class ExtensionsClient {
  private _client: ExtensionsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Use these APIs to create extension resources through ARM, for Kubernetes Clusters. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ExtensionsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createExtensions(credential, subscriptionId, {
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
