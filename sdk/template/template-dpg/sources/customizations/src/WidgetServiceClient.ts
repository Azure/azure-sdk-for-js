// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createWidgetService } from "./api/WidgetServiceContext.js";
import { WidgetServiceClientOptions } from "../../generated/src/api/WidgetServiceContext.js";
import { WidgetServiceContext } from "../../generated/src/rest/clientDefinitions.js";

export class WidgetServiceClient {
  private _client: WidgetServiceContext;
  /** */
  constructor(endpoint: string, options?: WidgetServiceClientOptions);
  constructor(endpoint: string, credential: TokenCredential, options?: WidgetServiceClientOptions);
  constructor(
    endpoint: string,
    credentialOrOptions?: TokenCredential | WidgetServiceClientOptions,
    options: WidgetServiceClientOptions = {},
  ) {
    if (isTokenCredential(credentialOrOptions)) {
      this._client = createWidgetService(endpoint, credentialOrOptions, options);
    } else {
      this._client = createWidgetService(endpoint, credentialOrOptions);
    }
  }
}
