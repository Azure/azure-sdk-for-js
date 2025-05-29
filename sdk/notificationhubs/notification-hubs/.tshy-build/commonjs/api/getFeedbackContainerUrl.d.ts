import type { NotificationHubsClientContext } from "./index.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
 * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
 * @param context - The Notification Hubs client.
 * @param options - The options for getting the push notification feedback container URL.
 * @returns The URL of the Azure Storage Container containing the feedback data.
 */
export declare function getFeedbackContainerUrl(context: NotificationHubsClientContext, options?: OperationOptions): Promise<string>;
//# sourceMappingURL=getFeedbackContainerUrl.d.ts.map