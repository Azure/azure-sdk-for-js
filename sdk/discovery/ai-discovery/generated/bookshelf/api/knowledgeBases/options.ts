// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface KnowledgeBasesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface KnowledgeBasesSearchOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** An opaque, globally-unique, client-generated string identifier for request repeatability. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface KnowledgeBasesCancelIndexingOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface KnowledgeBasesStartIndexingOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Node pool ID */
  nodePoolId?: string;
  /** Project ID */
  projectId?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  repeatabilityRequestId?: string;
  /** Specifies the date and time at which the request was first created. */
  repeatabilityFirstSent?: Date;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
/** Optional parameters. */
export interface KnowledgeBasesGetOperationStatusOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface KnowledgeBasesListOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface KnowledgeBasesGetOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface KnowledgeBasesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
