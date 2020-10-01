// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClientOptions } from "../models";
import { TablesSharedKeyCredential } from "../TablesSharedKeyCredential";
import { RequestPolicyFactory, WebResourceLike } from "@azure/core-http";

export interface ConnectionString {
  kind: "AccountConnString" | "SASConnString";
  url: string;
  accountName: string;
  accountKey?: any;
  accountSas?: string;
}

export interface ClientParamsFromConnectionString {
  url: string;
  options?: TableServiceClientOptions;
  credential?: TablesSharedKeyCredential;
}

/**
 * Batch request builder
 */
export interface InnerBatchRequest {
  /**
   * Batch request body
   */
  body: string[];
  /**
   * Total count of sub-operations to send
   */
  operationCount: number;
  /**
   * Creates a pipeline to intercept sub-requests and
   * build the request body
   */
  createPipeline(): RequestPolicyFactory[];
  /**
   * Adds an operation to add to the batch body
   * @param request the operation to add
   */
  appendSubRequestToBody(request: WebResourceLike): void;
  /**
   * Gets the batch request body
   */
  getHttpRequestBody(): string;
  /**
   * Gets the content-type
   */
  getMultipartContentType(): string;
  /**
   * Gets the batch operation boundary
   */
  getBatchBoundary(): string;
}

export interface InternalBatchClientOptions extends TableServiceClientOptions {
  innerBatchRequest?: InnerBatchRequest;
}
