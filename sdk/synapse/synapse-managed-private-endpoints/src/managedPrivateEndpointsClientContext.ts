// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";
import { ManagedPrivateEndpointsClientOptionalParams } from "./models";

const packageName = "@azure/synapse-managed-private-endpoints";
const packageVersion = "1.0.0-beta.1";

export class ManagedPrivateEndpointsClientContext extends coreHttp.ServiceClient {
  endpoint: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the ManagedPrivateEndpointsClientContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: ManagedPrivateEndpointsClientOptionalParams
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

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    if (!options.credentialScopes) {
      options.credentialScopes = ["https://dev.azuresynapse.net/.default"];
    }

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri = options.endpoint || "{endpoint}";

    // Parameter assignments
    this.endpoint = endpoint;

    // Assigning values to Constant parameters
    this.apiVersion = options.apiVersion || "2019-06-01-preview";
  }
}
