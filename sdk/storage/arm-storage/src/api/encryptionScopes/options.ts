// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ListEncryptionScopesInclude } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EncryptionScopesListOptionalParams extends OperationOptions {
  /** Optional, specifies the maximum number of encryption scopes that will be included in the list response. */
  maxpagesize?: number;
  /** Optional. When specified, only encryption scope names starting with the filter will be listed. */
  filter?: string;
  /** Optional, when specified, will list encryption scopes with the specific state. Defaults to All */
  include?: ListEncryptionScopesInclude;
}

/** Optional parameters. */
export interface EncryptionScopesPatchOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EncryptionScopesPutOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EncryptionScopesGetOptionalParams extends OperationOptions {}
