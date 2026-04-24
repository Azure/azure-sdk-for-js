// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  RegulatoryComplianceControl,
  _RegulatoryComplianceControlList,
} from "../../models/regulatoryComplianceAPI/models.js";
import {
  regulatoryComplianceControlDeserializer,
  _regulatoryComplianceControlListDeserializer,
} from "../../models/regulatoryComplianceAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RegulatoryComplianceControlsListOptionalParams,
  RegulatoryComplianceControlsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  regulatoryComplianceStandardName: string,
  options: RegulatoryComplianceControlsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/regulatoryComplianceStandards/{regulatoryComplianceStandardName}/regulatoryComplianceControls{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      regulatoryComplianceStandardName: regulatoryComplianceStandardName,
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
): Promise<_RegulatoryComplianceControlList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _regulatoryComplianceControlListDeserializer(result.body);
}

/** All supported regulatory compliance controls details and state for selected standard */
export function list(
  context: Client,
  regulatoryComplianceStandardName: string,
  options: RegulatoryComplianceControlsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RegulatoryComplianceControl> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, regulatoryComplianceStandardName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2019-01-01-preview" },
  );
}

export function _getSend(
  context: Client,
  regulatoryComplianceStandardName: string,
  regulatoryComplianceControlName: string,
  options: RegulatoryComplianceControlsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/regulatoryComplianceStandards/{regulatoryComplianceStandardName}/regulatoryComplianceControls/{regulatoryComplianceControlName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      regulatoryComplianceStandardName: regulatoryComplianceStandardName,
      regulatoryComplianceControlName: regulatoryComplianceControlName,
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
): Promise<RegulatoryComplianceControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return regulatoryComplianceControlDeserializer(result.body);
}

/** Selected regulatory compliance control details and state */
export async function get(
  context: Client,
  regulatoryComplianceStandardName: string,
  regulatoryComplianceControlName: string,
  options: RegulatoryComplianceControlsGetOptionalParams = { requestOptions: {} },
): Promise<RegulatoryComplianceControl> {
  const result = await _getSend(
    context,
    regulatoryComplianceStandardName,
    regulatoryComplianceControlName,
    options,
  );
  return _getDeserialize(result);
}
