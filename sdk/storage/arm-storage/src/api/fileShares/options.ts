// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LeaseShareRequest } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FileSharesListOptionalParams extends OperationOptions {
  /** Optional. Specified maximum number of shares that can be included in the list. */
  maxpagesize?: string;
  /** Optional. When specified, only share names starting with the filter will be listed. */
  filter?: string;
  /** Optional, used to expand the properties within share's properties. Valid values are: deleted, snapshots. Should be passed as a string with delimiter ',' */
  expand?: string;
}

/** Optional parameters. */
export interface FileSharesLeaseOptionalParams extends OperationOptions {
  /** Optional. Specify the snapshot time to lease a snapshot. */
  xMsSnapshot?: string;
  /** The content of the action request */
  parameters?: LeaseShareRequest;
}

/** Optional parameters. */
export interface FileSharesRestoreOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileSharesDeleteOptionalParams extends OperationOptions {
  /** Optional, used to delete a snapshot. */
  xMsSnapshot?: string;
  /** Optional. Valid values are: snapshots, leased-snapshots, none. The default value is snapshots. For 'snapshots', the file share is deleted including all of its file share snapshots. If the file share contains leased-snapshots, the deletion fails. For 'leased-snapshots', the file share is deleted included all of its file share snapshots (leased/unleased). For 'none', the file share is deleted if it has no share snapshots. If the file share contains any snapshots (leased or unleased), the deletion fails. */
  include?: string;
}

/** Optional parameters. */
export interface FileSharesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface FileSharesCreateOptionalParams extends OperationOptions {
  /** Optional, used to expand the properties within share's properties. Valid values are: snapshots. Should be passed as a string with delimiter ',' */
  expand?: string;
}

/** Optional parameters. */
export interface FileSharesGetOptionalParams extends OperationOptions {
  /** Optional, used to expand the properties within share's properties. Valid values are: stats. Should be passed as a string with delimiter ','. */
  expand?: string;
  /** Optional, used to retrieve properties of a snapshot. */
  xMsSnapshot?: string;
}
