import type { NotificationHubJob } from "../models/notificationHubJob.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { OperationOptions } from "@azure-rest/core-client";
/**
 * Gets all Notification Hub Jobs for this Notification Hub.
 * @param context - The Notification Hubs client.xs
 * @param options - The operation options.
 * @returns An array of all Notification Hub Jobs for this Notification Hub.
 */
export declare function listNotificationHubJobs(context: NotificationHubsClientContext, options?: OperationOptions): Promise<NotificationHubJob[]>;
//# sourceMappingURL=listNotificationHubJobs.d.ts.map