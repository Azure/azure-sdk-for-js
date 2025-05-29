import type { NotificationDetails } from "../models/notificationDetails.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
 * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID returned from the send operation.
 * @param options - The operation options.
 * @returns The results of the send operation.
 */
export declare function getNotificationOutcomeDetails(context: NotificationHubsClientContext, notificationId: string, options?: OperationOptions): Promise<NotificationDetails>;
//# sourceMappingURL=getNotificationOutcomeDetails.d.ts.map