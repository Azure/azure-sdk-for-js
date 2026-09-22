// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CertificateOrdersDiagnosticsListAppServiceCertificateOrderDetectorResponseOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CertificateOrdersDiagnosticsGetAppServiceCertificateOrderDetectorResponseOptionalParams extends OperationOptions {
  /** The start time for detector response. */
  startTime?: Date;
  /** The end time for the detector response. */
  endTime?: Date;
  /** The time grain for the detector response. */
  timeGrain?: string;
}
