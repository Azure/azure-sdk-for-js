// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LinkNotificationHubParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CommunicationServicesCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunicationServicesRegenerateKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunicationServicesListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunicationServicesLinkNotificationHubOptionalParams extends OperationOptions {
  /** Parameters supplied to the operation. */
  linkNotificationHubParameters?: LinkNotificationHubParameters;
}

/** Optional parameters. */
export interface CommunicationServicesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunicationServicesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunicationServicesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommunicationServicesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunicationServicesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommunicationServicesGetOptionalParams extends OperationOptions {}
