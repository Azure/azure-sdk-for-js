// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ExtensionTypesContext,
  ExtensionTypesClientOptionalParams,
  createExtensionTypes,
} from "./api/index.js";
import {
  ExtensionTypesOperations,
  _getExtensionTypesOperations,
} from "./classic/extensionTypes/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ExtensionTypesClientOptionalParams } from "./api/extensionTypesContext.js";

export class ExtensionTypesClient {
  private _client: ExtensionTypesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Use these APIs to view extension type resources through ARM, for Kubernetes Clusters. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ExtensionTypesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createExtensionTypes(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.extensionTypes = _getExtensionTypesOperations(this._client);
  }

  /** The operation groups for extensionTypes */
  public readonly extensionTypes: ExtensionTypesOperations;
}
