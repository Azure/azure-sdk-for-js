// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";
import { ManagedPrivateEndpoints } from "./operations";
import { ManagedPrivateEndpointsClientContext } from "./managedPrivateEndpointsClientContext";
import { ManagedPrivateEndpointsClientOptionalParams } from "./models";

export class ManagedPrivateEndpointsClient extends ManagedPrivateEndpointsClientContext {
  /**
   * Initializes a new instance of the ManagedPrivateEndpointsClient class.
   * @param credentials - Subscription credentials which uniquely identify client subscription.
   * @param endpoint - The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options - The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: ManagedPrivateEndpointsClientOptionalParams
  ) {
    super(credentials, endpoint, options);
    this.managedPrivateEndpoints = new ManagedPrivateEndpoints(this);
  }

  managedPrivateEndpoints: ManagedPrivateEndpoints;
}
