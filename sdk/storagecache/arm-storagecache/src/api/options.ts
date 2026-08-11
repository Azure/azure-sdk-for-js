// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AmlFilesystemSubnetInfo,
  RequiredAmlFilesystemSubnetsSizeInfo,
} from "../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GetRequiredAmlFSSubnetsSizeOptionalParams extends OperationOptions {
  /** The request body */
  requiredAMLFilesystemSubnetsSizeInfo?: RequiredAmlFilesystemSubnetsSizeInfo;
}

/** Optional parameters. */
export interface CheckAmlFSSubnetsOptionalParams extends OperationOptions {
  /** The request body */
  amlFilesystemSubnetInfo?: AmlFilesystemSubnetInfo;
}
