// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  acquire,
  listByManagedInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedServerDnsAliases/operations.js";
import type {
  ManagedServerDnsAliasesAcquireOptionalParams,
  ManagedServerDnsAliasesListByManagedInstanceOptionalParams,
  ManagedServerDnsAliasesDeleteOptionalParams,
  ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
  ManagedServerDnsAliasesGetOptionalParams,
} from "../../api/managedServerDnsAliases/options.js";
import type {
  ManagedServerDnsAlias,
  ManagedServerDnsAliasCreation,
  ManagedServerDnsAliasAcquisition,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedServerDnsAliases operations. */
export interface ManagedServerDnsAliasesOperations {
  /** Acquires managed server DNS alias from another managed server. */
  acquire: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    parameters: ManagedServerDnsAliasAcquisition,
    options?: ManagedServerDnsAliasesAcquireOptionalParams,
  ) => PollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias>;
  /** @deprecated use acquire instead */
  beginAcquire: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    parameters: ManagedServerDnsAliasAcquisition,
    options?: ManagedServerDnsAliasesAcquireOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias>>;
  /** @deprecated use acquire instead */
  beginAcquireAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    parameters: ManagedServerDnsAliasAcquisition,
    options?: ManagedServerDnsAliasesAcquireOptionalParams,
  ) => Promise<ManagedServerDnsAlias>;
  /** Gets a list of managed server DNS aliases for a managed server. */
  listByManagedInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedServerDnsAliasesListByManagedInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedServerDnsAlias>;
  /** Deletes the managed server DNS alias with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    options?: ManagedServerDnsAliasesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    options?: ManagedServerDnsAliasesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    options?: ManagedServerDnsAliasesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a managed server DNS alias. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    parameters: ManagedServerDnsAliasCreation,
    options?: ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    parameters: ManagedServerDnsAliasCreation,
    options?: ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ManagedServerDnsAlias>, ManagedServerDnsAlias>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    parameters: ManagedServerDnsAliasCreation,
    options?: ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
  ) => Promise<ManagedServerDnsAlias>;
  /** Gets a server DNS alias. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    dnsAliasName: string,
    options?: ManagedServerDnsAliasesGetOptionalParams,
  ) => Promise<ManagedServerDnsAlias>;
}

function _getManagedServerDnsAliases(context: SqlManagementContext) {
  return {
    acquire: (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      parameters: ManagedServerDnsAliasAcquisition,
      options?: ManagedServerDnsAliasesAcquireOptionalParams,
    ) =>
      acquire(context, resourceGroupName, managedInstanceName, dnsAliasName, parameters, options),
    beginAcquire: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      parameters: ManagedServerDnsAliasAcquisition,
      options?: ManagedServerDnsAliasesAcquireOptionalParams,
    ) => {
      const poller = acquire(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginAcquireAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      parameters: ManagedServerDnsAliasAcquisition,
      options?: ManagedServerDnsAliasesAcquireOptionalParams,
    ) => {
      return await acquire(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        parameters,
        options,
      );
    },
    listByManagedInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedServerDnsAliasesListByManagedInstanceOptionalParams,
    ) => listByManagedInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      options?: ManagedServerDnsAliasesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, dnsAliasName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      options?: ManagedServerDnsAliasesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      options?: ManagedServerDnsAliasesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, managedInstanceName, dnsAliasName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      parameters: ManagedServerDnsAliasCreation,
      options?: ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      parameters: ManagedServerDnsAliasCreation,
      options?: ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      parameters: ManagedServerDnsAliasCreation,
      options?: ManagedServerDnsAliasesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        dnsAliasName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      dnsAliasName: string,
      options?: ManagedServerDnsAliasesGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, dnsAliasName, options),
  };
}

export function _getManagedServerDnsAliasesOperations(
  context: SqlManagementContext,
): ManagedServerDnsAliasesOperations {
  return {
    ..._getManagedServerDnsAliases(context),
  };
}
