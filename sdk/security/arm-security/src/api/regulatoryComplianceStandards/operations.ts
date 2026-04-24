// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  RegulatoryComplianceStandard,
  _RegulatoryComplianceStandardList,
} from "../../models/regulatoryComplianceAPI/models.js";
import {
  regulatoryComplianceStandardDeserializer,
  _regulatoryComplianceStandardListDeserializer,
} from "../../models/regulatoryComplianceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegulatoryComplianceStandardsListOptionalParams,
  RegulatoryComplianceStandardsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: RegulatoryComplianceStandardsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/regulatoryComplianceStandards{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
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
): Promise<_RegulatoryComplianceStandardList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _regulatoryComplianceStandardListDeserializer(result.body);
}

/** Supported regulatory compliance standards details and state */
export function list(
  context: Client,
  options: RegulatoryComplianceStandardsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RegulatoryComplianceStandard> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-01-01-preview" },
  );
}

export function _getSend(
  context: Client,
  regulatoryComplianceStandardName: string,
  options: RegulatoryComplianceStandardsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/regulatoryComplianceStandards/{regulatoryComplianceStandardName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      regulatoryComplianceStandardName: regulatoryComplianceStandardName,
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
): Promise<RegulatoryComplianceStandard> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return regulatoryComplianceStandardDeserializer(result.body);
}

/** Supported regulatory compliance details state for selected standard */
export async function get(
  context: Client,
  regulatoryComplianceStandardName: string,
  options: RegulatoryComplianceStandardsGetOptionalParams = { requestOptions: {} },
): Promise<RegulatoryComplianceStandard> {
  const result = await _getSend(context, regulatoryComplianceStandardName, options);
  return _getDeserialize(result);
}
