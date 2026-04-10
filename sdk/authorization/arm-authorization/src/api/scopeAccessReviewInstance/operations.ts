// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { RecordAllDecisionsProperties } from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  recordAllDecisionsPropertiesSerializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScopeAccessReviewInstanceSendRemindersOptionalParams,
  ScopeAccessReviewInstanceApplyDecisionsOptionalParams,
  ScopeAccessReviewInstanceResetDecisionsOptionalParams,
  ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams,
  ScopeAccessReviewInstanceStopOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _sendRemindersSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceSendRemindersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/sendReminders{?api%2Dversion}",
    {
      scope: scope,
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
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceSendRemindersOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _sendRemindersSend(context, scope, scheduleDefinitionId, id, options);
  return _sendRemindersDeserialize(result);
}

export function _applyDecisionsSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceApplyDecisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/applyDecisions{?api%2Dversion}",
    {
      scope: scope,
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
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceApplyDecisionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _applyDecisionsSend(context, scope, scheduleDefinitionId, id, options);
  return _applyDecisionsDeserialize(result);
}

export function _resetDecisionsSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceResetDecisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/resetDecisions{?api%2Dversion}",
    {
      scope: scope,
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
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceResetDecisionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetDecisionsSend(context, scope, scheduleDefinitionId, id, options);
  return _resetDecisionsDeserialize(result);
}

export function _recordAllDecisionsSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  properties: RecordAllDecisionsProperties,
  options: ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/recordAllDecisions{?api%2Dversion}",
    {
      scope: scope,
      scheduleDefinitionId: scheduleDefinitionId,
      id: id,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: recordAllDecisionsPropertiesSerializer(properties),
  });
}

export async function _recordAllDecisionsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** An action to approve/deny all decisions for a review with certain filters. */
export async function recordAllDecisions(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  properties: RecordAllDecisionsProperties,
  options: ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _recordAllDecisionsSend(
    context,
    scope,
    scheduleDefinitionId,
    id,
    properties,
    options,
  );
  return _recordAllDecisionsDeserialize(result);
}

export function _stopSend(
  context: Client,
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/stop{?api%2Dversion}",
    {
      scope: scope,
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
  scope: string,
  scheduleDefinitionId: string,
  id: string,
  options: ScopeAccessReviewInstanceStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, scope, scheduleDefinitionId, id, options);
  return _stopDeserialize(result);
}
