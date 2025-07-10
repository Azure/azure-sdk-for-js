// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineContext } from "../../api/sqlVirtualMachineContext.js";
import { SqlVmTroubleshooting } from "../../models/models.js";
import { SqlVirtualMachineTroubleshootTroubleshootOptionalParams } from "../../api/sqlVirtualMachineTroubleshoot/options.js";
import { troubleshoot } from "../../api/sqlVirtualMachineTroubleshoot/operations.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlVirtualMachineTroubleshoot operations. */
export interface SqlVirtualMachineTroubleshootOperations {
  /** Starts SQL virtual machine troubleshooting. */
  troubleshoot: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVmTroubleshooting,
    options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
  ) => PollerLike<OperationState<SqlVmTroubleshooting>, SqlVmTroubleshooting>;
}

function _getSqlVirtualMachineTroubleshoot(context: SqlVirtualMachineContext) {
  return {
    troubleshoot: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVmTroubleshooting,
      options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
    ) => troubleshoot(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
  };
}

export function _getSqlVirtualMachineTroubleshootOperations(
  context: SqlVirtualMachineContext,
): SqlVirtualMachineTroubleshootOperations {
  return {
    ..._getSqlVirtualMachineTroubleshoot(context),
  };
}
