// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, PipelineRequest, RawHttpHeaders } from "@azure/core-rest-pipeline";

/**
 * General options that a Rest Level Client can take
 */
export type ClientOptions = PipelineOptions & {
  /**
   * Credentials information
   */
  credentials?: {
    /**
     * Authentication scopes for AAD
     */
    scopes?: string[];
    /**
     * Heder name for Client Secret authentication
     */
    apiKeyHeaderName?: string;
  };
  /**
   * Base url for the client
   */
  baseUrl?: string;
  /**
   * Options for setting a custom apiVersion.
   */
  apiVersion?: string;
  /**
   * Option to allow calling http (insecure) endpoints
   */
  allowInsecureConnection?: boolean;
};

/**
 * Represents the shape of an HttpResponse
 */
export type HttpResponse = {
  /**
   * The request that generated this response.
   */
  request: PipelineRequest;
  /**
   * The HTTP response headers.
   */
  headers: RawHttpHeaders;
  /**
   * Parsed body
   */
  body: unknown;
  /**
   * The HTTP status code of the response.
   */
  status: string;
};
