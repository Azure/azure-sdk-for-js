// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IoTFirmwareDefenseContext } from "../../api/ioTFirmwareDefenseContext.js";
import { listByFirmware } from "../../api/unsafeFunctionCalls/operations.js";
import type { UnsafeFunctionCallsListByFirmwareOptionalParams } from "../../api/unsafeFunctionCalls/options.js";
import type { UnsafeFunctionCallsResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UnsafeFunctionCalls operations. */
export interface UnsafeFunctionCallsOperations {
  /** Lists unsafe function call analysis results of a firmware. */
  listByFirmware: (
    resourceGroupName: string,
    workspaceName: string,
    firmwareId: string,
    options?: UnsafeFunctionCallsListByFirmwareOptionalParams,
  ) => PagedAsyncIterableIterator<UnsafeFunctionCallsResource>;
}

function _getUnsafeFunctionCalls(context: IoTFirmwareDefenseContext) {
  return {
    listByFirmware: (
      resourceGroupName: string,
      workspaceName: string,
      firmwareId: string,
      options?: UnsafeFunctionCallsListByFirmwareOptionalParams,
    ) => listByFirmware(context, resourceGroupName, workspaceName, firmwareId, options),
  };
}

export function _getUnsafeFunctionCallsOperations(
  context: IoTFirmwareDefenseContext,
): UnsafeFunctionCallsOperations {
  return {
    ..._getUnsafeFunctionCalls(context),
  };
}
