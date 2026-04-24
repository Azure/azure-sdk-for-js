// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type {
  SecurityAssessmentMetadataResponse,
  _SecurityAssessmentMetadataResponseList,
} from "../../models/assessmentAPI/models.js";
import {
  securityAssessmentMetadataResponseSerializer,
  securityAssessmentMetadataResponseDeserializer,
  _securityAssessmentMetadataResponseListDeserializer,
} from "../../models/assessmentAPI/models.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AssessmentsMetadataListOptionalParams,
  AssessmentsMetadataGetOptionalParams,
  AssessmentsMetadataListBySubscriptionOptionalParams,
  AssessmentsMetadataDeleteInSubscriptionOptionalParams,
  AssessmentsMetadataCreateInSubscriptionOptionalParams,
  AssessmentsMetadataGetInSubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: AssessmentsMetadataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Security/assessmentMetadata{?api%2Dversion}",
    {
      "api%2Dversion": "2025-05-04",
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
): Promise<_SecurityAssessmentMetadataResponseList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityAssessmentMetadataResponseListDeserializer(result.body);
}

/** Get metadata information on all assessment types */
export function list(
  context: Client,
  options: AssessmentsMetadataListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityAssessmentMetadataResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-04" },
  );
}

export function _getSend(
  context: Client,
  assessmentMetadataName: string,
  options: AssessmentsMetadataGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Security/assessmentMetadata/{assessmentMetadataName}{?api%2Dversion}",
    {
      assessmentMetadataName: assessmentMetadataName,
      "api%2Dversion": "2025-05-04",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityAssessmentMetadataResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityAssessmentMetadataResponseDeserializer(result.body);
}

/** Get metadata information on an assessment type */
export async function get(
  context: Client,
  assessmentMetadataName: string,
  options: AssessmentsMetadataGetOptionalParams = { requestOptions: {} },
): Promise<SecurityAssessmentMetadataResponse> {
  const result = await _getSend(context, assessmentMetadataName, options);
  return _getDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: AssessmentsMetadataListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/assessmentMetadata{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-04",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SecurityAssessmentMetadataResponseList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _securityAssessmentMetadataResponseListDeserializer(result.body);
}

/** Get metadata information on all assessment types in a specific subscription */
export function listBySubscription(
  context: Client,
  options: AssessmentsMetadataListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityAssessmentMetadataResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-04" },
  );
}

export function _deleteInSubscriptionSend(
  context: Client,
  assessmentMetadataName: string,
  options: AssessmentsMetadataDeleteInSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/assessmentMetadata/{assessmentMetadataName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      assessmentMetadataName: assessmentMetadataName,
      "api%2Dversion": "2025-05-04",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteInSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete metadata information on an assessment type in a specific subscription, will cause the deletion of all the assessments of that type in that subscription */
export async function deleteInSubscription(
  context: Client,
  assessmentMetadataName: string,
  options: AssessmentsMetadataDeleteInSubscriptionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteInSubscriptionSend(context, assessmentMetadataName, options);
  return _deleteInSubscriptionDeserialize(result);
}

export function _createInSubscriptionSend(
  context: Client,
  assessmentMetadataName: string,
  assessmentMetadata: SecurityAssessmentMetadataResponse,
  options: AssessmentsMetadataCreateInSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/assessmentMetadata/{assessmentMetadataName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      assessmentMetadataName: assessmentMetadataName,
      "api%2Dversion": "2025-05-04",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityAssessmentMetadataResponseSerializer(assessmentMetadata),
  });
}

export async function _createInSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityAssessmentMetadataResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityAssessmentMetadataResponseDeserializer(result.body);
}

/** Create metadata information on an assessment type in a specific subscription */
export async function createInSubscription(
  context: Client,
  assessmentMetadataName: string,
  assessmentMetadata: SecurityAssessmentMetadataResponse,
  options: AssessmentsMetadataCreateInSubscriptionOptionalParams = { requestOptions: {} },
): Promise<SecurityAssessmentMetadataResponse> {
  const result = await _createInSubscriptionSend(
    context,
    assessmentMetadataName,
    assessmentMetadata,
    options,
  );
  return _createInSubscriptionDeserialize(result);
}

export function _getInSubscriptionSend(
  context: Client,
  assessmentMetadataName: string,
  options: AssessmentsMetadataGetInSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/assessmentMetadata/{assessmentMetadataName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      assessmentMetadataName: assessmentMetadataName,
      "api%2Dversion": "2025-05-04",
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

export async function _getInSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityAssessmentMetadataResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return securityAssessmentMetadataResponseDeserializer(result.body);
}

/** Get metadata information on an assessment type in a specific subscription */
export async function getInSubscription(
  context: Client,
  assessmentMetadataName: string,
  options: AssessmentsMetadataGetInSubscriptionOptionalParams = { requestOptions: {} },
): Promise<SecurityAssessmentMetadataResponse> {
  const result = await _getInSubscriptionSend(context, assessmentMetadataName, options);
  return _getInSubscriptionDeserialize(result);
}
