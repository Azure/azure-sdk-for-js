import type { HttpHeaders, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import type { NotificationHubsClientOptions } from "../models/options.js";
/**
 * Represents the Notification Hubs SDK client context.
 */
export interface NotificationHubsClientContext {
    /**
     * @internal
     */
    sendRequest(request: PipelineRequest): Promise<PipelineResponse>;
    /**
     * @internal
     */
    createHeaders(operationName: string, rawHeaders?: Record<string, string>): Promise<HttpHeaders>;
    /**
     * @internal
     */
    requestUrl(): URL;
}
/**
 * Creates a NotificationHubClient from the Access Policy connection string and hub name.
 * @param connectionString - The Access Policy connection string for the notification hub.
 * @param hubName - The notification hub name.
 * @returns A NotificationHubsClientContext initialized from the connection string and hub name.
 */
export declare function createClientContext(connectionString: string, hubName: string, options?: NotificationHubsClientOptions): NotificationHubsClientContext;
//# sourceMappingURL=clientContext.d.ts.map