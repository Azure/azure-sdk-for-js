// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ListQueuesIncludeType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceGetQueuesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Filters the results to return only queues whose name begins with the specified prefix. */
  prefix?: string;
  /**
   * Identifies the portion of the list of queues to be returned with the next listing operation. The operation
   * returns the marker value if the listing operation did not return all queues remaining. The marker value can
   * be used as the value for the marker parameter in a subsequent call to request the next page of list items.
   * The marker value is opaque to the client.
   */
  marker?: string;
  /**
   * Specifies the maximum number of queues to return. If the request does not specify maxresults, or specifies
   * a value greater than 5000, the server will return up to 5000 items.
   */
  maxresults?: number;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
  /** Specify to include additional, optional information. */
  include?: ListQueuesIncludeType[];
}

/** Optional parameters. */
export interface ServiceGetUserDelegationKeyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface ServiceGetStatisticsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface ServiceGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface ServiceSetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}
