// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnContext, CdnClientOptionalParams } from "./api/index.js";
import { createCdn } from "./api/index.js";
import type { EdgeActionExecutionFiltersOperations } from "./classic/edgeActionExecutionFilters/index.js";
import { _getEdgeActionExecutionFiltersOperations } from "./classic/edgeActionExecutionFilters/index.js";
import type { EdgeActionVersionsOperations } from "./classic/edgeActionVersions/index.js";
import { _getEdgeActionVersionsOperations } from "./classic/edgeActionVersions/index.js";
import type { EdgeActionsOperations } from "./classic/edgeActions/index.js";
import { _getEdgeActionsOperations } from "./classic/edgeActions/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { CdnClientOptionalParams } from "./api/cdnContext.js";

export class CdnClient {
  private _client: CdnContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: CdnClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCdn(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.edgeActionExecutionFilters = _getEdgeActionExecutionFiltersOperations(this._client);
    this.edgeActionVersions = _getEdgeActionVersionsOperations(this._client);
    this.edgeActions = _getEdgeActionsOperations(this._client);
  }

  /** The operation groups for edgeActionExecutionFilters */
  public readonly edgeActionExecutionFilters: EdgeActionExecutionFiltersOperations;
  /** The operation groups for edgeActionVersions */
  public readonly edgeActionVersions: EdgeActionVersionsOperations;
  /** The operation groups for edgeActions */
  public readonly edgeActions: EdgeActionsOperations;
}
