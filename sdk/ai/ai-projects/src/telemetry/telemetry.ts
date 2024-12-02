
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectionsOperations } from "../connections/index.js";

/** 
 * Telemetry options
 */
export interface TelemetryOptions {
    enableContentRecording: boolean;
}

const telemetryOptions: TelemetryOptions & { connectionString: string | unknown } = {
    enableContentRecording: false,
    connectionString: null
}

/** 
 * Update the telemetry settings
 * @param options - The telemetry options
 */
export function updateTelemetryOptions(options: TelemetryOptions): void {
    telemetryOptions.enableContentRecording = options.enableContentRecording;
};

/** 
 * Get the telemetry options
 * @returns The telemetry options
 */
export function getTelemetryOptions(): TelemetryOptions {
    return telemetryOptions;
};

/**
 * Get the appinsights connection string confired in the workspace
 * @param connection - get the connection string
 * @returns The telemetry connection string
 */
export async function getConnectionString(connection: ConnectionsOperations): Promise<string> {
    if (telemetryOptions.connectionString) {
        const workspace = await connection.getWorkspace();
        if (workspace.properties.applicationInsights) {
            telemetryOptions.connectionString = workspace.properties.applicationInsights
        }
        else {
            throw new Error("Application Insights connection string not found.")
        }
    }
    return telemetryOptions.connectionString as string;
}
