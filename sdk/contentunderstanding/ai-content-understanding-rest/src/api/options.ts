// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AnalyzeInput, ProcessingLocation } from "../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UpdateDefaultsOptionalParams extends OperationOptions {
  /**
   * Mapping of model names to deployments.
   * Ex. { "gpt-4.1": "myGpt41Deployment", "text-embedding-3-large": "myTextEmbedding3LargeDeployment" }.
   */
  modelDeployments?: Record<string, string>;
}

/** Optional parameters. */
export interface UpdateAnalyzerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ListAnalyzersOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GrantCopyAuthorizationOptionalParams extends OperationOptions {
  /** Azure region of the target analyzer location.  Defaults to current region. */
  targetRegion?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface GetResultFileOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetOperationStatusOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetDefaultsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetAnalyzerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface DeleteResultOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeleteAnalyzerOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CreateAnalyzerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Allow the operation to replace an existing resource. */
  allowReplace?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface CopyAnalyzerOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Azure resource ID of the source analyzer location.  Defaults to the current resource. */
  sourceAzureResourceId?: string;
  /** Azure region of the source analyzer location.  Defaults to current region. */
  sourceRegion?: string;
  /** Allow the operation to replace an existing resource. */
  allowReplace?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface AnalyzeBinaryOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   *   The string encoding format for content spans in the response.
   *   Possible values are 'codePoint', 'utf16', and `utf8`.  Default is `codePoint`.")
   */
  stringEncoding?: string;
  /** The location where the data may be processed.  Defaults to global. */
  processingLocation?: ProcessingLocation;
  /** Range of the input to analyze (ex. `1-3,5,9-`).  Document content uses 1-based page numbers, while audio visual content uses integer milliseconds. */
  inputRange?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface AnalyzeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   *   The string encoding format for content spans in the response.
   *   Possible values are 'codePoint', 'utf16', and `utf8`.  Default is `codePoint`.")
   */
  stringEncoding?: string;
  /** The location where the data may be processed.  Defaults to global. */
  processingLocation?: ProcessingLocation;
  /** Inputs to analyze.  Currently, only pro mode supports multiple inputs. */
  inputs?: AnalyzeInput[];
  /**
   * Override default mapping of model names to deployments.
   * Ex. { "gpt-4.1": "myGpt41Deployment", "text-embedding-3-large": "myTextEmbedding3LargeDeployment" }.
   */
  modelDeployments?: Record<string, string>;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
