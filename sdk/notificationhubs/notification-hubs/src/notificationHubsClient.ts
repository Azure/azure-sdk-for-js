// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DirectSendNotificationOptions,
  EntityOperationOptions,
  NotificationHubsClientOptions,
  PolledOperationOptions,
  RegistrationQueryLimitOptions,
  ScheduleNotificationOptions,
  SendNotificationOptions,
} from "./models/options.js";
import { Installation, JsonPatch } from "./models/installation.js";
import {
  NotificationDetails,
  NotificationHubsMessageResponse,
  NotificationHubsResponse,
} from "./models/notificationDetails.js";
import { NotificationHubJob, NotificationHubJobPoller } from "./models/notificationHubJob.js";
import { NotificationHubsClientContext, createClientContext } from "./api/clientContext.js";
import { RegistrationDescription, RegistrationChannel } from "./models/registration.js";
import { Notification } from "./models/notification.js";
import { OperationOptions } from "@azure-rest/core-client";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { beginSubmitNotificationHubJob as beginSubmitNotificationHubJobMethod } from "./api/beginSubmitNotificationHubJob.js";
import { cancelScheduledNotification as cancelScheduledNotificationMethod } from "./api/cancelScheduledNotification.js";
import { createOrUpdateInstallation as createOrUpdateInstallationMethod } from "./api/createOrUpdateInstallation.js";
import { createOrUpdateRegistration as createOrUpdateRegistrationMethod } from "./api/createOrUpdateRegistration.js";
import { createRegistrationId as createRegistrationIdMethod } from "./api/createRegistrationId.js";
import { createRegistration as createRegistrationMethod } from "./api/createRegistration.js";
import { deleteInstallation as deleteInstallationMethod } from "./api/deleteInstallation.js";
import { deleteRegistration } from "./api/deleteRegistration.js";
import { getFeedbackContainerUrl as getFeedbackContainerUrlMethod } from "./api/getFeedbackContainerUrl.js";
import { getInstallation as getInstallationMethod } from "./api/getInstallation.js";
import { getNotificationHubJob as getNotificationHubJobMethod } from "./api/getNotificationHubJob.js";
import { getNotificationOutcomeDetails as getNotificationOutcomeDetailsMethod } from "./api/getNotificationOutcomeDetails.js";
import { getRegistration as getRegistrationMethod } from "./api/getRegistration.js";
import { listNotificationHubJobs as listNotificationHubJobsMethod } from "./api/listNotificationHubJobs.js";
import { listRegistrationsByChannel as listRegistrationsByChannelMethod } from "./api/listRegistrationsByChannel.js";
import { listRegistrationsByTag as listRegistrationsByTagMethod } from "./api/listRegistrationsByTag.js";
import { listRegistrations as listRegistrationsMethod } from "./api/listRegistrations.js";
import { scheduleNotification as scheduleNotificationMethod } from "./api/scheduleNotification.js";
import { sendNotification as sendNotificationMethod } from "./api/sendNotification.js";
import { submitNotificationHubJob as submitNotificationHubJobMethod } from "./api/submitNotificationHubJob.js";
import { updateInstallation as updateInstallationMethod } from "./api/updateInstallation.js";
import { updateRegistration as updateRegistrationMethod } from "./api/updateRegistration.js";

/**
 * This represents a client for Azure Notification Hubs to manage installations and send
 * messages to devices.
 */
export class NotificationHubsClient {
  private _client: NotificationHubsClientContext;

  /**
   * Creates a new instance of the NotificationClient with a connection string, hub name and options.
   * @param connectionString - The Notification Hub Access Policy connection string.
   * @param hubName - The name of the Azure Notification Hub.
   * @param options - Options for configuring the Azure Notification Hubs client.
   */
  constructor(
    connectionString: string,
    hubName: string,
    options: NotificationHubsClientOptions = {},
  ) {
    this._client = createClientContext(connectionString, hubName, options);
  }

  /**
   * Creates or overwrites an installation to a Notification Hub.
   * @param installation - The installation to create or overwrite.
   * @param options - Configuration options for the create or update installation operation.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  createOrUpdateInstallation(
    installation: Installation,
    options: OperationOptions = {},
  ): Promise<NotificationHubsResponse> {
    return createOrUpdateInstallationMethod(this._client, installation, options);
  }

  /**
   * Deletes an installation from a Notification Hub.
   * @param installationId - The installation ID of the installation to delete.
   * @param options - Configuration options for the installation delete operation.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  deleteInstallation(
    installationId: string,
    options: OperationOptions = {},
  ): Promise<NotificationHubsResponse> {
    return deleteInstallationMethod(this._client, installationId, options);
  }

  /**
   * Gets an Azure Notification Hub installation by the installation ID.
   * @param installationId - The ID of the installation to get.
   * @param options - Configuration options for the get installation operation.
   * @returns The installation that matches the installation ID.
   */
  getInstallation(installationId: string, options: OperationOptions = {}): Promise<Installation> {
    return getInstallationMethod(this._client, installationId, options);
  }

