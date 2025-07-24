// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectorResource } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectorListOptionalParams extends OperationOptions {
  /** Pagination size */
  pageSize?: number;
  /** An opaque pagination token to fetch the next set of records */
  pageToken?: string;
}

/** Optional parameters. */
export interface ConnectorDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface ConnectorCreateOrUpdateOptionalParams extends OperationOptions {
  /** Confluent Connector resource model */
  body?: ConnectorResource;
}

/** Optional parameters. */
export interface ConnectorGetOptionalParams extends OperationOptions {}
