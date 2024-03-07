// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedOperation, Operation } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  NetworkAnalyticsContext as Client,
  OperationsList200Response,
  OperationsListDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { OperationsListOptions } from "../../models/options.js";

export function _operationsListSend(
  context: Client,
  options: OperationsListOptions = { requestOptions: {} },
): StreamableMethod<OperationsList200Response | OperationsListDefaultResponse> {
  return context
    .path("/providers/Microsoft.NetworkAnalytics/operations")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _operationsListDeserialize(
  result: OperationsList200Response | OperationsListDefaultResponse,
): Promise<PagedOperation> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      name: p["name"],
      isDataAction: p["isDataAction"],
      display: !p.display
        ? undefined
        : {
            provider: p.display?.["provider"],
            resource: p.display?.["resource"],
            operation: p.display?.["operation"],
            description: p.display?.["description"],
          },
      origin: p["origin"],
      actionType: p["actionType"],
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List the operations for the provider */
export function operationsList(
  context: Client,
  options: OperationsListOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Operation> {
  return buildPagedAsyncIterator(
    context,
    () => _operationsListSend(context, options),
    _operationsListDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
