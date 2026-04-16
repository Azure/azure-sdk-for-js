// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import {
  unlockDelete,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/dppResourceGuardProxy/operations.js";
import type {
  DppResourceGuardProxyUnlockDeleteOptionalParams,
  DppResourceGuardProxyListOptionalParams,
  DppResourceGuardProxyDeleteOptionalParams,
  DppResourceGuardProxyCreateOrUpdateOptionalParams,
  DppResourceGuardProxyGetOptionalParams,
} from "../../api/dppResourceGuardProxy/options.js";
import type {
  ResourceGuardProxyBaseResource,
  UnlockDeleteRequest,
  UnlockDeleteResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DppResourceGuardProxy operations. */
export interface DppResourceGuardProxyOperations {
  /** UnlockDelete call for ResourceGuardProxy, executed before one can delete it */
  unlockDelete: (
    resourceGroupName: string,
    vaultName: string,
    resourceGuardProxyName: string,
    parameters: UnlockDeleteRequest,
    options?: DppResourceGuardProxyUnlockDeleteOptionalParams,
  ) => Promise<UnlockDeleteResponse>;
  /** Returns the list of ResourceGuardProxies associated with the vault */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: DppResourceGuardProxyListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceGuardProxyBaseResource>;
  /** Deletes the ResourceGuardProxy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vaultName: string,
    resourceGuardProxyName: string,
    options?: DppResourceGuardProxyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or Updates a ResourceGuardProxy */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    resourceGuardProxyName: string,
    parameters: ResourceGuardProxyBaseResource,
    options?: DppResourceGuardProxyCreateOrUpdateOptionalParams,
  ) => Promise<ResourceGuardProxyBaseResource>;
  /** Returns the ResourceGuardProxy object associated with the vault, and that matches the name in the request */
  get: (
    resourceGroupName: string,
    vaultName: string,
    resourceGuardProxyName: string,
    options?: DppResourceGuardProxyGetOptionalParams,
  ) => Promise<ResourceGuardProxyBaseResource>;
}

function _getDppResourceGuardProxy(context: DataProtectionContext) {
  return {
    unlockDelete: (
      resourceGroupName: string,
      vaultName: string,
      resourceGuardProxyName: string,
      parameters: UnlockDeleteRequest,
      options?: DppResourceGuardProxyUnlockDeleteOptionalParams,
    ) =>
      unlockDelete(
        context,
        resourceGroupName,
        vaultName,
        resourceGuardProxyName,
        parameters,
        options,
      ),
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: DppResourceGuardProxyListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    delete: (
      resourceGroupName: string,
      vaultName: string,
      resourceGuardProxyName: string,
      options?: DppResourceGuardProxyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vaultName, resourceGuardProxyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      resourceGuardProxyName: string,
      parameters: ResourceGuardProxyBaseResource,
      options?: DppResourceGuardProxyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vaultName,
        resourceGuardProxyName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      vaultName: string,
      resourceGuardProxyName: string,
      options?: DppResourceGuardProxyGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, resourceGuardProxyName, options),
  };
}

export function _getDppResourceGuardProxyOperations(
  context: DataProtectionContext,
): DppResourceGuardProxyOperations {
  return {
    ..._getDppResourceGuardProxy(context),
  };
}
