// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineManagementContext } from "../../api/sqlVirtualMachineManagementContext.js";
import {
  listBySqlVmGroup,
  redeploy,
  fetchDCAssessment,
  startAssessment,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/sqlVirtualMachines/operations.js";
import type {
  SqlVirtualMachinesListBySqlVmGroupOptionalParams,
  SqlVirtualMachinesRedeployOptionalParams,
  SqlVirtualMachinesFetchDCAssessmentOptionalParams,
  SqlVirtualMachinesStartAssessmentOptionalParams,
  SqlVirtualMachinesListOptionalParams,
  SqlVirtualMachinesListByResourceGroupOptionalParams,
  SqlVirtualMachinesDeleteOptionalParams,
  SqlVirtualMachinesUpdateOptionalParams,
  SqlVirtualMachinesCreateOrUpdateOptionalParams,
  SqlVirtualMachinesGetOptionalParams,
} from "../../api/sqlVirtualMachines/options.js";
import type {
  SqlVirtualMachine,
  SqlVirtualMachineUpdate,
  DiskConfigAssessmentRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlVirtualMachines operations. */
export interface SqlVirtualMachinesOperations {
  /** Gets the list of sql virtual machines in a SQL virtual machine group. */
  listBySqlVmGroup: (
    resourceGroupName: string,
    sqlVirtualMachineGroupName: string,
    options?: SqlVirtualMachinesListBySqlVmGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlVirtualMachine>;
  /** Uninstalls and reinstalls the SQL IaaS Extension. */
  redeploy: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesRedeployOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use redeploy instead */
  beginRedeploy: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesRedeployOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use redeploy instead */
  beginRedeployAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesRedeployOptionalParams,
  ) => Promise<void>;
  /** Starts SQL best practices Assessment with Disk Config rules on SQL virtual machine */
  fetchDCAssessment: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: DiskConfigAssessmentRequest,
    options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use fetchDCAssessment instead */
  beginFetchDCAssessment: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: DiskConfigAssessmentRequest,
    options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use fetchDCAssessment instead */
  beginFetchDCAssessmentAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: DiskConfigAssessmentRequest,
    options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
  ) => Promise<void>;
  /** Starts SQL best practices Assessment on SQL virtual machine. */
  startAssessment: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesStartAssessmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use startAssessment instead */
  beginStartAssessment: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesStartAssessmentOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use startAssessment instead */
  beginStartAssessmentAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesStartAssessmentOptionalParams,
  ) => Promise<void>;
  /** Gets all SQL virtual machines in a subscription. */
  list: (
    options?: SqlVirtualMachinesListOptionalParams,
  ) => PagedAsyncIterableIterator<SqlVirtualMachine>;
  /** Gets all SQL virtual machines in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: SqlVirtualMachinesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<SqlVirtualMachine>;
  /** Deletes a SQL virtual machine. */
  delete: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates SQL virtual machine tags. */
  update: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachineUpdate,
    options?: SqlVirtualMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachine>, SqlVirtualMachine>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachineUpdate,
    options?: SqlVirtualMachinesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlVirtualMachine>, SqlVirtualMachine>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachineUpdate,
    options?: SqlVirtualMachinesUpdateOptionalParams,
  ) => Promise<SqlVirtualMachine>;
  /** Creates or updates a SQL virtual machine. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachine,
    options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachine>, SqlVirtualMachine>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachine,
    options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlVirtualMachine>, SqlVirtualMachine>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachine,
    options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
  ) => Promise<SqlVirtualMachine>;
  /** Gets a SQL virtual machine. */
  get: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesGetOptionalParams,
  ) => Promise<SqlVirtualMachine>;
}

function _getSqlVirtualMachines(context: SqlVirtualMachineManagementContext) {
  return {
    listBySqlVmGroup: (
      resourceGroupName: string,
      sqlVirtualMachineGroupName: string,
      options?: SqlVirtualMachinesListBySqlVmGroupOptionalParams,
    ) => listBySqlVmGroup(context, resourceGroupName, sqlVirtualMachineGroupName, options),
    redeploy: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesRedeployOptionalParams,
    ) => redeploy(context, resourceGroupName, sqlVirtualMachineName, options),
    beginRedeploy: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesRedeployOptionalParams,
    ) => {
      const poller = redeploy(context, resourceGroupName, sqlVirtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRedeployAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesRedeployOptionalParams,
    ) => {
      return await redeploy(context, resourceGroupName, sqlVirtualMachineName, options);
    },
    fetchDCAssessment: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: DiskConfigAssessmentRequest,
      options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
    ) => fetchDCAssessment(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    beginFetchDCAssessment: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: DiskConfigAssessmentRequest,
      options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
    ) => {
      const poller = fetchDCAssessment(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginFetchDCAssessmentAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: DiskConfigAssessmentRequest,
      options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
    ) => {
      return await fetchDCAssessment(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        parameters,
        options,
      );
    },
    startAssessment: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesStartAssessmentOptionalParams,
    ) => startAssessment(context, resourceGroupName, sqlVirtualMachineName, options),
    beginStartAssessment: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesStartAssessmentOptionalParams,
    ) => {
      const poller = startAssessment(context, resourceGroupName, sqlVirtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAssessmentAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesStartAssessmentOptionalParams,
    ) => {
      return await startAssessment(context, resourceGroupName, sqlVirtualMachineName, options);
    },
    list: (options?: SqlVirtualMachinesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: SqlVirtualMachinesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, sqlVirtualMachineName, options),
    beginDelete: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, sqlVirtualMachineName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, sqlVirtualMachineName, options);
    },
    update: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachineUpdate,
      options?: SqlVirtualMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachineUpdate,
      options?: SqlVirtualMachinesUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, sqlVirtualMachineName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachineUpdate,
      options?: SqlVirtualMachinesUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, sqlVirtualMachineName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachine,
      options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachine,
      options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachine,
      options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlVirtualMachineName, options),
  };
}

export function _getSqlVirtualMachinesOperations(
  context: SqlVirtualMachineManagementContext,
): SqlVirtualMachinesOperations {
  return {
    ..._getSqlVirtualMachines(context),
  };
}
