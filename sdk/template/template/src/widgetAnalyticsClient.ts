// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WidgetAnalyticsContext, WidgetAnalyticsClientOptionalParams } from "./api/index.js";
import { createWidgetAnalytics } from "./api/index.js";
import type { WidgetsOperations } from "./classic/widgets/index.js";
import { _getWidgetsOperations } from "./classic/widgets/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { WidgetAnalyticsClientOptionalParams } from "./api/widgetAnalyticsContext.js";

export class WidgetAnalyticsClient {
  private _client: WidgetAnalyticsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: WidgetAnalyticsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createWidgetAnalytics(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.widgets = _getWidgetsOperations(this._client);
  }

  /** The operation groups for widgets */
  public readonly widgets: WidgetsOperations;
}
