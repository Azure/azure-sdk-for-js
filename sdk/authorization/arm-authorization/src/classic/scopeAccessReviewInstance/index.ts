// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  sendReminders,
  applyDecisions,
  resetDecisions,
  recordAllDecisions,
  stop,
} from "../../api/scopeAccessReviewInstance/operations.js";
import type {
  ScopeAccessReviewInstanceSendRemindersOptionalParams,
  ScopeAccessReviewInstanceApplyDecisionsOptionalParams,
  ScopeAccessReviewInstanceResetDecisionsOptionalParams,
  ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams,
  ScopeAccessReviewInstanceStopOptionalParams,
} from "../../api/scopeAccessReviewInstance/options.js";
import type { RecordAllDecisionsProperties } from "../../models/microsoft/attributeNamespaces/models.js";

/** Interface representing a ScopeAccessReviewInstance operations. */
export interface ScopeAccessReviewInstanceOperations {
  /** An action to send reminders for an access review instance. */
  sendReminders: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceSendRemindersOptionalParams,
  ) => Promise<void>;
  /** An action to apply all decisions for an access review instance. */
  applyDecisions: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceApplyDecisionsOptionalParams,
  ) => Promise<void>;
  /** An action to reset all decisions for an access review instance. */
  resetDecisions: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceResetDecisionsOptionalParams,
  ) => Promise<void>;
  /** An action to approve/deny all decisions for a review with certain filters. */
  recordAllDecisions: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    properties: RecordAllDecisionsProperties,
    options?: ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams,
  ) => Promise<void>;
  /** An action to stop an access review instance. */
  stop: (
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceStopOptionalParams,
  ) => Promise<void>;
}

function _getScopeAccessReviewInstance(context: AuthorizationManagementContext) {
  return {
    sendReminders: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      options?: ScopeAccessReviewInstanceSendRemindersOptionalParams,
    ) => sendReminders(context, scope, scheduleDefinitionId, id, options),
    applyDecisions: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      options?: ScopeAccessReviewInstanceApplyDecisionsOptionalParams,
    ) => applyDecisions(context, scope, scheduleDefinitionId, id, options),
    resetDecisions: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      options?: ScopeAccessReviewInstanceResetDecisionsOptionalParams,
    ) => resetDecisions(context, scope, scheduleDefinitionId, id, options),
    recordAllDecisions: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      properties: RecordAllDecisionsProperties,
      options?: ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams,
    ) => recordAllDecisions(context, scope, scheduleDefinitionId, id, properties, options),
    stop: (
      scope: string,
      scheduleDefinitionId: string,
      id: string,
      options?: ScopeAccessReviewInstanceStopOptionalParams,
    ) => stop(context, scope, scheduleDefinitionId, id, options),
  };
}

export function _getScopeAccessReviewInstanceOperations(
  context: AuthorizationManagementContext,
): ScopeAccessReviewInstanceOperations {
  return {
    ..._getScopeAccessReviewInstance(context),
  };
}
