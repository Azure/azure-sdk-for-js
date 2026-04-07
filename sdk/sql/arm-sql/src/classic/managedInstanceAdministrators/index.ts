// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByInstance,
  $delete,
  createOrUpdate,
  get,
} from "../../api/managedInstanceAdministrators/operations.js";
import type {
  ManagedInstanceAdministratorsListByInstanceOptionalParams,
  ManagedInstanceAdministratorsDeleteOptionalParams,
  ManagedInstanceAdministratorsCreateOrUpdateOptionalParams,
  ManagedInstanceAdministratorsGetOptionalParams,
} from "../../api/managedInstanceAdministrators/options.js";
import type { ManagedInstanceAdministrator, AdministratorName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedInstanceAdministrators operations. */
export interface ManagedInstanceAdministratorsOperations {
  /** Gets a list of managed instance administrators. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: ManagedInstanceAdministratorsListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedInstanceAdministrator>;
  /** Deletes a managed instance administrator. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    administratorName: AdministratorName,
    options?: ManagedInstanceAdministratorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    administratorName: AdministratorName,
    options?: ManagedInstanceAdministratorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    administratorName: AdministratorName,
    options?: ManagedInstanceAdministratorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a managed instance administrator. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    administratorName: AdministratorName,
    parameters: ManagedInstanceAdministrator,
    options?: ManagedInstanceAdministratorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedInstanceAdministrator>, ManagedInstanceAdministrator>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    administratorName: AdministratorName,
    parameters: ManagedInstanceAdministrator,
    options?: ManagedInstanceAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ManagedInstanceAdministrator>, ManagedInstanceAdministrator>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    administratorName: AdministratorName,
    parameters: ManagedInstanceAdministrator,
    options?: ManagedInstanceAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedInstanceAdministrator>;
  /** Gets a managed instance administrator. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    administratorName: AdministratorName,
    options?: ManagedInstanceAdministratorsGetOptionalParams,
  ) => Promise<ManagedInstanceAdministrator>;
}

function _getManagedInstanceAdministrators(context: SqlContext) {
  return {
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: ManagedInstanceAdministratorsListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      administratorName: AdministratorName,
      options?: ManagedInstanceAdministratorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, managedInstanceName, administratorName, options),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      administratorName: AdministratorName,
      options?: ManagedInstanceAdministratorsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        administratorName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      administratorName: AdministratorName,
      options?: ManagedInstanceAdministratorsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        administratorName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      administratorName: AdministratorName,
      parameters: ManagedInstanceAdministrator,
      options?: ManagedInstanceAdministratorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        administratorName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      administratorName: AdministratorName,
      parameters: ManagedInstanceAdministrator,
      options?: ManagedInstanceAdministratorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        administratorName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      administratorName: AdministratorName,
      parameters: ManagedInstanceAdministrator,
      options?: ManagedInstanceAdministratorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        administratorName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      administratorName: AdministratorName,
      options?: ManagedInstanceAdministratorsGetOptionalParams,
    ) => get(context, resourceGroupName, managedInstanceName, administratorName, options),
  };
}

export function _getManagedInstanceAdministratorsOperations(
  context: SqlContext,
): ManagedInstanceAdministratorsOperations {
  return {
    ..._getManagedInstanceAdministrators(context),
  };
}
