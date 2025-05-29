import type { HttpHeaders, HttpMethods, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import type { NotificationHubsMessageResponse, NotificationHubsResponse } from "../../models/notificationDetails.js";
import type { NotificationHubsClientContext } from "../index.js";
import type { OperationOptions } from "@azure-rest/core-client";
export declare function createRequest(endpoint: URL, method: HttpMethods, headers: HttpHeaders, options: OperationOptions): PipelineRequest;
/**
 * Parses the HTTP response and creates a NotificationHubsResponse with header information from the operation.
 * @param response - The HTTP response used to populate the result.
 * @returns A NotificationHubsResponse with header information from the operation.
 */
export declare function parseNotificationResponse(response: PipelineResponse): NotificationHubsResponse;
/**
 * Parses the HTTP response and creates a NotificationHubsMessageResponse with results from the notification.
 * @param response - The HTTP response used to populate the result.
 * @returns A NotificationHubsMessageResponse with results from the notification.
 */
export declare function parseNotificationSendResponse(response: PipelineResponse): Promise<NotificationHubsMessageResponse>;
/**
 * Sends a request through the client context.
 * @param context - The client context to use.
 * @param request - The HTTP request to send.
 * @param successStatusCode - A status code or list of status codes to check for success.
 * @returns The HTTP Response.
 */
export declare function sendRequest(context: NotificationHubsClientContext, request: PipelineRequest, successStatusCode: number | number[]): Promise<PipelineResponse>;
//# sourceMappingURL=_client.d.ts.map