// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TokenCredential } from "@azure/core-auth";
import * as coreClient from "@azure/core-client";
import { MonitoringClientOptionalParams } from "./models";

export class MonitoringClientContext extends coreClient.ServiceClient {
  endpoint: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the MonitoringClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: TokenCredential,
    endpoint: string,
    options?: MonitoringClientOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if (endpoint === undefined) {
      throw new Error("'endpoint' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.credentialScopes) {
      options.credentialScopes = ["https://dev.azuresynapse.net/.default"];
    }

    options.credential = credentials;

    super(options);

    // Parameter assignments
    this.endpoint = endpoint;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2019-11-01-preview";
  }
}
