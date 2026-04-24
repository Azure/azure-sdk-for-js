// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import type {
  AssessmentAPISecurityAssessmentResponse,
  AssessmentAPISecurityAssessment,
  _AssessmentAPISecurityAssessmentList,
} from "../../models/assessmentAPI/models.js";
import {
  assessmentAPISecurityAssessmentResponseDeserializer,
  assessmentAPISecurityAssessmentSerializer,
  _assessmentAPISecurityAssessmentListDeserializer,
} from "../../models/assessmentAPI/models.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AssessmentsListOptionalParams,
  AssessmentsDeleteOptionalParams,
  AssessmentsCreateOrUpdateOptionalParams,
  AssessmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: AssessmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/assessments{?api%2Dversion}",
    {
      scope: scope,
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
): Promise<_AssessmentAPISecurityAssessmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _assessmentAPISecurityAssessmentListDeserializer(result.body);
}

/** Get security assessments on all your scanned resources inside a scope */
export function list(
  context: Client,
  scope: string,
  options: AssessmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AssessmentAPISecurityAssessmentResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-04" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceId: string,
  assessmentName: string,
  options: AssessmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/assessments/{assessmentName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      assessmentName: assessmentName,
      "api%2Dversion": "2025-05-04",
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
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result */
export async function $delete(
  context: Client,
  resourceId: string,
  assessmentName: string,
  options: AssessmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceId, assessmentName, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceId: string,
  assessmentName: string,
  assessment: AssessmentAPISecurityAssessment,
  options: AssessmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/assessments/{assessmentName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      assessmentName: assessmentName,
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
    body: assessmentAPISecurityAssessmentSerializer(assessment),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AssessmentAPISecurityAssessmentResponse> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return assessmentAPISecurityAssessmentResponseDeserializer(result.body);
}

/** Create a security assessment on your resource. An assessment metadata that describes this assessment must be predefined with the same name before inserting the assessment result */
export async function createOrUpdate(
  context: Client,
  resourceId: string,
  assessmentName: string,
  assessment: AssessmentAPISecurityAssessment,
  options: AssessmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<AssessmentAPISecurityAssessmentResponse> {
  const result = await _createOrUpdateSend(
    context,
    resourceId,
    assessmentName,
    assessment,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceId: string,
  assessmentName: string,
  options: AssessmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/assessments/{assessmentName}{?api%2Dversion,%24expand}",
    {
      resourceId: resourceId,
      assessmentName: assessmentName,
      "api%2Dversion": "2025-05-04",
      "%24expand": options?.expand,
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
): Promise<AssessmentAPISecurityAssessmentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return assessmentAPISecurityAssessmentResponseDeserializer(result.body);
}

/** Get a security assessment on your scanned resource */
export async function get(
  context: Client,
  resourceId: string,
  assessmentName: string,
  options: AssessmentsGetOptionalParams = { requestOptions: {} },
): Promise<AssessmentAPISecurityAssessmentResponse> {
  const result = await _getSend(context, resourceId, assessmentName, options);
  return _getDeserialize(result);
}
