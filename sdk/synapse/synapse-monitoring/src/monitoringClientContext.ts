// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MonitoringClientOptionalParams } from "./models";
import { ServiceClient } from "@azure/core-client";
import { TokenCredential } from "@azure/core-auth";

const packageName = "@azure/synapse-monitoring";
const packageVersion = "1.0.0-beta.4";

export class MonitoringClientContext extends ServiceClient {
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

    const defaults = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials
    };

    const packageDetails = `${packageName}/${packageVersion}`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    if (!options.credentialScopes) {
      options.credentialScopes = ["https://dev.azuresynapse.net/.default"];
    }
    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix
      },
      baseUri: options.endpoint || "{endpoint}"
    };

    super(optionsWithDefaults);

    // Parameter assignments
    this.endpoint = endpoint;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2019-11-01-preview";
  }
}
