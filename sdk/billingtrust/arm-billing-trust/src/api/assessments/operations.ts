// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BillingTrustContext as Client } from "../index.js";
import type {
  Assessment,
  _AssessmentListResult,
  GenerateUploadTokenResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  assessmentSerializer,
  assessmentDeserializer,
  _assessmentListResultDeserializer,
  generateUploadTokenResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AssessmentsListUploadTokenOptionalParams,
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsCreateOrUpdateOptionalParams,
  AssessmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listUploadTokenSend(
  context: Client,
  resourceUri: string,
  options: AssessmentsListUploadTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default/listUploadToken{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listUploadTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateUploadTokenResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return generateUploadTokenResponseDeserializer(result.body);
}

/** Request a time-bound, principal-bound upload token for supplemental document uploads. */
export async function listUploadToken(
  context: Client,
  resourceUri: string,
  options: AssessmentsListUploadTokenOptionalParams = { requestOptions: {} },
): Promise<GenerateUploadTokenResponse> {
  const result = await _listUploadTokenSend(context, resourceUri, options);
  return _listUploadTokenDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceUri: string,
  options: AssessmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
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

/** List Assessment resources by parent */
export function list(
  context: Client,
  resourceUri: string,
  options: AssessmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Assessment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceUri, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-17-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  options: AssessmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete an assessment. Long-running operation — returns 202 + 204 + default with `Azure-AsyncOperation` (preferred) and `Location` polling headers. */
export function $delete(
  context: Client,
  resourceUri: string,
  options: AssessmentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-17-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceUri: string,
  resource: Assessment,
  options: AssessmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: assessmentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<Assessment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assessmentDeserializer(result.body);
}

/** Create or update an Assessment. Long-running operation — returns 200 (replace) or 201 (create) with the `Azure-AsyncOperation` polling header on both responses. */
export function createOrUpdate(
  context: Client,
  resourceUri: string,
  resource: Assessment,
  options: AssessmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Assessment>, Assessment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, resourceUri, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-17-preview",
  }) as PollerLike<OperationState<Assessment>, Assessment>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  options: AssessmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.BillingTrust/assessments/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-03-17-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Assessment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return assessmentDeserializer(result.body);
}

/** Get a Assessment */
export async function get(
  context: Client,
  resourceUri: string,
  options: AssessmentsGetOptionalParams = { requestOptions: {} },
): Promise<Assessment> {
  const result = await _getSend(context, resourceUri, options);
  return _getDeserialize(result);
}
