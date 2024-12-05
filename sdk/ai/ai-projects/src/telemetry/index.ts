
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.


import { ConnectionsOperations } from "../connections/index.js";
import {getConnectionString, getTelemetryOptions, resetTelemetryOptions, TelemetryOptions, updateTelemetryOptions } from "./telemetry.js";

/**
 * Telemetry operations
 **/
export interface TelemetryOperations {
    /**
     * Get the appinsights connection string confired in the workspace
     * @returns The telemetry connection string
     **/
    getConnectionString() : Promise<string>

    /**
     * Update the telemetry settings
     * @param options - The telemetry options
     * @returns void
     * */
    updateSettings(options: TelemetryOptions) : void

    /**
     * get the telemetry settings
     * @returns The telemetry options
     * */
    getSettings() : TelemetryOptions
}

/**
 * Get the telemetry operations
 * @param connection - The connections operations
 * @returns The telemetry operations
 **/
export function getTelemetryOperations(connection: ConnectionsOperations): TelemetryOperations {
    resetTelemetryOptions();
    return {
        getConnectionString: () => getConnectionString(connection),
        updateSettings : (options: TelemetryOptions) => updateTelemetryOptions(options),
        getSettings : () => getTelemetryOptions()
    }
}
