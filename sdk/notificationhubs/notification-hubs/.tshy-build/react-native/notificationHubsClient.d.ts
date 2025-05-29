import type { BroadcastSendNotificationOptions, DirectSendNotificationOptions, EntityOperationOptions, NotificationHubsClientOptions, PolledOperationOptions, RegistrationQueryLimitOptions, ScheduleNotificationOptions, SendNotificationOptions } from "./models/options.js";
import type { Installation, JsonPatch } from "./models/installation.js";
import type { NotificationDetails, NotificationHubsMessageResponse, NotificationHubsResponse } from "./models/notificationDetails.js";
import type { NotificationHubJob, NotificationHubJobPoller } from "./models/notificationHubJob.js";
import type { RegistrationDescription, RegistrationChannel } from "./models/registration.js";
import type { Notification } from "./models/notification.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
/**
 * This represents a client for Azure Notification Hubs to manage installations and send
 * messages to devices.
 */
export declare class NotificationHubsClient {
    private _client;
    /**
     * Creates a new instance of the NotificationClient with a connection string, hub name and options.
     * @param connectionString - The Notification Hub Access Policy connection string.
     * @param hubName - The name of the Azure Notification Hub.
     * @param options - Options for configuring the Azure Notification Hubs client.
     */
    constructor(connectionString: string, hubName: string, options?: NotificationHubsClientOptions);
    /**
     * Creates or overwrites an installation to a Notification Hub.
     * @param installation - The installation to create or overwrite.
     * @param options - Configuration options for the create or update installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    createOrUpdateInstallation(installation: Installation, options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Deletes an installation from a Notification Hub.
     * @param installationId - The installation ID of the installation to delete.
     * @param options - Configuration options for the installation delete operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    deleteInstallation(installationId: string, options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Gets an Azure Notification Hub installation by the installation ID.
     * @param installationId - The ID of the installation to get.
     * @param options - Configuration options for the get installation operation.
     * @returns The installation that matches the installation ID.
     */
    getInstallation(installationId: string, options?: OperationOptions): Promise<Installation>;
    /**
     * Updates an installation using the JSON-Patch standard in RFC6902.
     * @param installationId - The ID of the installation to update.
     * @param patches - An array of patches following the JSON-Patch standard.
     * @param options - Configuration options for the patch installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    updateInstallation(installationId: string, patches: JsonPatch[], options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Creates a new registration ID.
     * @param options - The options for creating a new registration ID.
     * @returns The newly created registration ID.
     */
    createRegistrationId(options?: OperationOptions): Promise<string>;
    /**
     * Creates a new registration. This method generates a registration ID,
     * which you can subsequently use to retrieve, update, and delete this registration.
     * @param registration - The registration to create.
     * @param options - Options for creating a new registration.
     * @returns The newly created registration description.
     */
    createRegistration(registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Creates or updates a registration.
     * @param registration - The registration to create or update.
     * @param options - The operation options.
     * @returns The created or updated registration description.
     */
    createOrUpdateRegistration(registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Updates an existing registration.
     * @param registration - The registration to update.
     * @param options - The operation options.
     * @returns The updated registration description.
     */
    updateRegistration(registration: RegistrationDescription, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Deletes a registration with the given registration ID.
     * @param context - The Notification Hubs client.
     * @param registrationId - The registration ID of the registration to delete.
     * @param options - The options for delete operations including the ETag
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    deleteRegistration(registrationId: string, options?: EntityOperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Gets a registration by the given registration ID.
     * @param registrationId - The ID of the registration to get.
     * @param options - The options for getting a registration by ID.
     * @returns A RegistrationDescription that has the given registration ID.
     */
    getRegistration(registrationId: string, options?: OperationOptions): Promise<RegistrationDescription>;
    /**
     * Gets all registrations for the notification hub with the given query options.
     * @param options - The options for querying the registrations such as $top.
     * @returns A paged async iterable containing all of the registrations for the notification hub.
     */
    listRegistrations(options?: RegistrationQueryLimitOptions): PagedAsyncIterableIterator<RegistrationDescription>;
    /**
     * Gets all registrations for the notification hub with the given device information and options.
     * @param channel - The registration channel information to query per PNS type.
     * @param options - The options for querying the registrations such as $top.
     * @returns A paged async iterable containing all of the registrations for the notification hub.
     */
    listRegistrationsByChannel(channel: RegistrationChannel, options?: RegistrationQueryLimitOptions): PagedAsyncIterableIterator<RegistrationDescription>;
    /**
     * Lists all registrations with the matching tag.
     * @param tag - The tag to query for matching registrations.
     * @param options - The query options such as $top.
     * @returns A paged async iterable containing the matching registrations for the notification hub.
     */
    listRegistrationsByTag(tag: string, options?: RegistrationQueryLimitOptions): PagedAsyncIterableIterator<RegistrationDescription>;
    /**
     * Sends push notifications to devices all devices.
     * @param notification - The notification to send to all devices.
     * @param options - Options for the notification including whether to enable test send.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendBroadcastNotification(notification: Notification, options?: BroadcastSendNotificationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Sends push notifications to devices that match the given tags or tag expression.
     * @param notification - The notification to send to the matching devices.
     * @param options - Options for the notification including tags, device handles and whether to enable test send.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendNotification(notification: Notification, options: DirectSendNotificationOptions | SendNotificationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Schedules a push notification to all devices at the specified time.
     * NOTE: This is only available in Standard SKU Azure Notification Hubs.
     * @param scheduledTime - The Date to send the push notification.
     * @param notification - The notification to send to the matching devices.
     * @param options - The operation options.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    scheduleBroadcastNotification(scheduledTime: Date, notification: Notification, options?: OperationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
     * NOTE: This is only available in Standard SKU Azure Notification Hubs.
     * @param scheduledTime - The Date to send the push notification.
     * @param notification - The notification to send to the matching devices.
     * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    scheduleNotification(scheduledTime: Date, notification: Notification, options: ScheduleNotificationOptions): Promise<NotificationHubsMessageResponse>;
    /**
     * Cancels the scheduled notification with the given notification ID.
     * @param notificationId - The notification ID from the scheduled notification.
     * @param options - The operation options.
     * @returns A notification hub response with correlation ID and tracking ID.
     */
    cancelScheduledNotification(notificationId: string, options?: OperationOptions): Promise<NotificationHubsResponse>;
    /**
     * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
     * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
     * @param options - The options for getting the push notification feedback container URL.
     * @returns The URL of the Azure Storage Container containing the feedback data.
     */
    getFeedbackContainerUrl(options?: OperationOptions): Promise<string>;
    /**
     * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
     * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
     * @param notificationId - The notification ID returned from the send operation.
     * @param options - The operation options.
     * @returns The results of the send operation.
     */
    getNotificationOutcomeDetails(notificationId: string, options?: OperationOptions): Promise<NotificationDetails>;
    /**
     * Gets a Notification Hub Job by the ID.
     * @param jobId - The Notification Hub Job ID.
     * @param options - The operation options.
     * @returns The Notification Hub Job with the matching ID.
     */
    getNotificationHubJob(jobId: string, options?: OperationOptions): Promise<NotificationHubJob>;
    /**
     * Submits a Notification Hub job and creates a poller to poll for results.
     * @param notificationHubJob - The Notification Hub import/export job to start.
     * @param options - The operation options.
     * @returns A poller which can be called to poll until completion of the job.
     */
    beginSubmitNotificationHubJob(notificationHubJob: NotificationHubJob, options?: PolledOperationOptions): Promise<NotificationHubJobPoller>;
    /**
     * Submits a Notification Hub Job.  Note this is available to Standard SKU namespace and above.
     * @param job - The notification hub job to submit.
     * @param options - The operation options.
     * @returns The notification hub job details including job ID and status.
     */
    submitNotificationHubJob(job: NotificationHubJob, options?: OperationOptions): Promise<NotificationHubJob>;
    /**
     * Gets all Notification Hub Jobs for this Notification Hub.
     * @param options - The operation options.
     * @returns An array of all Notification Hub Jobs for this Notification Hub.
     */
    listNotificationHubJobs(options?: OperationOptions): Promise<NotificationHubJob[]>;
}
//# sourceMappingURL=notificationHubsClient.d.ts.map