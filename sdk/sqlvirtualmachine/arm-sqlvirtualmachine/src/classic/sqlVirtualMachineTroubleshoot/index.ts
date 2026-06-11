// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlVirtualMachineManagementContext } from "../../api/sqlVirtualMachineManagementContext.js";
import { troubleshoot } from "../../api/sqlVirtualMachineTroubleshoot/operations.js";
import type { SqlVirtualMachineTroubleshootTroubleshootOptionalParams } from "../../api/sqlVirtualMachineTroubleshoot/options.js";
import type { SqlVmTroubleshooting } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SqlVirtualMachineTroubleshoot operations. */
export interface SqlVirtualMachineTroubleshootOperations {
  /** Starts SQL virtual machine troubleshooting. */
  troubleshoot: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVmTroubleshooting,
    options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
  ) => PollerLike<OperationState<SqlVmTroubleshooting>, SqlVmTroubleshooting>;
  /** @deprecated use troubleshoot instead */
  beginTroubleshoot: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVmTroubleshooting,
    options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SqlVmTroubleshooting>, SqlVmTroubleshooting>>;
  /** @deprecated use troubleshoot instead */
  beginTroubleshootAndWait: (
    resourceGroupName: string,
    sqlVirtualMachineName: string,
    parameters: SqlVmTroubleshooting,
    options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
  ) => Promise<SqlVmTroubleshooting>;
}

function _getSqlVirtualMachineTroubleshoot(context: SqlVirtualMachineManagementContext) {
  return {
    troubleshoot: (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVmTroubleshooting,
      options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
    ) => troubleshoot(context, resourceGroupName, sqlVirtualMachineName, parameters, options),
    beginTroubleshoot: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVmTroubleshooting,
      options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
    ) => {
      const poller = troubleshoot(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginTroubleshootAndWait: async (
      resourceGroupName: string,
      sqlVirtualMachineName: string,
      parameters: SqlVmTroubleshooting,
      options?: SqlVirtualMachineTroubleshootTroubleshootOptionalParams,
    ) => {
      return await troubleshoot(
        context,
        resourceGroupName,
        sqlVirtualMachineName,
        parameters,
        options,
      );
    },
  };
}

export function _getSqlVirtualMachineTroubleshootOperations(
  context: SqlVirtualMachineManagementContext,
): SqlVirtualMachineTroubleshootOperations {
  return {
    ..._getSqlVirtualMachineTroubleshoot(context),
  };
}
