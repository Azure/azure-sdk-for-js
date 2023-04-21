// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureMonitorOpenTelemetryConfig } from "../config";

/**
 * Azure Monitor Standard Metrics
 */
export class StandardMetrics {
  /**
   * Initializes a new instance of the StandardMetrics class.
   * @param _config - Configuration.
   */
  constructor(private _config: AzureMonitorOpenTelemetryConfig) {
    if (this._config) {
      // TODO
    }
  }

  /**
   * Start auto collection of telemetry
   */
  public start() {
    // TODO
  }

  /**
   * Shutdown Meter Provider it will return no-op Meters after being called.
   */
  public shutdown() {
    // TODO
  }

  /**
   * Force flush Meter Provider.
   */
  public async flush(): Promise<void> {
    // TODO
  }
}
