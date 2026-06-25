// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  BookmarkExpandParameters,
  bookmarkExpandParametersSerializer,
  BookmarkExpandResponse,
  bookmarkExpandResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BookmarkOperationsExpandOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _expandSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  bookmarkId: string,
  parameters: BookmarkExpandParameters,
  options: BookmarkOperationsExpandOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/bookmarks/{bookmarkId}/expand{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      bookmarkId: bookmarkId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: bookmarkExpandParametersSerializer(parameters),
    });
}

export async function _expandDeserialize(
  result: PathUncheckedResponse,
): Promise<BookmarkExpandResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return bookmarkExpandResponseDeserializer(result.body);
}

/** Expand an bookmark */
export async function expand(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  bookmarkId: string,
  parameters: BookmarkExpandParameters,
  options: BookmarkOperationsExpandOptionalParams = { requestOptions: {} },
): Promise<BookmarkExpandResponse> {
  const result = await _expandSend(
    context,
    resourceGroupName,
    workspaceName,
    bookmarkId,
    parameters,
    options,
  );
  return _expandDeserialize(result);
}
