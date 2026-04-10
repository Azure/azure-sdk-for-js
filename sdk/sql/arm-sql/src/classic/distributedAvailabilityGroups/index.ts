// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  setRole,
  failover,
  listByInstance,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/distributedAvailabilityGroups/operations.js";
import type {
  DistributedAvailabilityGroupsSetRoleOptionalParams,
  DistributedAvailabilityGroupsFailoverOptionalParams,
  DistributedAvailabilityGroupsListByInstanceOptionalParams,
  DistributedAvailabilityGroupsDeleteOptionalParams,
  DistributedAvailabilityGroupsUpdateOptionalParams,
  DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
  DistributedAvailabilityGroupsGetOptionalParams,
} from "../../api/distributedAvailabilityGroups/options.js";
import type {
  DistributedAvailabilityGroup,
  DistributedAvailabilityGroupsFailoverRequest,
  DistributedAvailabilityGroupSetRole,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DistributedAvailabilityGroups operations. */
export interface DistributedAvailabilityGroupsOperations {
  /** Sets the role for managed instance in a distributed availability group. */
  setRole: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroupSetRole,
    options?: DistributedAvailabilityGroupsSetRoleOptionalParams,
  ) => PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
  /** @deprecated use setRole instead */
  beginSetRole: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroupSetRole,
    options?: DistributedAvailabilityGroupsSetRoleOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>
  >;
  /** @deprecated use setRole instead */
  beginSetRoleAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroupSetRole,
    options?: DistributedAvailabilityGroupsSetRoleOptionalParams,
  ) => Promise<DistributedAvailabilityGroup>;
  /** Performs requested failover type in this distributed availability group. */
  failover: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroupsFailoverRequest,
    options?: DistributedAvailabilityGroupsFailoverOptionalParams,
  ) => PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
  /** @deprecated use failover instead */
  beginFailover: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroupsFailoverRequest,
    options?: DistributedAvailabilityGroupsFailoverOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>
  >;
  /** @deprecated use failover instead */
  beginFailoverAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroupsFailoverRequest,
    options?: DistributedAvailabilityGroupsFailoverOptionalParams,
  ) => Promise<DistributedAvailabilityGroup>;
  /** Gets a list of a distributed availability groups in instance. */
  listByInstance: (
    resourceGroupName: string,
    managedInstanceName: string,
    options?: DistributedAvailabilityGroupsListByInstanceOptionalParams,
  ) => PagedAsyncIterableIterator<DistributedAvailabilityGroup>;
  /** Drops a distributed availability group between Sql On-Prem and Sql Managed Instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    options?: DistributedAvailabilityGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    options?: DistributedAvailabilityGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    options?: DistributedAvailabilityGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a distributed availability group replication mode. */
  update: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroup,
    options?: DistributedAvailabilityGroupsUpdateOptionalParams,
  ) => PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroup,
    options?: DistributedAvailabilityGroupsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroup,
    options?: DistributedAvailabilityGroupsUpdateOptionalParams,
  ) => Promise<DistributedAvailabilityGroup>;
  /** Creates a distributed availability group between Sql On-Prem and Sql Managed Instance. */
  createOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroup,
    options?: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroup,
    options?: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DistributedAvailabilityGroup>, DistributedAvailabilityGroup>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    parameters: DistributedAvailabilityGroup,
    options?: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
  ) => Promise<DistributedAvailabilityGroup>;
  /** Gets a distributed availability group info. */
  get: (
    resourceGroupName: string,
    managedInstanceName: string,
    distributedAvailabilityGroupName: string,
    options?: DistributedAvailabilityGroupsGetOptionalParams,
  ) => Promise<DistributedAvailabilityGroup>;
}

function _getDistributedAvailabilityGroups(context: SqlManagementContext) {
  return {
    setRole: (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroupSetRole,
      options?: DistributedAvailabilityGroupsSetRoleOptionalParams,
    ) =>
      setRole(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    beginSetRole: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroupSetRole,
      options?: DistributedAvailabilityGroupsSetRoleOptionalParams,
    ) => {
      const poller = setRole(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSetRoleAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroupSetRole,
      options?: DistributedAvailabilityGroupsSetRoleOptionalParams,
    ) => {
      return await setRole(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
    },
    failover: (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroupsFailoverRequest,
      options?: DistributedAvailabilityGroupsFailoverOptionalParams,
    ) =>
      failover(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    beginFailover: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroupsFailoverRequest,
      options?: DistributedAvailabilityGroupsFailoverOptionalParams,
    ) => {
      const poller = failover(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFailoverAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroupsFailoverRequest,
      options?: DistributedAvailabilityGroupsFailoverOptionalParams,
    ) => {
      return await failover(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
    },
    listByInstance: (
      resourceGroupName: string,
      managedInstanceName: string,
      options?: DistributedAvailabilityGroupsListByInstanceOptionalParams,
    ) => listByInstance(context, resourceGroupName, managedInstanceName, options),
    delete: (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      options?: DistributedAvailabilityGroupsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      options?: DistributedAvailabilityGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      options?: DistributedAvailabilityGroupsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroup,
      options?: DistributedAvailabilityGroupsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    beginUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroup,
      options?: DistributedAvailabilityGroupsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroup,
      options?: DistributedAvailabilityGroupsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroup,
      options?: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroup,
      options?: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      parameters: DistributedAvailabilityGroup,
      options?: DistributedAvailabilityGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      managedInstanceName: string,
      distributedAvailabilityGroupName: string,
      options?: DistributedAvailabilityGroupsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        managedInstanceName,
        distributedAvailabilityGroupName,
        options,
      ),
  };
}

export function _getDistributedAvailabilityGroupsOperations(
  context: SqlManagementContext,
): DistributedAvailabilityGroupsOperations {
  return {
    ..._getDistributedAvailabilityGroups(context),
  };
}
