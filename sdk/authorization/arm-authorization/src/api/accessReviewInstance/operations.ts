// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import { errorDefinitionDeserializer } from "../../models/microsoft/attributeNamespaces/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessReviewInstanceAcceptRecommendationsOptionalParams,
  AccessReviewInstanceSendRemindersOptionalParams,
  AccessReviewInstanceApplyDecisionsOptionalParams,
  AccessReviewInstanceResetDecisionsOptionalParams,
  AccessReviewInstanceStopOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _acceptRecommendationsSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceAcceptRecommendationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/acceptRecommendations{?api%2Dversion}",
    {
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _acceptRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** An action to accept recommendations for decision in an access review instance. */
export async function acceptRecommendations(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceAcceptRecommendationsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _acceptRecommendationsSend(context, scheduleDefinitionId, id, options);
  return _acceptRecommendationsDeserialize(result);
}

export function _sendRemindersSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceSendRemindersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/sendReminders{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _sendRemindersDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** An action to send reminders for an access review instance. */
export async function sendReminders(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceSendRemindersOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendRemindersSend(context, scheduleDefinitionId, id, options);
  return _sendRemindersDeserialize(result);
}

export function _applyDecisionsSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceApplyDecisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/applyDecisions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _applyDecisionsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** An action to apply all decisions for an access review instance. */
export async function applyDecisions(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceApplyDecisionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _applyDecisionsSend(context, scheduleDefinitionId, id, options);
  return _applyDecisionsDeserialize(result);
}

export function _resetDecisionsSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceResetDecisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/resetDecisions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetDecisionsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** An action to reset all decisions for an access review instance. */
export async function resetDecisions(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceResetDecisionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetDecisionsSend(context, scheduleDefinitionId, id, options);
  return _resetDecisionsDeserialize(result);
}

export function _stopSend(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** An action to stop an access review instance. */
export async function stop(
  context: Client,
  scheduleDefinitionId: string,
  id: string,
  options: AccessReviewInstanceStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, scheduleDefinitionId, id, options);
  return _stopDeserialize(result);
}
