// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TopicRecord } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface TopicsListOptionalParams extends OperationOptions {
  /** Pagination size */
  pageSize?: number;
  /** An opaque pagination token to fetch the next set of records */
  pageToken?: string;
}

/** Optional parameters. */
export interface TopicsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface TopicsCreateOptionalParams extends OperationOptions {
  /** Confluent Topics resource model */
  body?: TopicRecord;
}

/** Optional parameters. */
export interface TopicsGetOptionalParams extends OperationOptions {}
