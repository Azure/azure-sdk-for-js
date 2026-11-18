// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  rollback,
  execute,
  listByNeuroShield,
  list,
  get,
} from "../../api/neuroShieldMitigations/operations.js";
import type {
  NeuroShieldMitigationsRollbackOptionalParams,
  NeuroShieldMitigationsExecuteOptionalParams,
  NeuroShieldMitigationsListByNeuroShieldOptionalParams,
  NeuroShieldMitigationsListOptionalParams,
  NeuroShieldMitigationsGetOptionalParams,
} from "../../api/neuroShieldMitigations/options.js";
import type { NeuroShieldMitigation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NeuroShieldMitigations operations. */
export interface NeuroShieldMitigationsOperations {
  /** Rolls back a mitigation when rollback is available. */
  rollback: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    mitigationId: string,
    options?: NeuroShieldMitigationsRollbackOptionalParams,
  ) => Promise<NeuroShieldMitigation>;
  /** Approves and queues a mitigation for execution. */
  execute: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    mitigationId: string,
    options?: NeuroShieldMitigationsExecuteOptionalParams,
  ) => Promise<NeuroShieldMitigation>;
  /** Lists mitigations across all protected resources under a NeuroShield resource. */
  listByNeuroShield: (
    resourceGroupName: string,
    neuroShieldName: string,
    options?: NeuroShieldMitigationsListByNeuroShieldOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldMitigation>;
  /** Lists mitigations under a protected resource. */
  list: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    options?: NeuroShieldMitigationsListOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldMitigation>;
  /** Gets a mitigation under a protected resource. */
  get: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    mitigationId: string,
    options?: NeuroShieldMitigationsGetOptionalParams,
  ) => Promise<NeuroShieldMitigation>;
}

function _getNeuroShieldMitigations(context: NetworkSecurityManagementContext) {
  return {
    rollback: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      mitigationId: string,
      options?: NeuroShieldMitigationsRollbackOptionalParams,
    ) =>
      rollback(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        mitigationId,
        options,
      ),
    execute: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      mitigationId: string,
      options?: NeuroShieldMitigationsExecuteOptionalParams,
    ) =>
      execute(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        mitigationId,
        options,
      ),
    listByNeuroShield: (
      resourceGroupName: string,
      neuroShieldName: string,
      options?: NeuroShieldMitigationsListByNeuroShieldOptionalParams,
    ) => listByNeuroShield(context, resourceGroupName, neuroShieldName, options),
    list: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      options?: NeuroShieldMitigationsListOptionalParams,
    ) => list(context, resourceGroupName, neuroShieldName, protectedResourceName, options),
    get: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      mitigationId: string,
      options?: NeuroShieldMitigationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        mitigationId,
        options,
      ),
  };
}

export function _getNeuroShieldMitigationsOperations(
  context: NetworkSecurityManagementContext,
): NeuroShieldMitigationsOperations {
  return {
    ..._getNeuroShieldMitigations(context),
  };
}
