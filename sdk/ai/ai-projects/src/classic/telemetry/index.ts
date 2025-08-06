// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createTelemetryOperations } from "../../api/telemetry/operations.js";
import type { ConnectionsOperations } from "../connections/index.js";

/** Interface representing telemetry operations */
export interface TelemetryOperations {
  /** Get appInsight connection string */
  getApplicationInsightsConnectionString: () => Promise<string>;
}

function _getTelemetry(connections: ConnectionsOperations): TelemetryOperations {
  const telemetryOperations = createTelemetryOperations(connections);
  return {
    getApplicationInsightsConnectionString: () =>
      telemetryOperations.getApplicationInsightsConnectionString(),
  };
}
export function _getTelemetryOperations(connections: ConnectionsOperations): TelemetryOperations {
  return _getTelemetry(connections);
}
