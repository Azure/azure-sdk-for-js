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
}

export interface InternalBatchClientOptions extends TableServiceClientOptions {
  innerBatchRequest?: InnerBatchRequest;
}
