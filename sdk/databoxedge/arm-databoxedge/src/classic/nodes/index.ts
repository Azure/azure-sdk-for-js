// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { listByDataBoxEdgeDevice } from "../../api/nodes/operations.js";
import { NodesListByDataBoxEdgeDeviceOptionalParams } from "../../api/nodes/options.js";
import { Node } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Nodes operations. */
export interface NodesOperations {
  /** Gets all the nodes currently configured under this Data Box Edge device */
  listByDataBoxEdgeDevice: (
    deviceName: string,
    resourceGroupName: string,
    options?: NodesListByDataBoxEdgeDeviceOptionalParams,
  ) => PagedAsyncIterableIterator<Node>;
}

function _getNodes(context: DataBoxEdgeManagementContext) {
  return {
    listByDataBoxEdgeDevice: (
      deviceName: string,
      resourceGroupName: string,
      options?: NodesListByDataBoxEdgeDeviceOptionalParams,
    ) => listByDataBoxEdgeDevice(context, deviceName, resourceGroupName, options),
  };
}

export function _getNodesOperations(context: DataBoxEdgeManagementContext): NodesOperations {
  return {
    ..._getNodes(context),
  };
}
