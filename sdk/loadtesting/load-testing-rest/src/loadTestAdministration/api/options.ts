// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileType, TriggerState } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GenerateTestPlanRecommendationsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CloneTestOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Display Name override for the newly created test. */
  displayName?: string;
  /** Description override for the newly created test. */
  description?: string;
}

/** Optional parameters. */
export interface ListNotificationRuleOptionalParams extends OperationOptions {
  /** Search based on notification rules associated with the provided test ids. */
  testIds?: string;
  /** Search based on notification rules for the provided scopes. */
  scopes?: string;
  /** Start DateTime(RFC 3339 literal format) of the last updated time range to filter notification rules. */
  lastModifiedStartTime?: Date;
  /** End DateTime(RFC 3339 literal format) of the last updated time range to filter notification rules. */
  lastModifiedEndTime?: Date;
  /** Number of results in response. Default page size is 50. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetNotificationRuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteNotificationRuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateNotificationRuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListTriggerOptionalParams extends OperationOptions {
  /** Search based on triggers associated with the provided test ids. */
  testIds?: string;
  /** Filter triggers based on a comma separated list of states. */
  states?: TriggerState;
  /** Start DateTime(RFC 3339 literal format) of the last updated time range to filter triggers. */
  lastModifiedStartTime?: Date;
  /** End DateTime(RFC 3339 literal format) of the last updated time range to filter triggers. */
  lastModifiedEndTime?: Date;
  /** Number of results in response. Default page size is 50. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface GetTriggerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteTriggerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateTriggerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteTestOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteTestFileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UploadTestFileOptionalParams extends OperationOptions {
  /** File type */
  fileType?: FileType;
}

/** Optional parameters. */
export interface ListTestsOptionalParams extends OperationOptions {
  /**
   * Sort on the supported fields in (field asc/desc) format. eg:
   * lastModifiedDateTime asc. Supported fields - lastModifiedDateTime
   */
  orderby?: string;
  /**
   * Prefix based, case sensitive search on searchable fields - displayName,
   * createdBy. For example, to search for a test, with display name is Login Test,
   * the search parameter can be Login.
   */
  search?: string;
  /** Start DateTime(RFC 3339 literal format) of the last updated time range to filter tests. */
  lastModifiedStartTime?: Date;
  /** End DateTime(RFC 3339 literal format) of the last updated time range to filter tests. */
  lastModifiedEndTime?: Date;
  /** Number of results in response. */
  maxpagesize?: number;
}

/** Optional parameters. */
export interface ListTestFilesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetTestFileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetTestOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetServerMetricsConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetAppComponentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateServerMetricsConfigOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateAppComponentsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CreateOrUpdateTestOptionalParams extends OperationOptions {}
