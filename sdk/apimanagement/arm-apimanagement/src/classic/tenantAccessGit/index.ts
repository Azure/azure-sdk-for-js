// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  regenerateSecondaryKey,
  regeneratePrimaryKey,
} from "../../api/tenantAccessGit/operations.js";
import type {
  TenantAccessGitRegenerateSecondaryKeyOptionalParams,
  TenantAccessGitRegeneratePrimaryKeyOptionalParams,
} from "../../api/tenantAccessGit/options.js";
import type { AccessIdName } from "../../models/models.js";

/** Interface representing a TenantAccessGit operations. */
export interface TenantAccessGitOperations {
  /** Regenerate secondary access key for GIT. */
  regenerateSecondaryKey: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessGitRegenerateSecondaryKeyOptionalParams,
  ) => Promise<void>;
  /** Regenerate primary access key for GIT. */
  regeneratePrimaryKey: (
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessGitRegeneratePrimaryKeyOptionalParams,
  ) => Promise<void>;
}

function _getTenantAccessGit(context: ApiManagementContext) {
  return {
    regenerateSecondaryKey: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      options?: TenantAccessGitRegenerateSecondaryKeyOptionalParams,
    ) => regenerateSecondaryKey(context, resourceGroupName, serviceName, accessName, options),
    regeneratePrimaryKey: (
      resourceGroupName: string,
      serviceName: string,
      accessName: AccessIdName,
      options?: TenantAccessGitRegeneratePrimaryKeyOptionalParams,
    ) => regeneratePrimaryKey(context, resourceGroupName, serviceName, accessName, options),
  };
}

export function _getTenantAccessGitOperations(
  context: ApiManagementContext,
): TenantAccessGitOperations {
  return {
    ..._getTenantAccessGit(context),
  };
}
