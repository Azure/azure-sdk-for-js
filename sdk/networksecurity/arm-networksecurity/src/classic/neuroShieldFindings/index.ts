// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext } from "../../api/networkSecurityManagementContext.js";
import {
  rollback,
  mitigate,
  listByNeuroShield,
  list,
  get,
} from "../../api/neuroShieldFindings/operations.js";
import type {
  NeuroShieldFindingsRollbackOptionalParams,
  NeuroShieldFindingsMitigateOptionalParams,
  NeuroShieldFindingsListByNeuroShieldOptionalParams,
  NeuroShieldFindingsListOptionalParams,
  NeuroShieldFindingsGetOptionalParams,
} from "../../api/neuroShieldFindings/options.js";
import type { NeuroShieldFinding, NeuroShieldMitigationActionResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a NeuroShieldFindings operations. */
export interface NeuroShieldFindingsOperations {
  /** Rolls back succeeded rollbackable mitigations under a finding. */
  rollback: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    findingId: string,
    options?: NeuroShieldFindingsRollbackOptionalParams,
  ) => Promise<NeuroShieldMitigationActionResult>;
  /** Triggers mitigation for all awaiting-approval mitigations under a finding. */
  mitigate: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    findingId: string,
    options?: NeuroShieldFindingsMitigateOptionalParams,
  ) => Promise<NeuroShieldMitigationActionResult>;
  /** Lists findings across all protected resources under a NeuroShield resource. */
  listByNeuroShield: (
    resourceGroupName: string,
    neuroShieldName: string,
    options?: NeuroShieldFindingsListByNeuroShieldOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldFinding>;
  /** Lists findings under a protected resource. */
  list: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    options?: NeuroShieldFindingsListOptionalParams,
  ) => PagedAsyncIterableIterator<NeuroShieldFinding>;
  /** Gets a finding under a protected resource. */
  get: (
    resourceGroupName: string,
    neuroShieldName: string,
    protectedResourceName: string,
    findingId: string,
    options?: NeuroShieldFindingsGetOptionalParams,
  ) => Promise<NeuroShieldFinding>;
}

function _getNeuroShieldFindings(context: NetworkSecurityManagementContext) {
  return {
    rollback: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      findingId: string,
      options?: NeuroShieldFindingsRollbackOptionalParams,
    ) =>
      rollback(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        findingId,
        options,
      ),
    mitigate: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      findingId: string,
      options?: NeuroShieldFindingsMitigateOptionalParams,
    ) =>
      mitigate(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        findingId,
        options,
      ),
    listByNeuroShield: (
      resourceGroupName: string,
      neuroShieldName: string,
      options?: NeuroShieldFindingsListByNeuroShieldOptionalParams,
    ) => listByNeuroShield(context, resourceGroupName, neuroShieldName, options),
    list: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      options?: NeuroShieldFindingsListOptionalParams,
    ) => list(context, resourceGroupName, neuroShieldName, protectedResourceName, options),
    get: (
      resourceGroupName: string,
      neuroShieldName: string,
      protectedResourceName: string,
      findingId: string,
      options?: NeuroShieldFindingsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, neuroShieldName, protectedResourceName, findingId, options),
  };
}

export function _getNeuroShieldFindingsOperations(
  context: NetworkSecurityManagementContext,
): NeuroShieldFindingsOperations {
  return {
    ..._getNeuroShieldFindings(context),
  };
}
