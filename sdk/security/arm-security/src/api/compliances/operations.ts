// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { Compliance, _ComplianceList } from "../../models/legacySettingsAPI/models.js";
import {
  complianceDeserializer,
  _complianceListDeserializer,
} from "../../models/legacySettingsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CompliancesListOptionalParams, CompliancesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: CompliancesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/compliances{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2017-08-01-preview",
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_ComplianceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _complianceListDeserializer(result.body);
}

/** The Compliance scores of the specific management group. */
export function list(
  context: Client,
  scope: string,
  options: CompliancesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Compliance> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2017-08-01-preview" },
  );
}

export function _getSend(
  context: Client,
  scope: string,
  complianceName: string,
  options: CompliancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/compliances/{complianceName}{?api%2Dversion}",
    {
      scope: scope,
      complianceName: complianceName,
      "api%2Dversion": "2017-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Compliance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return complianceDeserializer(result.body);
}

/** Details of a specific Compliance. */
export async function get(
  context: Client,
  scope: string,
  complianceName: string,
  options: CompliancesGetOptionalParams = { requestOptions: {} },
): Promise<Compliance> {
  const result = await _getSend(context, scope, complianceName, options);
  return _getDeserialize(result);
}
