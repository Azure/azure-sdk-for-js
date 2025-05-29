import type { BroadcastSendNotificationOptions, DirectSendNotificationOptions, SendNotificationOptions } from "../../models/options.js";
import type { Notification } from "../../models/notification.js";
import type { NotificationHubsClientContext } from "../index.js";
import type { NotificationHubsMessageResponse } from "../../models/notificationDetails.js";
/**
 * Sends push notifications to devices that match the given tags or tag expression.
 * @param context - The Notification Hubs client.
 * @param notification - The notification to send to the matching devices.
 * @param options - Options for the notification including tags, device handles and whether to enable test send.
 * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
 */
export declare function sendNotificationInternal(context: NotificationHubsClientContext, notification: Notification, options: DirectSendNotificationOptions | SendNotificationOptions | BroadcastSendNotificationOptions): Promise<NotificationHubsMessageResponse>;
//# sourceMappingURL=_sendNotification.d.ts.map