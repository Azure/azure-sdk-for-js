// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConsolePatchParameters } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConsolesListByVirtualMachineOptionalParams extends OperationOptions {
  /** The maximum number of resources to return from the operation. Example: '$top=10'. */
  top?: number;
  /** The opaque token that the server returns to indicate where to continue listing resources from. This is used for paging through large result sets. */
  skipToken?: string;
}

/** Optional parameters. */
export interface ConsolesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ConsolesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
  /** The request body. */
  consoleUpdateParameters?: ConsolePatchParameters;
}

/** Optional parameters. */
export interface ConsolesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes. */
  ifMatch?: string;
  /** Set to '*' to allow a new record set to be created, but to prevent updating an existing resource. Other values will result in error from server as they are not supported. */
  ifNoneMatch?: string;
}

/** Optional parameters. */
export interface ConsolesGetOptionalParams extends OperationOptions {}
