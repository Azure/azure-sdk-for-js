"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationHubsClient = void 0;
const clientContext_js_1 = require("./api/clientContext.js");
const beginSubmitNotificationHubJob_js_1 = require("./api/beginSubmitNotificationHubJob.js");
const cancelScheduledNotification_js_1 = require("./api/cancelScheduledNotification.js");
const createOrUpdateInstallation_js_1 = require("./api/createOrUpdateInstallation.js");
const createOrUpdateRegistration_js_1 = require("./api/createOrUpdateRegistration.js");
const createRegistrationId_js_1 = require("./api/createRegistrationId.js");
const createRegistration_js_1 = require("./api/createRegistration.js");
const deleteInstallation_js_1 = require("./api/deleteInstallation.js");
const deleteRegistration_js_1 = require("./api/deleteRegistration.js");
const getFeedbackContainerUrl_js_1 = require("./api/getFeedbackContainerUrl.js");
const getInstallation_js_1 = require("./api/getInstallation.js");
const getNotificationHubJob_js_1 = require("./api/getNotificationHubJob.js");
const getNotificationOutcomeDetails_js_1 = require("./api/getNotificationOutcomeDetails.js");
const getRegistration_js_1 = require("./api/getRegistration.js");
const listNotificationHubJobs_js_1 = require("./api/listNotificationHubJobs.js");
const listRegistrationsByChannel_js_1 = require("./api/listRegistrationsByChannel.js");
const listRegistrationsByTag_js_1 = require("./api/listRegistrationsByTag.js");
const listRegistrations_js_1 = require("./api/listRegistrations.js");
const scheduleBroadcastNotification_js_1 = require("./api/scheduleBroadcastNotification.js");
const scheduleNotification_js_1 = require("./api/scheduleNotification.js");
const sendBroadcastNotification_js_1 = require("./api/sendBroadcastNotification.js");
const sendNotification_js_1 = require("./api/sendNotification.js");
const submitNotificationHubJob_js_1 = require("./api/submitNotificationHubJob.js");
const updateInstallation_js_1 = require("./api/updateInstallation.js");
const updateRegistration_js_1 = require("./api/updateRegistration.js");
/**
 * This represents a client for Azure Notification Hubs to manage installations and send
 * messages to devices.
 */
