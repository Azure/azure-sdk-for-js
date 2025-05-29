import type { NotificationHubJob, NotificationHubJobPoller } from "../models/notificationHubJob.js";
import type { NotificationHubsClientContext } from "./index.js";
import type { PolledOperationOptions } from "../models/options.js";
/**
 * Submits a Notification Hub job and creates a poller to poll for results.
 * @param context - The Notification Hubs client.
 * @param notificationHubJob - The Notification Hub import/export job to start.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export declare function beginSubmitNotificationHubJob(context: NotificationHubsClientContext, notificationHubJob: NotificationHubJob, polledOperationOptions?: PolledOperationOptions): Promise<NotificationHubJobPoller>;
//# sourceMappingURL=beginSubmitNotificationHubJob.d.ts.map