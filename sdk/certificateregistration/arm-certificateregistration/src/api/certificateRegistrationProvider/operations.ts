// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementContext as Client } from "../index.js";
import {
  defaultErrorResponseDeserializer,
  _CsmOperationCollection,
  _csmOperationCollectionDeserializer,
  CsmOperationDescription,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { CertificateRegistrationProviderListOperationsOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listOperationsSend(
  context: Client,
  options: CertificateRegistrationProviderListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CertificateRegistration/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _csmOperationCollectionDeserializer(result.body);
}

/** Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
export function listOperations(
  context: Client,
  options: CertificateRegistrationProviderListOperationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CsmOperationDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationsSend(context, options),
    _listOperationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-01" },
  );
}