class NotificationHubsClient {
    /**
     * Creates a new instance of the NotificationClient with a connection string, hub name and options.
     * @param connectionString - The Notification Hub Access Policy connection string.
     * @param hubName - The name of the Azure Notification Hub.
     * @param options - Options for configuring the Azure Notification Hubs client.
     */
    constructor(connectionString, hubName, options = {}) {
        this._client = (0, clientContext_js_1.createClientContext)(connectionString, hubName, options);
    }
    /**
     * Creates or overwrites an installation to a Notification Hub.
     * @param installation - The installation to create or overwrite.
     * @param options - Configuration options for the create or update installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    createOrUpdateInstallation(installation, options = {}) {
        return (0, createOrUpdateInstallation_js_1.createOrUpdateInstallation)(this._client, installation, options);
    }
    /**
     * Deletes an installation from a Notification Hub.
     * @param installationId - The installation ID of the installation to delete.
     * @param options - Configuration options for the installation delete operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    deleteInstallation(installationId, options = {}) {
        return (0, deleteInstallation_js_1.deleteInstallation)(this._client, installationId, options);
    }
    /**
     * Gets an Azure Notification Hub installation by the installation ID.
     * @param installationId - The ID of the installation to get.
     * @param options - Configuration options for the get installation operation.
     * @returns The installation that matches the installation ID.
     */
    getInstallation(installationId, options = {}) {
        return (0, getInstallation_js_1.getInstallation)(this._client, installationId, options);
    }
    /**
     * Updates an installation using the JSON-Patch standard in RFC6902.
     * @param installationId - The ID of the installation to update.
     * @param patches - An array of patches following the JSON-Patch standard.
     * @param options - Configuration options for the patch installation operation.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    updateInstallation(installationId, patches, options = {}) {
        return (0, updateInstallation_js_1.updateInstallation)(this._client, installationId, patches, options);
    }
    /**
     * Creates a new registration ID.
     * @param options - The options for creating a new registration ID.
     * @returns The newly created registration ID.
     */
    createRegistrationId(options = {}) {
        return (0, createRegistrationId_js_1.createRegistrationId)(this._client, options);
    }
    /**
     * Creates a new registration. This method generates a registration ID,
     * which you can subsequently use to retrieve, update, and delete this registration.
     * @param registration - The registration to create.
     * @param options - Options for creating a new registration.
     * @returns The newly created registration description.
     */
    createRegistration(registration, options = {}) {
        return (0, createRegistration_js_1.createRegistration)(this._client, registration, options);
    }
    /**
     * Creates or updates a registration.
     * @param registration - The registration to create or update.
     * @param options - The operation options.
     * @returns The created or updated registration description.
     */
    createOrUpdateRegistration(registration, options = {}) {
        return (0, createOrUpdateRegistration_js_1.createOrUpdateRegistration)(this._client, registration, options);
    }
    /**
     * Updates an existing registration.
     * @param registration - The registration to update.
     * @param options - The operation options.
     * @returns The updated registration description.
     */
    updateRegistration(registration, options = {}) {
        return (0, updateRegistration_js_1.updateRegistration)(this._client, registration, options);
    }
    /**
     * Deletes a registration with the given registration ID.
     * @param context - The Notification Hubs client.
     * @param registrationId - The registration ID of the registration to delete.
     * @param options - The options for delete operations including the ETag
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    deleteRegistration(registrationId, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return (0, deleteRegistration_js_1.deleteRegistration)(this._client, registrationId, options);
    }
    /**
     * Gets a registration by the given registration ID.
     * @param registrationId - The ID of the registration to get.
     * @param options - The options for getting a registration by ID.
     * @returns A RegistrationDescription that has the given registration ID.
     */
    getRegistration(registrationId, options = {}) {
        return (0, getRegistration_js_1.getRegistration)(this._client, registrationId, options);
    }
    /**
     * Gets all registrations for the notification hub with the given query options.
     * @param options - The options for querying the registrations such as $top.
     * @returns A paged async iterable containing all of the registrations for the notification hub.
     */
    listRegistrations(
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return (0, listRegistrations_js_1.listRegistrations)(this._client, options);
    }
    /**
     * Gets all registrations for the notification hub with the given device information and options.
     * @param channel - The registration channel information to query per PNS type.
     * @param options - The options for querying the registrations such as $top.
     * @returns A paged async iterable containing all of the registrations for the notification hub.
     */
    listRegistrationsByChannel(channel, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return (0, listRegistrationsByChannel_js_1.listRegistrationsByChannel)(this._client, channel, options);
    }
    /**
     * Lists all registrations with the matching tag.
     * @param tag - The tag to query for matching registrations.
     * @param options - The query options such as $top.
     * @returns A paged async iterable containing the matching registrations for the notification hub.
     */
    listRegistrationsByTag(tag, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return (0, listRegistrationsByTag_js_1.listRegistrationsByTag)(this._client, tag, options);
    }
    /**
     * Sends push notifications to devices all devices.
     * @param notification - The notification to send to all devices.
     * @param options - Options for the notification including whether to enable test send.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendBroadcastNotification(notification, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return (0, sendBroadcastNotification_js_1.sendBroadcastNotification)(this._client, notification, options);
    }
    /**
     * Sends push notifications to devices that match the given tags or tag expression.
     * @param notification - The notification to send to the matching devices.
     * @param options - Options for the notification including tags, device handles and whether to enable test send.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    sendNotification(notification, options) {
        return (0, sendNotification_js_1.sendNotification)(this._client, notification, options);
    }
    /**
     * Schedules a push notification to all devices at the specified time.
     * NOTE: This is only available in Standard SKU Azure Notification Hubs.
     * @param scheduledTime - The Date to send the push notification.
     * @param notification - The notification to send to the matching devices.
     * @param options - The operation options.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    scheduleBroadcastNotification(scheduledTime, notification, options = {}) {
        return (0, scheduleBroadcastNotification_js_1.scheduleBroadcastNotification)(this._client, scheduledTime, notification, options);
    }
    /**
     * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
     * NOTE: This is only available in Standard SKU Azure Notification Hubs.
     * @param scheduledTime - The Date to send the push notification.
     * @param notification - The notification to send to the matching devices.
     * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
     * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
     */
    scheduleNotification(scheduledTime, notification, options) {
        return (0, scheduleNotification_js_1.scheduleNotification)(this._client, scheduledTime, notification, options);
    }
    /**
     * Cancels the scheduled notification with the given notification ID.
     * @param notificationId - The notification ID from the scheduled notification.
     * @param options - The operation options.
     * @returns A notification hub response with correlation ID and tracking ID.
     */
    cancelScheduledNotification(notificationId, options = {}) {
        return (0, cancelScheduledNotification_js_1.cancelScheduledNotification)(this._client, notificationId, options);
    }
    /**
     * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
     * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
     * @param options - The options for getting the push notification feedback container URL.
     * @returns The URL of the Azure Storage Container containing the feedback data.
     */
    getFeedbackContainerUrl(options = {}) {
        return (0, getFeedbackContainerUrl_js_1.getFeedbackContainerUrl)(this._client, options);
    }
    /**
     * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
     * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
     * @param notificationId - The notification ID returned from the send operation.
     * @param options - The operation options.
     * @returns The results of the send operation.
     */
    getNotificationOutcomeDetails(notificationId, options = {}) {
        return (0, getNotificationOutcomeDetails_js_1.getNotificationOutcomeDetails)(this._client, notificationId, options);
    }
    /**
     * Gets a Notification Hub Job by the ID.
     * @param jobId - The Notification Hub Job ID.
     * @param options - The operation options.
     * @returns The Notification Hub Job with the matching ID.
     */
    getNotificationHubJob(jobId, options = {}) {
        return (0, getNotificationHubJob_js_1.getNotificationHubJob)(this._client, jobId, options);
    }
    /**
     * Submits a Notification Hub job and creates a poller to poll for results.
     * @param notificationHubJob - The Notification Hub import/export job to start.
     * @param options - The operation options.
     * @returns A poller which can be called to poll until completion of the job.
     */
    beginSubmitNotificationHubJob(notificationHubJob, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        return (0, beginSubmitNotificationHubJob_js_1.beginSubmitNotificationHubJob)(this._client, notificationHubJob, options);
    }
    /**
     * Submits a Notification Hub Job.  Note this is available to Standard SKU namespace and above.
     * @param job - The notification hub job to submit.
     * @param options - The operation options.
     * @returns The notification hub job details including job ID and status.
     */
    submitNotificationHubJob(job, options = {}) {
        return (0, submitNotificationHubJob_js_1.submitNotificationHubJob)(this._client, job, options);
    }
    /**
     * Gets all Notification Hub Jobs for this Notification Hub.
     * @param options - The operation options.
     * @returns An array of all Notification Hub Jobs for this Notification Hub.
     */
    listNotificationHubJobs(options = {}) {
        return (0, listNotificationHubJobs_js_1.listNotificationHubJobs)(this._client, options);
    }
}
exports.NotificationHubsClient = NotificationHubsClient;
//# sourceMappingURL=notificationHubsClient.js.map