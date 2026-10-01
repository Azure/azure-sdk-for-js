// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext as Client } from "../index.js";
import type { AssessmentResult, _AssessmentListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  assessmentResultSerializer,
  assessmentResultDeserializer,
  _assessmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsPutOptionalParams,
  AssessmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AssessmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/assessments{?api%2Dversion,%24top,%24skiptoken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      "%24top": options?.top,
      "%24skiptoken": options?.skiptoken,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AssessmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _assessmentListResultDeserializer(result.body);
}

/** Get list of Azure Advisor assessments. */
export function list(
  context: Client,
  options: AssessmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AssessmentResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  assessmentName: string,
  options: AssessmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/assessments/{assessmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      assessmentName: assessmentName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete an existing Azure Advisor assessment. */
export async function $delete(
  context: Client,
  assessmentName: string,
  options: AssessmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, assessmentName, options);
  return _$deleteDeserialize(result);
}

export function _putSend(
  context: Client,
  assessmentName: string,
  assessmentContract: AssessmentResult,
  options: AssessmentsPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/assessments/{assessmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      assessmentName: assessmentName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: assessmentResultSerializer(assessmentContract),
  });
}

export async function _putDeserialize(result: PathUncheckedResponse): Promise<AssessmentResult> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assessmentResultDeserializer(result.body);
}

/** Create or Overwrite Azure Advisor assessment. */
export async function put(
  context: Client,
  assessmentName: string,
  assessmentContract: AssessmentResult,
  options: AssessmentsPutOptionalParams = { requestOptions: {} },
): Promise<AssessmentResult> {
  const result = await _putSend(context, assessmentName, assessmentContract, options);
  return _putDeserialize(result);
}

export function _getSend(
  context: Client,
  assessmentName: string,
  options: AssessmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/assessments/{assessmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      assessmentName: assessmentName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AssessmentResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assessmentResultDeserializer(result.body);
}

/** Get an existing Azure Advisor assessment. */
export async function get(
  context: Client,
  assessmentName: string,
  options: AssessmentsGetOptionalParams = { requestOptions: {} },
): Promise<AssessmentResult> {
  const result = await _getSend(context, assessmentName, options);
  return _getDeserialize(result);
}
