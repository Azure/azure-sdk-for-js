// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext, MonitorClientOptionalParams } from "./api/index.js";
import { createMonitor } from "./api/index.js";
import type { SlisOperations } from "./classic/slis/index.js";
import { _getSlisOperations } from "./classic/slis/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MonitorClientOptionalParams } from "./api/monitorContext.js";

export class MonitorClient {
  private _client: MonitorContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options: MonitorClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMonitor(credential, { ...options, userAgentOptions: { userAgentPrefix } });
    this.pipeline = this._client.pipeline;
    this.slis = _getSlisOperations(this._client);
  }

  /** The operation groups for slis */
  public readonly slis: SlisOperations;
}
