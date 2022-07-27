// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, OperationOptions } from "@azure/core-client";

/**
 * Describes the options that can be provided while creating the NotificationHubsClientContext.
 */
export interface NotificationHubsClientOptions extends CommonClientOptions {}

/**
 * Represents the send operation options that can be set.
 */
export interface SendOperationOptions extends OperationOptions {
  /**
   * Set to true to enable test send.
   */
  enableTestSend?: boolean;
}

/**
 * Represents entity update operation options that can be set.
 */
export interface EntityOperationOptions extends OperationOptions {
  /**
   * ETag as returned by creation, update, and retrieval, or ‘*’ (overwrite).
   */
  etag?: string;
}

/**
 * Represents query options to include $top support.
 */
export interface RegistrationQueryLimitOptions extends OperationOptions {
  /**
   * The $top query member to get a number of records.
   */
  top?: number;
}

/**
 * Represents query options to include both $top and $filter.
 */
export interface RegistrationQueryOptions extends RegistrationQueryLimitOptions {
  /**
   * The OData $filter operator query string.
   */
  filter?: string;
}
