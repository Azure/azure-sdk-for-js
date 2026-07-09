// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  RaiBlocklistItemPropertiesBasicResource,
  _RaiBlocklistItemPropertiesBasicResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _raiBlocklistItemPropertiesBasicResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ConnectionRaiBlocklistItemsListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  options: ConnectionRaiBlocklistItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/connections/{connectionName}/raiBlocklists/{raiBlocklistName}/raiBlocklistItems{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      connectionName: connectionName,
      raiBlocklistName: raiBlocklistName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
      "proxy%2Dapi%2Dversion": options?.proxyApiVersion,
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
): Promise<_RaiBlocklistItemPropertiesBasicResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _raiBlocklistItemPropertiesBasicResourceArmPaginatedResultDeserializer(result.body);
}

/** Gets the custom blocklist items associated with the Azure OpenAI connection. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  connectionName: string,
  raiBlocklistName: string,
  options: ConnectionRaiBlocklistItemsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RaiBlocklistItemPropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        workspaceName,
        connectionName,
        raiBlocklistName,
        options,
      ),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}
