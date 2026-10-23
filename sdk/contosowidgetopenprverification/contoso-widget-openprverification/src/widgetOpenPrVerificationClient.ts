// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  WidgetOpenPrVerificationContext,
  WidgetOpenPrVerificationClientOptionalParams,
} from "./api/index.js";
import { createWidgetOpenPrVerification } from "./api/index.js";
import type { WidgetsOperations } from "./classic/widgets/index.js";
import { _getWidgetsOperations } from "./classic/widgets/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { WidgetOpenPrVerificationClientOptionalParams } from "./api/widgetOpenPrVerificationContext.js";

export class WidgetOpenPrVerificationClient {
  private _client: WidgetOpenPrVerificationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** A disposable Widget service for OPEN-PR-VERIFICATION-17024. */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: WidgetOpenPrVerificationClientOptionalParams = {},
  ) {
    this._client = createWidgetOpenPrVerification(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
    this.widgets = _getWidgetsOperations(this._client);
  }

  /** The operation groups for widgets */
  public readonly widgets: WidgetsOperations;
}
