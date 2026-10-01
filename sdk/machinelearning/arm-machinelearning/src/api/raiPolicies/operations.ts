// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  RaiPolicyPropertiesBasicResource,
  _RaiPolicyPropertiesBasicResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _raiPolicyPropertiesBasicResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RaiPoliciesListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: RaiPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/endpoints/{endpointName}/raiPolicies{?api%2Dversion,proxy%2Dapi%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
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
): Promise<_RaiPolicyPropertiesBasicResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _raiPolicyPropertiesBasicResourceArmPaginatedResultDeserializer(result.body);
}

/** List the specified Content Filters associated with the Azure OpenAI account. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: RaiPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RaiPolicyPropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, endpointName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}
