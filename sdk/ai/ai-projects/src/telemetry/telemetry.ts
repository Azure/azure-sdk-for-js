// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GetAppInsightsResponseOutput } from "../customization/outputModels.js";
import type { Client } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import type { ConnectionsInternalOperations } from "../connections/internalModels.js";

const expectedStatuses = ["200"];

/**
 * Telemetry options
 */
export interface TelemetryOptions {
  /** Enable content recording */
  enableContentRecording: boolean;
}

const telemetryOptions: TelemetryOptions & { connectionString: string | undefined } = {
  enableContentRecording: false,
  connectionString: undefined,
};

/**
 * Update the telemetry settings
 * @param options - The telemetry options
 */
export function updateTelemetryOptions(options: TelemetryOptions): void {
  telemetryOptions.enableContentRecording = options.enableContentRecording;
}

/**
 * Get the telemetry options
 * @returns The telemetry options
 */
export function getTelemetryOptions(): TelemetryOptions {
  return structuredClone(telemetryOptions);
}

/**
 * Reset the telemetry options
 */
export function resetTelemetryOptions(): void {
  telemetryOptions.connectionString = undefined;
  telemetryOptions.enableContentRecording = false;
}

/**
 * Get the appinsights connection string confired in the workspace
 * @param connection - get the connection string
 * @returns The telemetry connection string
 */
export async function getConnectionString(
  context: Client,
  connection: ConnectionsInternalOperations,
): Promise<string> {
  if (!telemetryOptions.connectionString) {
    const workspace = await connection.getWorkspace();
    if (workspace.properties.applicationInsights) {
      const result = await context
        .path("/{appInsightsResourceUrl}", workspace.properties.applicationInsights)
        .get({ skipUrlEncoding: true });
      if (!expectedStatuses.includes(result.status)) {
        throw createRestError(result);
      }
      telemetryOptions.connectionString = (
        result.body as GetAppInsightsResponseOutput
      ).properties.ConnectionString;
    } else {
      throw new Error("Application Insights connection string not found.");
    }
  }
  return telemetryOptions.connectionString as string;
}
