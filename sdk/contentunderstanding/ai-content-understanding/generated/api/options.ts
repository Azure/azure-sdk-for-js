// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProcessingLocation, RecordMergePatchUpdate } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UpdateDefaultsOptionalParams extends OperationOptions {
  /** Specify the default mapping of model names to LLM/embedding deployments in Microsoft Foundry. For details and current semantics, see https://aka.ms/cudoc-quickstart-rest. */
  modelDeployments?: RecordMergePatchUpdate;
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
  /** Range of the input to analyze (ex. `1-3,5,9-`). Document content uses 1-based page numbers, while audio visual content uses integer milliseconds. */
  range?: string;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
}

/** Optional parameters. */
export interface AnalyzeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Specify the default mapping of model names to LLM/embedding deployments in Microsoft Foundry. For details and current semantics, see https://aka.ms/cudoc-quickstart-rest. */
  modelDeployments?: Record<string, string>;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
}
