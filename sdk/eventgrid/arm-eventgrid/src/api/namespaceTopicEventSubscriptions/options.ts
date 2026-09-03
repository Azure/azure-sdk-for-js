// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NamespaceTopicEventSubscriptionsGetFullUrlOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespaceTopicEventSubscriptionsGetDeliveryAttributesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NamespaceTopicEventSubscriptionsListByNamespaceTopicOptionalParams extends OperationOptions {
  /** The query used to filter the search results using OData syntax. Filtering is permitted on the 'name' property only and with limited number of OData operations. These operations are: the 'contains' function as well as the following logical operations: not, and, or, eq (for equal), and ne (for not equal). No arithmetic operations are supported. The following is a valid filter example: $filter=contains(namE, 'PATTERN') and name ne 'PATTERN-1'. The following is not a valid filter example: $filter=location eq 'westus'. */
  filter?: string;
  /** The number of results to return per page for the list operation. Valid range for top parameter is 1 to 100. If not specified, the default number of results to be returned is 20 items per page. */
  top?: number;
}

/** Optional parameters. */
export interface NamespaceTopicEventSubscriptionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NamespaceTopicEventSubscriptionsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NamespaceTopicEventSubscriptionsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface NamespaceTopicEventSubscriptionsGetOptionalParams extends OperationOptions {}
