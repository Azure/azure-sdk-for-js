// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SignedIdentifiers, QueueMessage } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface QueueDeleteMessageOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueUpdateMessageOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** Content-Type header */
  contentType?: "application/xml";
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
  /**
   * The queue message. The message must be in a format that can be included in
   * an XML request with UTF-8 encoding. The encoded message can be up to 64 KB in size.
   */
  queueMessage?: QueueMessage;
}

/** Optional parameters. */
export interface QueuePeekMessagesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * A nonzero integer value that specifies the number of messages to
   * retrieve from the queue, up to a maximum of 32. If fewer are visible, the
   * visible messages are returned. By default, a single message is retrieved from
   * the queue with this operation.
   */
  numberOfMessages?: number;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueSendMessageOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * Specifies the new visibility timeout value, in seconds, relative to server time. A specified value must be
   * larger than or equal to 1 second, and cannot be larger than 7 days. The visibility timeout of a message
   * can be set to a value later than the expiry time.
   */
  visibilityTimeout?: number;
  /**
   * Specifies the time-to-live interval for the message, in seconds.
   * Prior to version 2017-07-29, the maximum time-to-live allowed is 7 days. For
   * version 2017-07-29 or later, the maximum time-to-live can be any positive
   * number, as well as -1 indicating that the message does not expire. If this
   * parameter is omitted, the default time-to-live is 7 days.
   */
  messageTimeToLive?: number;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueClearOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueReceiveMessagesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * A nonzero integer value that specifies the number of messages to
   * retrieve from the queue, up to a maximum of 32. If fewer are visible, the
   * visible messages are returned. By default, a single message is retrieved from
   * the queue with this operation.
   */
  numberOfMessages?: number;
  /**
   * Specifies the new visibility timeout value, in seconds, relative to server time. A specified value must be
   * larger than or equal to 1 second, and cannot be larger than 7 days. The visibility timeout of a message
   * can be set to a value later than the expiry time.
   */
  visibilityTimeout?: number;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueSetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The media type of the request. */
  contentType?: "application/xml";
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
  /** The access control list. */
  queueAcl?: SignedIdentifiers;
}

/** Optional parameters. */
export interface QueueGetAccessPolicyOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueSetMetadataOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
  /** The metadata headers. */
  metadata?: string;
}

/** Optional parameters. */
export interface QueueDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueueCreateOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /**
   * The timeout parameter is expressed in seconds. For more information, see
   * <a href="https://learn.microsoft.com/en-us/rest/api/storageservices/setting-timeouts-for-queue-service-operations">Setting Timeouts for Queue Service Operations.</a>
   */
  timeoutInSeconds?: number;
  /** The metadata headers. */
  metadata?: string;
}
