// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineContext } from "../../api/sqlVirtualMachineContext.js";
import {
  SqlVirtualMachine,
  SqlVirtualMachineUpdate,
  DiskConfigAssessmentRequest,
} from "../../models/models.js";
import {
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
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** Starts SQL best practices Assessment with Disk Config rules on SQL virtual machine */
  fetchDCAssessment: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: DiskConfigAssessmentRequest,
    options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Starts SQL best practices Assessment on SQL virtual machine. */
  startAssessment: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesStartAssessmentOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates SQL virtual machine tags. */
  update: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachineUpdate,
    options?: SqlVirtualMachinesUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachine>, SqlVirtualMachine>;
  /** Creates or updates a SQL virtual machine. */
  createOrUpdate: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVirtualMachine,
    options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SqlVirtualMachine>, SqlVirtualMachine>;
  /** Gets a SQL virtual machine. */
  get: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    options?: SqlVirtualMachinesGetOptionalParams,
  ) => Promise<SqlVirtualMachine>;
}

function _getSqlVirtualMachines(context: SqlVirtualMachineContext) {
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
    fetchDCAssessment: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: DiskConfigAssessmentRequest,
      options?: SqlVirtualMachinesFetchDCAssessmentOptionalParams,
    ) => fetchDCAssessment(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    startAssessment: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesStartAssessmentOptionalParams,
    ) => startAssessment(context, resourceGroupName, sqlVirtualMachineName, options),
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
    update: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachineUpdate,
      options?: SqlVirtualMachinesUpdateOptionalParams,
    ) => update(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVirtualMachine,
      options?: SqlVirtualMachinesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    get: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      options?: SqlVirtualMachinesGetOptionalParams,
    ) => get(context, resourceGroupName, sqlVirtualMachineName, options),
  };
}

export function _getSqlVirtualMachinesOperations(
  context: SqlVirtualMachineContext,
): SqlVirtualMachinesOperations {
  return {
    ..._getSqlVirtualMachines(context),
  };
}
