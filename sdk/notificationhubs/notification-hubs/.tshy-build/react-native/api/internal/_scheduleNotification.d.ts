import type { Notification } from "../../models/notification.js";
import type { NotificationHubsClientContext } from "../index.js";
import type { NotificationHubsMessageResponse } from "../../models/notificationDetails.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
 * NOTE: This is only available in Standard SKU Azure Notification Hubs.
 * @param context - The Notification Hubs client.
 * @param scheduledTime - The Date to send the push notification.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export declare function scheduleNotificationInternal(context: NotificationHubsClientContext, scheduledTime: Date, notification: Notification, options: OperationOptions, method: string, tagExpression?: string): Promise<NotificationHubsMessageResponse>;
//# sourceMappingURL=_scheduleNotification.d.ts.map