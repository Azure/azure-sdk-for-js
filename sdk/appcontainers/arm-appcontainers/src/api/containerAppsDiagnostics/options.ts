// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ContainerAppsDiagnosticsGetDetectorOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsDiagnosticsListDetectorsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsDiagnosticsGetRootOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ContainerAppsDiagnosticsListRevisionsOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. */
  filter?: string;
}

/** Optional parameters. */
export interface ContainerAppsDiagnosticsGetRevisionOptionalParams extends OperationOptions {}
