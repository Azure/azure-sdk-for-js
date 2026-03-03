// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainRegistrationManagementContext as Client } from "../index.js";
import type { _CsmOperationCollection, CsmOperationDescription } from "../../models/models.js";
import {
  defaultErrorResponseDeserializer,
  _csmOperationCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DomainRegistrationProviderListOperationsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listOperationsSend(
  context: Client,
  options: DomainRegistrationProviderListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.DomainRegistration/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
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

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_CsmOperationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = defaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return _csmOperationCollectionDeserializer(result.body);
}

/** Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export function listOperations(
  context: Client,
  options: DomainRegistrationProviderListOperationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmOperationDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationsSend(context, options),
    _listOperationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}
