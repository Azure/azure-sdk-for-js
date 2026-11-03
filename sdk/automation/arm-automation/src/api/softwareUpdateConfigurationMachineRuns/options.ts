// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SoftwareUpdateConfigurationMachineRunsListOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
  /** The filter to apply on the operation. You can use the following filters: 'properties/osType', 'properties/status', 'properties/startTime', and 'properties/softwareUpdateConfiguration/name' */
  filter?: string;
  /** number of entries you skip before returning results */
  skip?: string;
  /** Maximum number of entries returned in the results collection */
  top?: string;
}

/** Optional parameters. */
export interface SoftwareUpdateConfigurationMachineRunsGetByIdOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}
