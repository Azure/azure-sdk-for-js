import type { NotificationHubsClientContext } from "./index.js";
import type { NotificationHubsResponse } from "../models/notificationDetails.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Cancels the scheduled notification with the given notification ID.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param notificationId - The notification ID from the scheduled notification.
 * @param options - The operation options.
 * @returns A notification hub response with correlation ID and tracking ID.
 */
export declare function cancelScheduledNotification(context: NotificationHubsClientContext, notificationId: string, options?: OperationOptions): Promise<NotificationHubsResponse>;
//# sourceMappingURL=cancelScheduledNotification.d.ts.map