// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceClientOptions, ServiceClient } from "@azure/core-client";
import { DEFAULT_API_VERSION } from "./utils/constants";

interface IoTModelsRepositoryServiceClientOptions extends ServiceClientOptions {
  // API Version to be used during HTTP Calls.
  version?: string;
  // Endpoint that will be base of URLs for HTTP calls.
  endpoint?: string;
}

/**
 * @internal
 */
export class IoTModelsRepositoryServiceClient extends ServiceClient {
  url: string;
  version: string;

  /**
   * Initializes a new instance of the IoTModelsRepositoryServiceClient class.
   *
   * @param url - The URL of the service account or table that is the target of the desired operation.
   * @param options - The parameter options
   */
  constructor(url: string, options: IoTModelsRepositoryServiceClientOptions = {}) {
    const defaults: IoTModelsRepositoryServiceClientOptions = {
      baseUri: `${url}`,
      requestContentType: "application/json; charset=utf-8",
    };

    const optionsWithDefaults = {
      ...defaults,
      ...options,
    };

    super(optionsWithDefaults);

    this.url = url;
    this.version = options.version || DEFAULT_API_VERSION;
  }
}
