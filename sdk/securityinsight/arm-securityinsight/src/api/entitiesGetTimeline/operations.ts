// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { EntityTimelineParameters, EntityTimelineResponse } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  entityTimelineParametersSerializer,
  entityTimelineResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { EntitiesGetTimelineListOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  parameters: EntityTimelineParameters,
  options: EntitiesGetTimelineListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityId}/getTimeline{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      entityId: entityId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: entityTimelineParametersSerializer(parameters),
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<EntityTimelineResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return entityTimelineResponseDeserializer(result.body);
}

/** Timeline for an entity. */
export async function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  parameters: EntityTimelineParameters,
  options: EntitiesGetTimelineListOptionalParams = { requestOptions: {} },
): Promise<EntityTimelineResponse> {
  const result = await _listSend(
    context,
    resourceGroupName,
    workspaceName,
    entityId,
    parameters,
    options,
  );
  return _listDeserialize(result);
}
