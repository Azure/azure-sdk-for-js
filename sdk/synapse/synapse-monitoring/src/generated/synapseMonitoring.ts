import * as coreHttp from "@azure/core-http";
import { Monitoring } from "./operations";
import { SynapseMonitoringContext } from "./synapseMonitoringContext";
import { SynapseMonitoringOptionalParams } from "./models";

export class SynapseMonitoring extends SynapseMonitoringContext {
  /**
   * Initializes a new instance of the SynapseMonitoring class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param endpoint The workspace development endpoint, for example
   *                 https://myworkspace.dev.azuresynapse.net.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    endpoint: string,
    options?: SynapseMonitoringOptionalParams
  ) {
    super(credentials, endpoint, options);
    this.monitoring = new Monitoring(this);
  }

  monitoring: Monitoring;
}
