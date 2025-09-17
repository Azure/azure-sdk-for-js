// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RestError } from "@azure/core-rest-pipeline";
import type { Connection, ApiKeyCredentials } from "../../models/models.js";
import type { ConnectionsOperations } from "../../classic/index.js";

/**
 * Interface for CreateTelemetryOperations internal state
 * @internal
 */
interface TelemetryOperationsState {
  _connectionString?: string;
}

/**
 * Creates a new instance of the CreateTelemetryOperations class.
 * @param connectionClient - The connections client to use for operations.
 * @returns A new instance of CreateTelemetryOperations.
 */
export function createTelemetryOperations(
  connectionClient: ConnectionsOperations,
): CreateTelemetryOperations {
  const state: TelemetryOperationsState = {
    _connectionString: undefined,
  };

  return {
    /**
     * Get the Application Insights connection string associated with the Project's Application Insights resource.
     * @param options - The options parameters.
     * @returns The Application Insights connection string.
     * @throws RestError if an Application Insights connection does not exist for this project.
     */
    async getApplicationInsightsConnectionString(): Promise<string> {
      if (!state._connectionString) {
        // Get all Application Insights connections that are marked as default
        const connections: Connection[] = [];
        for await (const connection of connectionClient.list({
          connectionType: "AppInsights",
          defaultConnection: true,
        })) {
          connections.push(connection);
        }

        // Find the first connection that is of type "AppInsights"
        const connectionName = connections?.[0]?.name;

        if (!connectionName) {
          throw new RestError("No Application Insights connection found.", {
            code: "ResourceNotFound",
            statusCode: 404,
          });
        }

        // Get the connection with credentials
        const connection = await connectionClient.getWithCredentials(connectionName);

        if (connection.credentials?.type === "ApiKey") {
          const apiKeyCredentials = connection.credentials as ApiKeyCredentials;
          if (!apiKeyCredentials.apiKey) {
            throw new Error("Application Insights connection does not have a connection string.");
          }
          state._connectionString = apiKeyCredentials.apiKey;
        } else {
          throw new Error("Application Insights connection does not use API Key credentials.");
        }
      }

      return state._connectionString;
    },
  };
}

/**
 * CreateTelemetryOperations provides operations for working with Application Insights telemetry.
 * DO NOT instantiate this class directly.
 * Instead, you should access these operations through the AIProjectClient's telemetry attribute.
 */
export interface CreateTelemetryOperations {
  /**
   * Get the Application Insights connection string associated with the Project's Application Insights resource.
   * @param options - The options parameters.
   * @returns The Application Insights connection string.
   * @throws RestError if an Application Insights connection does not exist for this project.
   */
  getApplicationInsightsConnectionString(): Promise<string>;
}
