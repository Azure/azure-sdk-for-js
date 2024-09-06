// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationState, PollerLike } from "@azure/core-lro";

/**
 * Describes the types of notification hub jobs.
 */
export type NotificationHubJobType =
  /**
   * Job type to bulk get registrations.
   */
  | "ExportRegistrations"

  /**
   * Job type to bulk create registrations.
   */
  | "ImportCreateRegistrations"

  /**
   * Job type to bulk update registrations.
   */
  | "ImportUpdateRegistrations"

  /**
   * Job type to bulk delete registrations.
   */
  | "ImportDeleteRegistrations"

  /**
   * Job type to bulk upsert registrations.
   */
  | "ImportUpsertRegistrations";

/**
 * Describes the types of notification hub job statuses.
 */
export type NotificationHubJobStatus =
  /**
   * Indicates that the NotificationHubJob was accepted.
   */
  | "Started"

  /**
   * Indicates that the NotificationHubJob is currently running. Depending on the amount of data,
   * a job may stay in this state for several hours.
   */
  | "Running"

  /**
   * Indicates that the NotificationHubJob was completed successfully. Any output
   * will be ready where configured via the NotificationHubJob object.
   */
  | "Completed"

  /**
   * Indicates that the NotificationHubJob has failed.
   */
  | "Failed";

/**
 * Represents a Notification Hub Job.
 */
export interface NotificationHubJob {
  /**
   * The unique job identifier.
   */
  jobId?: string;

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
  type: NotificationHubJobType;

  /**
   * The status of the job.
   */
  status?: NotificationHubJobStatus;

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

/**
 * Describes a poller for NotificationHubJob types.
 */
export type NotificationHubJobPoller = PollerLike<
  OperationState<NotificationHubJob>,
  NotificationHubJob
>;
