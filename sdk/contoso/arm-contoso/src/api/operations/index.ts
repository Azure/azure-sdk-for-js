// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContosoContext as Client, OperationsListOptionalParams } from "../index.js";
import {
  errorResponseDeserializer,
  _OperationListResult,
  _operationListResultDeserializer,
  Operation,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _operationsListSend(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context.path("/providers/Microsoft.Contoso/operations").get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    queryParameters: { "api-version": context.apiVersion },
  });
}

export async function _operationsListDeserialize(
  result: PathUncheckedResponse,
): Promise<_OperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _operationListResultDeserializer(result.body);
}

/** List the operations for the provider */
export function operationsList(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Operation> {
  return buildPagedAsyncIterator(
    context,
    () => _operationsListSend(context, options),
    _operationsListDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
