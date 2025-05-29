import type { NotificationHubJob } from "../models/notificationHubJob.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Gets a Notification Hub Job by the ID.
 * @param context - The Notification Hubs client.
 * @param jobId - The Notification Hub Job ID.
 * @param options - The operation options.
 * @returns The Notification Hub Job with the matching ID.
 */
export declare function getNotificationHubJob(context: NotificationHubsClientContext, jobId: string, options?: OperationOptions): Promise<NotificationHubJob>;
//# sourceMappingURL=getNotificationHubJob.d.ts.map