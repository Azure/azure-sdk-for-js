// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createPortalServices,
  PortalServicesContext,
  PortalServicesClientOptionalParams,
} from "./api/index.js";
import {
  CopilotSettingsOperations,
  _getCopilotSettingsOperations,
} from "./classic/copilotSettings/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { PortalServicesClientOptionalParams } from "./api/portalServicesContext.js";

export class PortalServicesClient {
  private _client: PortalServicesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Portal Services API Reference */
  constructor(credential: TokenCredential, options: PortalServicesClientOptionalParams = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPortalServices(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.copilotSettings = _getCopilotSettingsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for copilotSettings */
  public readonly copilotSettings: CopilotSettingsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
