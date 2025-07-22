// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesContext as Client } from "../index.js";
import {
  _OperationList,
  _operationListDeserializer,
  Operation,
  errorResponseDeserializer,
} from "../../models/models.js";
import { OperationsGetOptionalParams } from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  options: OperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Kubernetes/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<_OperationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _operationListDeserializer(result.body);
}

/** List the operations for the provider */
export function get(
  context: Client,
  options: OperationsGetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Operation> {
  return buildPagedAsyncIterator(
    context,
    () => _getSend(context, options),
    _getDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
