// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext } from "../../api/automationContext.js";
import { getContent, get, listByNode } from "../../api/nodeReports/operations.js";
import type {
  NodeReportsGetContentOptionalParams,
  NodeReportsGetOptionalParams,
  NodeReportsListByNodeOptionalParams,
} from "../../api/nodeReports/options.js";
import type { DscNodeReport, NodeReportsGetContentResponse } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NodeReports operations. */
export interface NodeReportsOperations {
  /** Retrieve the Dsc node reports by node id and report id. */
  getContent: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    reportId: string,
    options?: NodeReportsGetContentOptionalParams,
  ) => Promise<NodeReportsGetContentResponse>;
  /** Retrieve the Dsc node report data by node id and report id. */
  get: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    reportId: string,
    options?: NodeReportsGetOptionalParams,
  ) => Promise<DscNodeReport>;
  /** Retrieve the Dsc node report list by node id. */
  listByNode: (
    resourceGroupName: string,
    automationAccountName: string,
    nodeId: string,
    options?: NodeReportsListByNodeOptionalParams,
  ) => PagedAsyncIterableIterator<DscNodeReport>;
}

function _getNodeReports(context: AutomationContext) {
  return {
    getContent: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      reportId: string,
      options?: NodeReportsGetContentOptionalParams,
    ) => getContent(context, resourceGroupName, automationAccountName, nodeId, reportId, options),
    get: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      reportId: string,
      options?: NodeReportsGetOptionalParams,
    ) => get(context, resourceGroupName, automationAccountName, nodeId, reportId, options),
    listByNode: (
      resourceGroupName: string,
      automationAccountName: string,
      nodeId: string,
      options?: NodeReportsListByNodeOptionalParams,
    ) => listByNode(context, resourceGroupName, automationAccountName, nodeId, options),
  };
}

export function _getNodeReportsOperations(context: AutomationContext): NodeReportsOperations {
  return {
    ..._getNodeReports(context),
  };
}
