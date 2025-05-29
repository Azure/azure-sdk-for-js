import type { NotificationHubJob } from "../models/notificationHubJob.js";
/**
 * @internal
 * Serializes a NotificationHubJob into an Atom XML entry.
 * @param entry - The NotificationHubJob to turn into an Atom XML entry.
 * @returns An Atom XML entry containing the notification hub job.
 */
export declare function serializeNotificationHubJobEntry(entry: NotificationHubJob): string;
/**
 * Parses an Atom XML of an notification hub job entry.
 * @param bodyText - The incoming Atom XML entry to parse into a notification hub job.
 * @returns A parsed NotificationHubJob.
 */
export declare function parseNotificationHubJobEntry(bodyText: string): Promise<NotificationHubJob>;
/**
 * Parses an Atom XML feed of notification hub jobs.
 * @param bodyText - The incoming Atom XML feed to parse into notification hub jobs.
 * @returns A list of notification hub jobs.
 */
export declare function parseNotificationHubJobFeed(bodyText: string): Promise<NotificationHubJob[]>;
//# sourceMappingURL=notificationHubJobSerializer.d.ts.map