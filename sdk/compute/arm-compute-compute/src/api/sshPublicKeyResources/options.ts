// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SshGenerateKeyPairInputParameters } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SshPublicKeyResourcesGenerateKeyPairOptionalParams extends OperationOptions {
  /** Parameters supplied to generate the SSH public key. */
  parameters?: SshGenerateKeyPairInputParameters;
}

/** Optional parameters. */
export interface SshPublicKeyResourcesListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeyResourcesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeyResourcesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeyResourcesUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeyResourcesCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeyResourcesGetOptionalParams extends OperationOptions {}
