// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ExtensionTypesListClusterListVersionsOptionalParams extends OperationOptions {
  /** Filter results by release train (default value is stable) */
  releaseTrain?: string;
  /** Filter results by the major version of an extension type */
  majorVersion?: string;
  /** Filter results by only the latest version (based on other query parameters) */
  showLatest?: boolean;
}

/** Optional parameters. */
export interface ExtensionTypesClusterGetVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionTypesListVersionsOptionalParams extends OperationOptions {
  /** Filter results by release train (default value is stable) */
  releaseTrain?: string;
  /** Filter results by the cluster type for extension types */
  clusterType?: string;
  /** Filter results by the major version of an extension type */
  majorVersion?: string;
  /** Filter results by only the latest version (based on other query parameters) */
  showLatest?: boolean;
}

/** Optional parameters. */
export interface ExtensionTypesGetVersionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionTypesListOptionalParams extends OperationOptions {
  /** Filter results by Publisher ID of a marketplace extension type */
  publisherId?: string;
  /** Filter results by Offer or Product ID of a marketplace extension type */
  offerId?: string;
  /** Filter results by Plan ID of a marketplace extension type */
  planId?: string;
  /** Filter results by release train (default value is stable) */
  releaseTrain?: string;
}

/** Optional parameters. */
export interface ExtensionTypesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ExtensionTypesListLocationListOptionalParams extends OperationOptions {
  /** Filter results by Publisher ID of a marketplace extension type */
  publisherId?: string;
  /** Filter results by Offer or Product ID of a marketplace extension type */
  offerId?: string;
  /** Filter results by Plan ID of a marketplace extension type */
  planId?: string;
  /** Filter results by release train (default value is stable) */
  releaseTrain?: string;
  /** Filter results by the cluster type for extension types */
  clusterType?: string;
}

/** Optional parameters. */
export interface ExtensionTypesLocationGetOptionalParams extends OperationOptions {}
