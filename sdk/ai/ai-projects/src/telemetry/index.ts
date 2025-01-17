// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Client } from "@azure-rest/core-client";
import type { TelemetryOptions } from "./telemetry.js";
import {
  getConnectionString,
  getTelemetryOptions,
  resetTelemetryOptions,
  updateTelemetryOptions,
} from "./telemetry.js";
import type { ConnectionsInternalOperations } from "../connections/internalModels.js";
import type { ConnectionsOperations } from "../connections/customModels.js";
export { TelemetryOptions } from "./telemetry.js";

/**
 * Telemetry operations
 **/
export interface TelemetryOperations {
  /**
   * Get the appinsights connection string confired in the workspace
   * @returns The telemetry connection string
   **/
  getConnectionString(): Promise<string>;

  /**
   * Update the telemetry settings
   * @param options - The telemetry options
   * @returns void
   * */
  updateSettings(options: TelemetryOptions): void;

  /**
   * get the telemetry settings
   * @returns The telemetry options
   * */
  getSettings(): TelemetryOptions;
}

/**
 * Get the telemetry operations
 * @param connection - The connections operations
 * @returns The telemetry operations
 **/
export function getTelemetryOperations(
  context: Client,
  connection: ConnectionsOperations,
): TelemetryOperations {
  resetTelemetryOptions();
  return {
    getConnectionString: () =>
      getConnectionString(context, connection as ConnectionsInternalOperations),
    updateSettings: (options: TelemetryOptions) => updateTelemetryOptions(options),
    getSettings: () => getTelemetryOptions(),
  };
}
