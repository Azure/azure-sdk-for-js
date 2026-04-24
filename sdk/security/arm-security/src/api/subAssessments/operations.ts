// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  SubAssessmentsAPISecuritySubAssessment,
  _SubAssessmentsAPISecuritySubAssessmentList,
} from "../../models/subAssessmentsAPI/models.js";
import {
  subAssessmentsAPISecuritySubAssessmentDeserializer,
  _subAssessmentsAPISecuritySubAssessmentListDeserializer,
} from "../../models/subAssessmentsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SubAssessmentsListAllOptionalParams,
  SubAssessmentsListOptionalParams,
  SubAssessmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listAllSend(
  context: Client,
  scope: string,
  options: SubAssessmentsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/subAssessments{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2019-01-01-preview",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_SubAssessmentsAPISecuritySubAssessmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _subAssessmentsAPISecuritySubAssessmentListDeserializer(result.body);
}

/** Get security sub-assessments on all your scanned resources inside a subscription scope */
export function listAll(
  context: Client,
  scope: string,
  options: SubAssessmentsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubAssessmentsAPISecuritySubAssessment> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, scope, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-01-01-preview" },
  );
}

export function _listSend(
  context: Client,
  scope: string,
  assessmentName: string,
  options: SubAssessmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/assessments/{assessmentName}/subAssessments{?api%2Dversion}",
    {
      scope: scope,
      assessmentName: assessmentName,
      "api%2Dversion": "2019-01-01-preview",
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
): Promise<_SubAssessmentsAPISecuritySubAssessmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _subAssessmentsAPISecuritySubAssessmentListDeserializer(result.body);
}

/** Get security sub-assessments on all your scanned resources inside a scope */
export function list(
  context: Client,
  scope: string,
  assessmentName: string,
  options: SubAssessmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SubAssessmentsAPISecuritySubAssessment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, assessmentName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-01-01-preview" },
  );
}

export function _getSend(
  context: Client,
  scope: string,
  assessmentName: string,
  subAssessmentName: string,
  options: SubAssessmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/assessments/{assessmentName}/subAssessments/{subAssessmentName}{?api%2Dversion}",
    {
      scope: scope,
      assessmentName: assessmentName,
      subAssessmentName: subAssessmentName,
      "api%2Dversion": "2019-01-01-preview",
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
): Promise<SubAssessmentsAPISecuritySubAssessment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return subAssessmentsAPISecuritySubAssessmentDeserializer(result.body);
}

/** Get a security sub-assessment on your scanned resource */
export async function get(
  context: Client,
  scope: string,
  assessmentName: string,
  subAssessmentName: string,
  options: SubAssessmentsGetOptionalParams = { requestOptions: {} },
): Promise<SubAssessmentsAPISecuritySubAssessment> {
  const result = await _getSend(context, scope, assessmentName, subAssessmentName, options);
  return _getDeserialize(result);
}
