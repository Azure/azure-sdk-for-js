// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AnalyzeInput, ProcessingLocation, RecordMergePatchUpdate } from "../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UpdateDefaultsOptionalParams extends OperationOptions {
  /**
   * Dictionary of supported large language model (LLM) name (key) to your model deployment name in Microsoft Foundry (value). Both keys and values are strings.
   * Prebuilt and custom analyzers that use large language models require model deployment names in Microsoft Foundry for their supported models.
   * The mapping applies to all analyzers you intend to use: ensure each supported model for those analyzers is mapped. To get supported model names for a given analyzer, call Get Analyzer (GET /analyzers/{analyzerId}); the response includes supportedModels.
   * Deploy the required models in your Microsoft Foundry resource (portal or API); each deployment has a model name and a model deployment name.
   * Call Update Defaults (PATCH /defaults) with this dictionary to map each supported LLM name to your model deployment name in Microsoft Foundry.
   * To get more information for a quickstart for REST API, see https://aka.ms/cudoc-quickstart-rest.
   * Example: { "gpt-4.1": "myGpt41Deployment", "gpt-4.1-mini": "myGpt41MiniDeployment", "text-embedding-3-large": "myEmbeddingDeployment" }.
   */
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
  /** Request content type. */
  contentType?: string;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
}

/** Optional parameters. */
export interface AnalyzeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Inputs to analyze. Currently, only pro mode supports multiple inputs. */
  inputs?: AnalyzeInput[];
  /** Override default mapping of model names to deployments. Ex. { "gpt-4.1": "myGpt41Deployment" }. */
  modelDeployments?: Record<string, string>;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
}
