// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  RegulatoryComplianceAPIRegulatoryComplianceControl,
  _RegulatoryComplianceAPIRegulatoryComplianceControlList,
} from "../../models/regulatoryComplianceAPI/models.js";
import {
  regulatoryComplianceAPIRegulatoryComplianceControlDeserializer,
  _regulatoryComplianceAPIRegulatoryComplianceControlListDeserializer,
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
): Promise<_RegulatoryComplianceAPIRegulatoryComplianceControlList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _regulatoryComplianceAPIRegulatoryComplianceControlListDeserializer(result.body);
}

/** All supported regulatory compliance controls details and state for selected standard */
export function list(
  context: Client,
  regulatoryComplianceStandardName: string,
  options: RegulatoryComplianceControlsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RegulatoryComplianceAPIRegulatoryComplianceControl> {
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
): Promise<RegulatoryComplianceAPIRegulatoryComplianceControl> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return regulatoryComplianceAPIRegulatoryComplianceControlDeserializer(result.body);
}

/** Selected regulatory compliance control details and state */
export async function get(
  context: Client,
  regulatoryComplianceStandardName: string,
  regulatoryComplianceControlName: string,
  options: RegulatoryComplianceControlsGetOptionalParams = { requestOptions: {} },
): Promise<RegulatoryComplianceAPIRegulatoryComplianceControl> {
  const result = await _getSend(
    context,
    regulatoryComplianceStandardName,
    regulatoryComplianceControlName,
    options,
  );
  return _getDeserialize(result);
}
