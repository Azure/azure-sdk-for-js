// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KubernetesRuntimeContext as Client, OperationsListOptionalParams } from "../index.js";
import type {
  _OperationListResult,
  Operation} from "../../models/models.js";
import {
  _operationListResultDeserializer
} from "../../models/models.js";
import type {
  PagedAsyncIterableIterator} from "../../static-helpers/pagingHelpers.js";
import {
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import type {
  StreamableMethod,
  PathUncheckedResponse} from "@azure-rest/core-client";
import {
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _operationsListSend(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/providers/Microsoft.KubernetesRuntime/operations")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _operationsListDeserialize(
  result: PathUncheckedResponse,
): Promise<_OperationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
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
