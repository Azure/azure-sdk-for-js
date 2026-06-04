// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { listByAutomationAccount, $delete, update, get } from "../../api/dscNode/operations.js";
import type {
  DscNodeListByAutomationAccountOptionalParams,
  DscNodeDeleteOptionalParams,
  DscNodeUpdateOptionalParams,
  DscNodeGetOptionalParams,
} from "../../api/dscNode/options.js";
import type { DscNode, DscNodeUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DscNode operations. */
export interface DscNodeOperations {
  /** Retrieve a list of dsc nodes. */
  listByAutomationAccount: (
    resourceGroupName: string,
    automationAccountName: string,
    options?: DscNodeListByAutomationAccountOptionalParams,
  ) => PagedAsyncIterableIterator<DscNode>;
  /** Delete the dsc node identified by node id. */
  delete: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    options?: DscNodeDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the dsc node. */
  update: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    dscNodeUpdateParameters: DscNodeUpdateParameters,
    options?: DscNodeUpdateOptionalParams,
  ) => Promise<DscNode>;
  /** Retrieve the dsc node identified by node id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    options?: DscNodeGetOptionalParams,
  ) => Promise<DscNode>;
}

function _getDscNode(context: AutomationContext) {
  return {
    listByAutomationAccount: (
      resourceGroupName: string,
      automationAccountName: string,
      options?: DscNodeListByAutomationAccountOptionalParams,
    ) => listByAutomationAccount(context, resourceGroupName, automationAccountName, options),
    delete: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      options?: DscNodeDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, automationAccountName, nodeId, options),
    update: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      dscNodeUpdateParameters: DscNodeUpdateParameters,
      options?: DscNodeUpdateOptionalParams,
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
      options?: DscNodeGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, nodeId, options),
  };
}

export function _getDscNodeOperations(context: AutomationContext): DscNodeOperations {
  return {
    ..._getDscNode(context),
  };
}
