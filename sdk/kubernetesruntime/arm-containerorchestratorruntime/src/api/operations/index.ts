// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Operation, _OperationListResult } from "../../models/models.js";
import { KubernetesRuntimeContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { OperationsListOptionalParams } from "../../models/options.js";

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

  return {
    value: result.body["value"].map((p: any) => {
      return {
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
      };
    }),
    nextLink: result.body["nextLink"],
  };
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
