import type { BroadcastSendNotificationOptions } from "../models/options.js";
import type { Notification } from "../models/notification.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { NotificationHubsMessageResponse } from "../models/notificationDetails.js";
/**
 * Sends push notifications to all devices with a broadcast send.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export declare function sendBroadcastNotification(context: NotificationHubsClientContext, notification: Notification, options?: BroadcastSendNotificationOptions): Promise<NotificationHubsMessageResponse>;
//# sourceMappingURL=sendBroadcastNotification.d.ts.map