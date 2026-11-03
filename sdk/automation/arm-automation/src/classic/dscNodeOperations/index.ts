// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import {
  listByAutomationAccount,
  $delete,
  update,
  get,
} from "../../api/dscNodeOperations/operations.js";
import type {
  DscNodeOperationsListByAutomationAccountOptionalParams,
  DscNodeOperationsDeleteOptionalParams,
  DscNodeOperationsUpdateOptionalParams,
  DscNodeOperationsGetOptionalParams,
} from "../../api/dscNodeOperations/options.js";
import type { DscNode, DscNodeUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DscNodeOperations operations. */
export interface DscNodeOperationsOperations {
  /** Retrieve a list of dsc nodes. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: DscNodeOperationsListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DscNode>;
  /** Delete the dsc node identified by node id. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    options?: DscNodeOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the dsc node. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    dscNodeUpdateParameters: DscNodeUpdateParameters,
    options?: DscNodeOperationsUpdateOptionalParams,
  ) => Promise<DscNode>;
  /** Retrieve the dsc node identified by node id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    options?: DscNodeOperationsGetOptionalParams,
  ) => Promise<DscNode>;
}

function _getDscNodeOperations(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: DscNodeOperationsListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      options?: DscNodeOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, nodeId, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      dscNodeUpdateParameters: DscNodeUpdateParameters,
      options?: DscNodeOperationsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        automationAccountName,
        nodeId,
        dscNodeUpdateParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      options?: DscNodeOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, nodeId, options),
  };
}

export function _getDscNodeOperationsOperations(
  context: AutomationContext,
): DscNodeOperationsOperations {
  return {
    ..._getDscNodeOperations(context),
  };
}
