// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type {
  AccessReviewHistoryDefinition,
  AccessReviewHistoryDefinitionProperties,
} from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  accessReviewHistoryDefinitionDeserializer,
  accessReviewHistoryDefinitionPropertiesSerializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessReviewHistoryDefinitionDeleteByIdOptionalParams,
  AccessReviewHistoryDefinitionCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _deleteByIdSend(
  context: Client,
  historyDefinitionId: string,
  options: AccessReviewHistoryDefinitionDeleteByIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewHistoryDefinitions/{historyDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      historyDefinitionId: historyDefinitionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteByIdDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an access review history definition */
export async function deleteById(
  context: Client,
  historyDefinitionId: string,
  options: AccessReviewHistoryDefinitionDeleteByIdOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteByIdSend(context, historyDefinitionId, options);
  return _deleteByIdDeserialize(result);
}

export function _createSend(
  context: Client,
  historyDefinitionId: string,
  properties: AccessReviewHistoryDefinitionProperties,
  options: AccessReviewHistoryDefinitionCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewHistoryDefinitions/{historyDefinitionId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      historyDefinitionId: historyDefinitionId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accessReviewHistoryDefinitionPropertiesSerializer(properties),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessReviewHistoryDefinition> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewHistoryDefinitionDeserializer(result.body);
}

/** Create a scheduled or one-time Access Review History Definition */
export async function create(
  context: Client,
  historyDefinitionId: string,
  properties: AccessReviewHistoryDefinitionProperties,
  options: AccessReviewHistoryDefinitionCreateOptionalParams = { requestOptions: {} },
): Promise<AccessReviewHistoryDefinition> {
  const result = await _createSend(context, historyDefinitionId, properties, options);
  return _createDeserialize(result);
}
