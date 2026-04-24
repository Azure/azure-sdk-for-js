// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  ComplianceResult,
  _ComplianceResultList,
} from "../../models/complianceResultsAPI/models.js";
import {
  complianceResultDeserializer,
  _complianceResultListDeserializer,
} from "../../models/complianceResultsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ComplianceResultsListOptionalParams,
  ComplianceResultsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: ComplianceResultsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/complianceResults{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2017-08-01",
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
): Promise<_ComplianceResultList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _complianceResultListDeserializer(result.body);
}

/** Security compliance results in the subscription */
export function list(
  context: Client,
  scope: string,
  options: ComplianceResultsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ComplianceResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2017-08-01" },
  );
}

export function _getSend(
  context: Client,
  resourceId: string,
  complianceResultName: string,
  options: ComplianceResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.Security/complianceResults/{complianceResultName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      complianceResultName: complianceResultName,
      "api%2Dversion": "2017-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ComplianceResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return complianceResultDeserializer(result.body);
}

/** Security Compliance Result */
export async function get(
  context: Client,
  resourceId: string,
  complianceResultName: string,
  options: ComplianceResultsGetOptionalParams = { requestOptions: {} },
): Promise<ComplianceResult> {
  const result = await _getSend(context, resourceId, complianceResultName, options);
  return _getDeserialize(result);
}
