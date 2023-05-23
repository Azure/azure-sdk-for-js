// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, isTokenCredential } from "@azure/core-auth";
import { ClientOptions } from "../../generated/src/common/interfaces.js";
import { createWidgetService } from "./api/WidgetServiceContext.js";
import { WidgetServiceContext } from "../../generated/src/rest/clientDefinitions.js";

export class WidgetServiceClient {
  private _client: WidgetServiceContext;
  /** */
  constructor(endpoint: string, options?: ClientOptions);
  constructor(endpoint: string, credential: TokenCredential, options?: ClientOptions);
  constructor(
    endpoint: string,
    credentialOrOptions?: TokenCredential | ClientOptions,
    options: ClientOptions = {}
  ) {
    if (isTokenCredential(credentialOrOptions)) {
      this._client = createWidgetService(endpoint, credentialOrOptions, options);
    }

    this._client = createWidgetService(endpoint, options);
  }
}