  /**
   * Updates an installation using the JSON-Patch standard in RFC6902.
   * @param installationId - The ID of the installation to update.
   * @param patches - An array of patches following the JSON-Patch standard.
   * @param options - Configuration options for the patch installation operation.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  updateInstallation(
    installationId: string,
    patches: JsonPatch[],
    options: OperationOptions = {},
  ): Promise<NotificationHubsResponse> {
    return updateInstallationMethod(this._client, installationId, patches, options);
  }

  /**
   * Creates a new registration ID.
   * @param options - The options for creating a new registration ID.
   * @returns The newly created registration ID.
   */
  createRegistrationId(options: OperationOptions = {}): Promise<string> {
    return createRegistrationIdMethod(this._client, options);
  }

  /**
   * Creates a new registration. This method generates a registration ID,
   * which you can subsequently use to retrieve, update, and delete this registration.
   * @param registration - The registration to create.
   * @param options - Options for creating a new registration.
   * @returns The newly created registration description.
   */
  createRegistration(
    registration: RegistrationDescription,
    options: OperationOptions = {},
  ): Promise<RegistrationDescription> {
    return createRegistrationMethod(this._client, registration, options);
  }

  /**
   * Creates or updates a registration.
   * @param registration - The registration to create or update.
   * @param options - The operation options.
   * @returns The created or updated registration description.
   */
  createOrUpdateRegistration(
    registration: RegistrationDescription,
    options: OperationOptions = {},
  ): Promise<RegistrationDescription> {
    return createOrUpdateRegistrationMethod(this._client, registration, options);
  }

  /**
   * Updates an existing registration.
   * @param registration - The registration to update.
   * @param options - The operation options.
   * @returns The updated registration description.
   */
  updateRegistration(
    registration: RegistrationDescription,
    options: OperationOptions = {},
  ): Promise<RegistrationDescription> {
    return updateRegistrationMethod(this._client, registration, options);
  }

  /**
   * Deletes a registration with the given registration ID.
   * @param context - The Notification Hubs client.
   * @param registrationId - The registration ID of the registration to delete.
   * @param options - The options for delete operations including the ETag
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  deleteRegistration(
    registrationId: string,
    options: EntityOperationOptions = {},
  ): Promise<NotificationHubsResponse> {
    return deleteRegistration(this._client, registrationId, options);
  }

  /**
   * Gets a registration by the given registration ID.
   * @param registrationId - The ID of the registration to get.
   * @param options - The options for getting a registration by ID.
   * @returns A RegistrationDescription that has the given registration ID.
   */
  getRegistration(
    registrationId: string,
    options: OperationOptions = {},
  ): Promise<RegistrationDescription> {
    return getRegistrationMethod(this._client, registrationId, options);
  }

  /**
   * Gets all registrations for the notification hub with the given query options.
   * @param options - The options for querying the registrations such as $top.
   * @returns A paged async iterable containing all of the registrations for the notification hub.
   */
  listRegistrations(
    options: RegistrationQueryLimitOptions = {},
  ): PagedAsyncIterableIterator<RegistrationDescription> {
    return listRegistrationsMethod(this._client, options);
  }

  /**
   * Gets all registrations for the notification hub with the given device information and options.
   * @param channel - The registration channel information to query per PNS type.
   * @param options - The options for querying the registrations such as $top.
   * @returns A paged async iterable containing all of the registrations for the notification hub.
   */
  listRegistrationsByChannel(
    channel: RegistrationChannel,
    options: RegistrationQueryLimitOptions = {},
  ): PagedAsyncIterableIterator<RegistrationDescription> {
    return listRegistrationsByChannelMethod(this._client, channel, options);
  }

  /**
   * Lists all registrations with the matching tag.
   * @param tag - The tag to query for matching registrations.
   * @param options - The query options such as $top.
   * @returns A paged async iterable containing the matching registrations for the notification hub.
   */
  listRegistrationsByTag(
    tag: string,
    options: RegistrationQueryLimitOptions = {},
  ): PagedAsyncIterableIterator<RegistrationDescription> {
    return listRegistrationsByTagMethod(this._client, tag, options);
  }

