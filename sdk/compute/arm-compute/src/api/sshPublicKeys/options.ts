// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SshGenerateKeyPairInputParameters } from "../../models/compute/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SshPublicKeysGenerateKeyPairOptionalParams extends OperationOptions {
  /** Parameters supplied to generate the SSH public key. */
  parameters?: SshGenerateKeyPairInputParameters;
}

/** Optional parameters. */
export interface SshPublicKeysListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeysListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeysDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeysUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeysCreateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SshPublicKeysGetOptionalParams extends OperationOptions {}
