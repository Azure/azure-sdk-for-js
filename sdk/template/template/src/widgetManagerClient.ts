// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createWidgetManager,
  WidgetManagerContext,
  WidgetManagerClientOptionalParams,
} from "./api/index.js";
import {
  WidgetsOperations,
  _getWidgetsOperations,
} from "./classic/widgets/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { WidgetManagerClientOptionalParams } from "./api/widgetManagerContext.js";

export class WidgetManagerClient {
  private _client: WidgetManagerContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: WidgetManagerClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createWidgetManager(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.widgets = _getWidgetsOperations(this._client);
  }

  /** The operation groups for widgets */
  public readonly widgets: WidgetsOperations;
}
