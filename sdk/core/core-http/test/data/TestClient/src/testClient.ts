// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

"use strict";

import * as msRest from "../../../../src/coreHttp";
import { Mappers } from "./models/mappers";

/**
 * @class
 * Initializes a new instance of the TestClient class.
 * @constructor
 *
 * @param {string} [baseUri] - The base URI of the service.
 *
 * @param {object} [options] - The parameter options
 *
 * @param {Array} [options.filters] - Filters to be added to the request pipeline
 *
 * @param {object} [options.requestOptions] - Options for the underlying request object
 * {@link https://github.com/request/request#requestoptions-callback Options doc}
 *
 * @param {bool} [options.noRetryPolicy] - If set to true, turn off default retry policy
 */

class TestClient extends msRest.ServiceClient {
  baseUri?: string;
  acceptLanguage?: string;
  models?: any;
  serializer: msRest.Serializer;
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
