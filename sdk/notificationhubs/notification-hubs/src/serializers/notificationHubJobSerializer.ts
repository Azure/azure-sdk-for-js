// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getDateOrUndefined, getInteger, getString, getStringOrUndefined } from "../utils/xmlUtils";

export enum NotificationHubJobType {
  /**
   * Job type to bulk get registrations.
   */
  ExportRegistrations = 0,

  /**
   * Job type to bulk create registrations.
   */
  ImportCreateRegistrations = 1,

  /**
   * Job type to bulk update registrations.
   */
  ImportUpdateRegistrations = 2,

  /**
   * Job type to bulk delete registrations.
   */
  ImportDeleteRegistrations = 3,

  /**
   * Job type to bulk upsert registrations.
   */
  ImportUpsertRegistrations = 4
}

export enum NotificationHubJobStatus {
  /**
   * Indicates that the NotificationHubJob was accepted.
   */
  Started = 0,

  /**
   * Indicates that the NotificationHubJob is currently running. Depending on the amount of data, 
   * a job may stay in this state for several hours.
   */
  Running = 1,

  /**
   * Indicates that the NotificationHubJob was completed successfully. Any output
   * will be ready where configured via the NotificationHubJob object.
  */
  Completed = 2,

  /**
   * Indicates that the NotificationHubJob has failed.
  */
  Failed = 3
}

/**
 * Represents a Notification Hub Job.
 */
export interface NotificationHubJob {
  /**
   * The unique job identifier.
   */
  jobId: string;

  /**
   * The output file name.
   */
  outputFileName?: string;

  /**
   * The file name for the job failures.
   */
  failuresFileName?: string;

  /**
   * The progress for the job.
   */
  progress?: number;

  /**
   * The type of job.
   */
  jobType: NotificationHubJobType,

  /**
   * The status of the job.
   */
  status: NotificationHubJobStatus,

  /**
   * The output container URL.
   */
  outputContainerUrl: string;

  /**
   * The import file URL.
   */
  importFileUrl?: string;

  /**
   * The input properties for the notification hub job.
   */
  inputProperties?: Record<string, string>;

  /**
   * Gets the notification hub job failure message.
   */
  failure?: string;

  /**
   * The output properties for the notification hub job.
   */
  outputProperties?: Record<string, string>;

  /**
   * Notification hub job created date.
   */
  createdAt?: Date;

  /**
   * Notification hub job last updated date.
   */
  updatedAt?: Date;
}

export function createNotificationHubJob(rawNotificationHubJob: Record<string, any>): NotificationHubJob {
  // TODO: Parse OutputProperties/InputProperties

  return {
    jobId: getString(rawNotificationHubJob["JobId"], "jobId"),
    jobType: getInteger(rawNotificationHubJob["JobType"], "jobType") as NotificationHubJobType,
    status: getInteger(rawNotificationHubJob["Status"], "status") as NotificationHubJobStatus,
    outputContainerUrl: getString(rawNotificationHubJob["OutputContainerUri"], "outputContainerUrl"),
    importFileUrl: getStringOrUndefined(rawNotificationHubJob["ImportFileUri"]),
    failure: getStringOrUndefined(rawNotificationHubJob["Failure"]),
    createdAt: getDateOrUndefined(rawNotificationHubJob["CreatedAt"]),
    updatedAt: getDateOrUndefined(rawNotificationHubJob["UpdatedAt"]),
  };
}
