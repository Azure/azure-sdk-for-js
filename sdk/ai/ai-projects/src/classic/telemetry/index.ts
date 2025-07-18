// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createTelemetryOperations } from "../../api/telemetry/operations.js";
import type { ConnectionsOperations } from "../connections/index.js";

/** Interface representing telemetry operations */
export interface TelemetryOperations {
  /** Get appInsight connection string */
  getConnectionString: () => Promise<string>;
}

function _getTelemetry(connections: ConnectionsOperations): TelemetryOperations {
  const telemetryOperations = createTelemetryOperations(connections);
  return {
    getConnectionString: () => telemetryOperations.getConnectionString(),
  };
}
export function _getTelemetryOperations(connections: ConnectionsOperations): TelemetryOperations {
  return _getTelemetry(connections);
}
