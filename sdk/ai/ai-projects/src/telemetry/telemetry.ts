
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectionsOperations } from "../connections/index.js";
import { GetAppInsightsResponseOutput } from "../agents/inputOutputs.js";
import { Client, createRestError } from "@azure-rest/core-client";

const expectedStatuses = ["200"];

/** 
 * Telemetry options
 */
export interface TelemetryOptions {
    enableContentRecording: boolean;
}

const telemetryOptions: TelemetryOptions & { connectionString: string | undefined } = {
    enableContentRecording: false,
    connectionString: undefined
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
    return structuredClone(telemetryOptions);
};

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
export async function getConnectionString(context: Client, connection: ConnectionsOperations): Promise<string> {
    if (!telemetryOptions.connectionString) {
        const workspace = await connection.getWorkspace();
        if (workspace.properties.applicationInsights) {
            const result = await context.path("/{appInsightsResourceUrl}", workspace.properties.applicationInsights).get({skipUrlEncoding:true});
            if (!expectedStatuses.includes(result.status)) {
                throw createRestError(result);
            }
            telemetryOptions.connectionString = (result.body as GetAppInsightsResponseOutput).properties.ConnectionString;
        }
        else {
            throw new Error("Application Insights connection string not found.")
        }
    }
    return telemetryOptions.connectionString as string;
}
