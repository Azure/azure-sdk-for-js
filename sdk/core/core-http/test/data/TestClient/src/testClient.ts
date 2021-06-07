// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

"use strict";

import * as msRest from "../../../../src/coreHttp";
import { Mappers } from "./models/mappers";

class TestClient extends msRest.ServiceClient {
  baseUri?: string;
  acceptLanguage?: string;
  models?: any;
  serializer: msRest.Serializer;

  /**
   * @param baseUri - The base URI of the service.
   * @param options - The parameter options
   */
  constructor(baseUri: string, options?: msRest.ServiceClientOptions) {
    if (!options) options = {};
    super(undefined, options);
    this.baseUri = baseUri;
    if (!this.baseUri) {
      this.baseUri = "https://management.azure.com";
    }

    if (!this.acceptLanguage) {
      this.acceptLanguage = "en-US";
    }
    this.serializer = new msRest.Serializer(Mappers);
  }
}

export { TestClient };
