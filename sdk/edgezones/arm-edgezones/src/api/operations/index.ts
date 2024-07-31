// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Operation, _OperationListResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  EdgeZonesContext as Client,
  List200Response,
  ListDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import { OperationsListOptionalParams } from "../../models/options.js";

export function _listSend(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod<List200Response | ListDefaultResponse> {
  return context
    .path("/providers/Microsoft.EdgeZones/operations")
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _listDeserialize(
  result: List200Response | ListDefaultResponse,
): Promise<_OperationListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => {
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
export function list(
  context: Client,
  options: OperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Operation> {
  return buildPagedAsyncIterator(context, () => _listSend(context, options), _listDeserialize, {
    itemName: "value",
    nextLinkName: "nextLink",
  });
}
