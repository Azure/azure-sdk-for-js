// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { get } from "../../api/resourceGuardProxies/operations.js";
import type { ResourceGuardProxiesGetOptionalParams } from "../../api/resourceGuardProxies/options.js";
import type { ResourceGuardProxyBaseResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceGuardProxies operations. */
export interface ResourceGuardProxiesOperations {
  /** List the ResourceGuardProxies under vault */
  get: (
    vaultName: string,
    resourceGroupName: string,
    options?: ResourceGuardProxiesGetOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceGuardProxyBaseResource>;
}

function _getResourceGuardProxies(context: RecoveryServicesBackupContext) {
  return {
    get: (
      vaultName: string,
      resourceGroupName: string,
      options?: ResourceGuardProxiesGetOptionalParams,
    ) => get(context, vaultName, resourceGroupName, options),
  };
}

export function _getResourceGuardProxiesOperations(
  context: RecoveryServicesBackupContext,
): ResourceGuardProxiesOperations {
  return {
    ..._getResourceGuardProxies(context),
  };
}
