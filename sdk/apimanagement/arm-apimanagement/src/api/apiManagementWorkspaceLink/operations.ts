// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { ApiManagementWorkspaceLinksResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  apiManagementWorkspaceLinksResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ApiManagementWorkspaceLinkGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  options: ApiManagementWorkspaceLinkGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/workspaceLinks/{workspaceId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      workspaceId: workspaceId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ApiManagementWorkspaceLinksResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return apiManagementWorkspaceLinksResourceDeserializer(result.body);
}

/** Gets an API Management WorkspaceLink resource description. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  workspaceId: string,
  options: ApiManagementWorkspaceLinkGetOptionalParams = { requestOptions: {} },
): Promise<ApiManagementWorkspaceLinksResource> {
  const result = await _getSend(context, resourceGroupName, serviceName, workspaceId, options);
  return _getDeserialize(result);
}