  /**
   * Sends push notifications to devices that match the given tags or tag expression.
   * @param notification - The notification to send to the matching devices.
   * @param options - Options for the notification including tags, device handles and whether to enable test send.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  sendNotification(
    notification: Notification,
    options: DirectSendNotificationOptions | SendNotificationOptions = { enableTestSend: false },
  ): Promise<NotificationHubsMessageResponse> {
    return sendNotificationMethod(this._client, notification, options);
  }

  /**
   * Schedules a push notification to devices that match the given tags or tag expression at the specified time.
   * NOTE: This is only available in Standard SKU Azure Notification Hubs.
   * @param scheduledTime - The Date to send the push notification.
   * @param notification - The notification to send to the matching devices.
   * @param options - Options which include tags used to target the device for push notifications in either an array or tag expression.
   * @returns A NotificationHubResponse with the tracking ID, correlation ID and location.
   */
  scheduleNotification(
    scheduledTime: Date,
    notification: Notification,
    options: ScheduleNotificationOptions = {},
  ): Promise<NotificationHubsMessageResponse> {
    return scheduleNotificationMethod(this._client, scheduledTime, notification, options);
  }

  /**
   * Cancels the scheduled notification with the given notification ID.
   * @param notificationId - The notification ID from the scheduled notification.
   * @param options - The operation options.
   * @returns A notification hub response with correlation ID and tracking ID.
   */
  cancelScheduledNotification(
    notificationId: string,
    options: OperationOptions = {},
  ): Promise<NotificationHubsResponse> {
    return cancelScheduledNotificationMethod(this._client, notificationId, options);
  }

  /**
   * Retrieves an Azure Storage container URL. The container has feedback data for the notification hub.
   * The caller can then use the Azure Storage Services SDK to retrieve the contents of the container.
   * @param options - The options for getting the push notification feedback container URL.
   * @returns The URL of the Azure Storage Container containing the feedback data.
   */
  getFeedbackContainerUrl(options: OperationOptions = {}): Promise<string> {
    return getFeedbackContainerUrlMethod(this._client, options);
  }

  /**
   * Retrieves the results of a send operation. This can retrieve intermediate results if the send is being processed
   * or final results if the Send* has completed. This API can only be called for Standard SKU and above.
   * @param notificationId - The notification ID returned from the send operation.
   * @param options - The operation options.
   * @returns The results of the send operation.
   */
  getNotificationOutcomeDetails(
    notificationId: string,
    options: OperationOptions = {},
  ): Promise<NotificationDetails> {
    return getNotificationOutcomeDetailsMethod(this._client, notificationId, options);
  }

  /**
   * Gets a Notification Hub Job by the ID.
   * @param jobId - The Notification Hub Job ID.
   * @param options - The operation options.
   * @returns The Notification Hub Job with the matching ID.
   */
  getNotificationHubJob(
    jobId: string,
    options: OperationOptions = {},
  ): Promise<NotificationHubJob> {
    return getNotificationHubJobMethod(this._client, jobId, options);
  }

  /**
   * Submits a Notification Hub job and creates a poller to poll for results.
   * @param notificationHubJob - The Notification Hub import/export job to start.
   * @param options - The operation options.
   * @returns A poller which can be called to poll until completion of the job.
   */
  beginSubmitNotificationHubJob(
    notificationHubJob: NotificationHubJob,
    options: PolledOperationOptions = {},
  ): Promise<NotificationHubJobPoller> {
    return beginSubmitNotificationHubJobMethod(this._client, notificationHubJob, options);
  }

  /**
   * Submits a Notification Hub Job.  Note this is available to Standard SKU namespace and above.
   * @param job - The notification hub job to submit.
   * @param options - The operation options.
   * @returns The notification hub job details including job ID and status.
   */
  submitNotificationHubJob(
    job: NotificationHubJob,
    options: OperationOptions = {},
  ): Promise<NotificationHubJob> {
    return submitNotificationHubJobMethod(this._client, job, options);
  }

  /**
   * Gets all Notification Hub Jobs for this Notification Hub.
   * @param options - The operation options.
   * @returns An array of all Notification Hub Jobs for this Notification Hub.
   */
  listNotificationHubJobs(options: OperationOptions = {}): Promise<NotificationHubJob[]> {
    return listNotificationHubJobsMethod(this._client, options);
  }
}
