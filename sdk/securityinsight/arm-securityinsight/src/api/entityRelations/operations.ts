// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { Relation } from "../../models/models.js";
import { cloudErrorDeserializer, relationDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { EntityRelationsGetRelationOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getRelationSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  relationName: string,
  options: EntityRelationsGetRelationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/entities/{entityId}/relations/{relationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      entityId: entityId,
      relationName: relationName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getRelationDeserialize(result: PathUncheckedResponse): Promise<Relation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return relationDeserializer(result.body);
}

/** Gets an entity relation. */
export async function getRelation(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  entityId: string,
  relationName: string,
  options: EntityRelationsGetRelationOptionalParams = { requestOptions: {} },
): Promise<Relation> {
  const result = await _getRelationSend(
    context,
    resourceGroupName,
    workspaceName,
    entityId,
    relationName,
    options,
  );
  return _getRelationDeserialize(result);
}
