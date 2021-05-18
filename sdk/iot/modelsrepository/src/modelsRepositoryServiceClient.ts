// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { ServiceClientOptions, ServiceClient } from "@azure/core-client";
import { DEFAULT_API_VERSION } from "./internal";

interface IoTModelsRepositoryServiceClientOptions extends ServiceClientOptions {
  version?: string;
  endpoint?: string;
}

/**
 * @internal
 */
export class IoTModelsRepositoryServiceClient extends ServiceClient {
  url: string;
  version: string;

  /**
   * Initializes a new instance of the GeneratedClient class.
   * @param url The URL of the service account or table that is the target of the desired operation.
   * @param options The parameter options
   */
  constructor(url: string, options: IoTModelsRepositoryServiceClientOptions = {}) {
    const defaults: IoTModelsRepositoryServiceClientOptions = {
      baseUri: `${url}`,
      requestContentType: "application/json; charset=utf-8"
    };

    const optionsWithDefaults = {
      ...defaults,
      ...options
    };

    super(optionsWithDefaults);

    this.url = url;
    this.version = options.version || DEFAULT_API_VERSION;
  }
}
