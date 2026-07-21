// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DomainServicesResourceProviderContext as Client } from "../index.js";
import type { _OperationEntityListResult, OperationEntity } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _operationEntityListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DomainServiceOperationsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: DomainServiceOperationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.AAD/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
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
): Promise<_OperationEntityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _operationEntityListResultDeserializer(result.body);
}

/** Lists all the available Domain Services operations. */
export function list(
  context: Client,
  options: DomainServiceOperationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<OperationEntity> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-01-preview",
    },
  );
}
