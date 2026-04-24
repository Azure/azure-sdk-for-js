// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  SecurityStandard,
  _SecurityStandardList,
} from "../../models/securityStandardsAPI/models.js";
import {
  securityStandardSerializer,
  securityStandardDeserializer,
  _securityStandardListDeserializer,
} from "../../models/securityStandardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SecurityStandardsListOptionalParams,
  SecurityStandardsDeleteOptionalParams,
  SecurityStandardsCreateOrUpdateOptionalParams,
  SecurityStandardsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scope: string,
  options: SecurityStandardsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/securityStandards{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": "2024-08-01",
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
): Promise<_SecurityStandardList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _securityStandardListDeserializer(result.body);
}

/** Get a list of all relevant security standards over a scope */
export function list(
  context: Client,
  scope: string,
  options: SecurityStandardsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SecurityStandard> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scope, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  scope: string,
  standardId: string,
  options: SecurityStandardsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/securityStandards/{standardId}{?api%2Dversion}",
    {
      scope: scope,
      standardId: standardId,
      "api%2Dversion": "2024-08-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a security standard over a given scope */
export async function $delete(
  context: Client,
  scope: string,
  standardId: string,
  options: SecurityStandardsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, scope, standardId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  scope: string,
  standardId: string,
  standard: SecurityStandard,
  options: SecurityStandardsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/securityStandards/{standardId}{?api%2Dversion}",
    {
      scope: scope,
      standardId: standardId,
      "api%2Dversion": "2024-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: securityStandardSerializer(standard),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SecurityStandard> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityStandardDeserializer(result.body);
}

/** Creates or updates a security standard over a given scope */
export async function createOrUpdate(
  context: Client,
  scope: string,
  standardId: string,
  standard: SecurityStandard,
  options: SecurityStandardsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SecurityStandard> {
  const result = await _createOrUpdateSend(context, scope, standardId, standard, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  scope: string,
  standardId: string,
  options: SecurityStandardsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Security/securityStandards/{standardId}{?api%2Dversion}",
    {
      scope: scope,
      standardId: standardId,
      "api%2Dversion": "2024-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SecurityStandard> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return securityStandardDeserializer(result.body);
}

/** Get a specific security standard for the requested scope by standardId */
export async function get(
  context: Client,
  scope: string,
  standardId: string,
  options: SecurityStandardsGetOptionalParams = { requestOptions: {} },
): Promise<SecurityStandard> {
  const result = await _getSend(context, scope, standardId, options);
  return _getDeserialize(result);
}
