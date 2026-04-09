// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext } from "../../api/authorizationManagementContext.js";
import {
  acceptRecommendations,
  sendReminders,
  applyDecisions,
  resetDecisions,
  stop,
} from "../../api/accessReviewInstance/operations.js";
import type {
  AccessReviewInstanceAcceptRecommendationsOptionalParams,
  AccessReviewInstanceSendRemindersOptionalParams,
  AccessReviewInstanceApplyDecisionsOptionalParams,
  AccessReviewInstanceResetDecisionsOptionalParams,
  AccessReviewInstanceStopOptionalParams,
} from "../../api/accessReviewInstance/options.js";

/** Interface representing a AccessReviewInstance operations. */
export interface AccessReviewInstanceOperations {
  /** An action to accept recommendations for decision in an access review instance. */
  acceptRecommendations: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceAcceptRecommendationsOptionalParams,
  ) => Promise<void>;
  /** An action to send reminders for an access review instance. */
  sendReminders: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceSendRemindersOptionalParams,
  ) => Promise<void>;
  /** An action to apply all decisions for an access review instance. */
  applyDecisions: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceApplyDecisionsOptionalParams,
  ) => Promise<void>;
  /** An action to reset all decisions for an access review instance. */
  resetDecisions: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceResetDecisionsOptionalParams,
  ) => Promise<void>;
  /** An action to stop an access review instance. */
  stop: (
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstanceStopOptionalParams,
  ) => Promise<void>;
}

function _getAccessReviewInstance(context: AuthorizationManagementContext) {
  return {
    acceptRecommendations: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceAcceptRecommendationsOptionalParams,
    ) => acceptRecommendations(context, scheduleDefinitionId, id, options),
    sendReminders: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceSendRemindersOptionalParams,
    ) => sendReminders(context, scheduleDefinitionId, id, options),
    applyDecisions: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceApplyDecisionsOptionalParams,
    ) => applyDecisions(context, scheduleDefinitionId, id, options),
    resetDecisions: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceResetDecisionsOptionalParams,
    ) => resetDecisions(context, scheduleDefinitionId, id, options),
    stop: (
      scheduleDefinitionId: string,
      id: string,
      options?: AccessReviewInstanceStopOptionalParams,
    ) => stop(context, scheduleDefinitionId, id, options),
  };
}

export function _getAccessReviewInstanceOperations(
  context: AuthorizationManagementContext,
): AccessReviewInstanceOperations {
  return {
    ..._getAccessReviewInstance(context),
  };
}
