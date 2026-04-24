// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  RegulatoryComplianceAssessment,
  _RegulatoryComplianceAssessmentList,
} from "../../models/regulatoryComplianceAPI/models.js";
import {
  regulatoryComplianceAssessmentDeserializer,
  _regulatoryComplianceAssessmentListDeserializer,
} from "../../models/regulatoryComplianceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegulatoryComplianceAssessmentsListOptionalParams,
  RegulatoryComplianceAssessmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  regulatoryComplianceStandardName: string,
  regulatoryComplianceControlName: string,
  options: RegulatoryComplianceAssessmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/regulatoryComplianceStandards/{regulatoryComplianceStandardName}/regulatoryComplianceControls/{regulatoryComplianceControlName}/regulatoryComplianceAssessments{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      regulatoryComplianceStandardName: regulatoryComplianceStandardName,
      regulatoryComplianceControlName: regulatoryComplianceControlName,
      "api%2Dversion": "2019-01-01-preview",
      "%24filter": options?.filter,
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
): Promise<_RegulatoryComplianceAssessmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _regulatoryComplianceAssessmentListDeserializer(result.body);
}

/** Details and state of assessments mapped to selected regulatory compliance control */
export function list(
  context: Client,
  regulatoryComplianceStandardName: string,
  regulatoryComplianceControlName: string,
  options: RegulatoryComplianceAssessmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RegulatoryComplianceAssessment> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        regulatoryComplianceStandardName,
        regulatoryComplianceControlName,
        options,
      ),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-01-01-preview" },
  );
}

export function _getSend(
  context: Client,
  regulatoryComplianceStandardName: string,
  regulatoryComplianceControlName: string,
  regulatoryComplianceAssessmentName: string,
  options: RegulatoryComplianceAssessmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/regulatoryComplianceStandards/{regulatoryComplianceStandardName}/regulatoryComplianceControls/{regulatoryComplianceControlName}/regulatoryComplianceAssessments/{regulatoryComplianceAssessmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      regulatoryComplianceStandardName: regulatoryComplianceStandardName,
      regulatoryComplianceControlName: regulatoryComplianceControlName,
      regulatoryComplianceAssessmentName: regulatoryComplianceAssessmentName,
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
): Promise<RegulatoryComplianceAssessment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return regulatoryComplianceAssessmentDeserializer(result.body);
}

/** Supported regulatory compliance details and state for selected assessment */
export async function get(
  context: Client,
  regulatoryComplianceStandardName: string,
  regulatoryComplianceControlName: string,
  regulatoryComplianceAssessmentName: string,
  options: RegulatoryComplianceAssessmentsGetOptionalParams = { requestOptions: {} },
): Promise<RegulatoryComplianceAssessment> {
  const result = await _getSend(
    context,
    regulatoryComplianceStandardName,
    regulatoryComplianceControlName,
    regulatoryComplianceAssessmentName,
    options,
  );
  return _getDeserialize(result);
}
