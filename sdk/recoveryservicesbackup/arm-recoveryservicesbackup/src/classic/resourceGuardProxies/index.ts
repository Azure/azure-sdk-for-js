// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext } from "../../api/recoveryServicesBackupContext.js";
import { list } from "../../api/resourceGuardProxies/operations.js";
import { ResourceGuardProxiesListOptionalParams } from "../../api/resourceGuardProxies/options.js";
import { ResourceGuardProxyBaseResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ResourceGuardProxies operations. */
export interface ResourceGuardProxiesOperations {
  /** List the ResourceGuardProxies under vault */
  list: (
    vaultName: string,
    resourceGroupName: string,
    options?: ResourceGuardProxiesListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceGuardProxyBaseResource>;
}

function _getResourceGuardProxies(context: RecoveryServicesBackupContext) {
  return {
    list: (
      vaultName: string,
      resourceGroupName: string,
      options?: ResourceGuardProxiesListOptionalParams,
    ) => list(context, vaultName, resourceGroupName, options),
  };
}

export function _getResourceGuardProxiesOperations(
  context: RecoveryServicesBackupContext,
): ResourceGuardProxiesOperations {
  return {
    ..._getResourceGuardProxies(context),
  };
}
