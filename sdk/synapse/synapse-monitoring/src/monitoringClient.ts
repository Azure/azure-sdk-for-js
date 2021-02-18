// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as coreHttp from "@azure/core-http";
import { Monitoring } from "./operations";
import { MonitoringClientContext } from "./monitoringClientContext";
import { MonitoringClientOptionalParams } from "./models";

export class MonitoringClient extends MonitoringClientContext {
  /**
   * Initializes a new instance of the MonitoringClient class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: MonitoringClientOptionalParams
  ) {
    super(credentials, endpoint, options);
    this.monitoring = new Monitoring(this);
  }

  monitoring: Monitoring;
}
