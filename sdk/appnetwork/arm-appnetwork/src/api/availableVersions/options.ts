// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AvailableVersionsListByLocationOptionalParams extends OperationOptions {
  /** Kubernetes version to filter profiles */
  kubernetesVersion?: string;
}
