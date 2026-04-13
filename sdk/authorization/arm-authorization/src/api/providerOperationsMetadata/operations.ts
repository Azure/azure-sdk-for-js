// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { ProviderOperationsMetadata } from "../../models/microsoft/providerOperations/models.js";
import { providerOperationsMetadataDeserializer } from "../../models/microsoft/providerOperations/models.js";
import type { _ProviderOperationsMetadataListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _providerOperationsMetadataListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProviderOperationsMetadataListOptionalParams,
  ProviderOperationsMetadataGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ProviderOperationsMetadataListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/providerOperations{?api%2Dversion,%24expand}",
    {
      "api%2Dversion": "2022-04-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProviderOperationsMetadataListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _providerOperationsMetadataListResultDeserializer(result.body);
}

/** Gets provider operations metadata for all resource providers. */
export function list(
  context: Client,
  options: ProviderOperationsMetadataListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProviderOperationsMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-04-01" },
  );
}

export function _getSend(
  context: Client,
  resourceProviderNamespace: string,
  options: ProviderOperationsMetadataGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Authorization/providerOperations/{+resourceProviderNamespace}{?api%2Dversion,%24expand}",
    {
      resourceProviderNamespace: resourceProviderNamespace,
      "api%2Dversion": "2022-04-01",
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
): Promise<ProviderOperationsMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return providerOperationsMetadataDeserializer(result.body);
}

/** Gets provider operations metadata for the specified resource provider. */
export async function get(
  context: Client,
  resourceProviderNamespace: string,
  options: ProviderOperationsMetadataGetOptionalParams = { requestOptions: {} },
): Promise<ProviderOperationsMetadata> {
  const result = await _getSend(context, resourceProviderNamespace, options);
  return _getDeserialize(result);
}
