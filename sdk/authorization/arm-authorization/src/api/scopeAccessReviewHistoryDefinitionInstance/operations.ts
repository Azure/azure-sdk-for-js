// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type { AccessReviewHistoryInstance } from "../../models/microsoft/attributeNamespaces/models.js";
import {
  errorDefinitionDeserializer,
  accessReviewHistoryInstanceDeserializer,
} from "../../models/microsoft/attributeNamespaces/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ScopeAccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _generateDownloadUriSend(
  context: Client,
  scope: string,
  historyDefinitionId: string,
  instanceId: string,
  options: ScopeAccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.Authorization/accessReviewHistoryDefinitions/{historyDefinitionId}/instances/{instanceId}/generateDownloadUri{?api%2Dversion}",
    {
      scope: scope,
      historyDefinitionId: historyDefinitionId,
      instanceId: instanceId,
      "api%2Dversion": "2021-12-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _generateDownloadUriDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessReviewHistoryInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDefinitionDeserializer(result.body);

    throw error;
  }

  return accessReviewHistoryInstanceDeserializer(result.body);
}

/** Generates a uri which can be used to retrieve review history data. This URI has a TTL of 1 day and can be retrieved by fetching the accessReviewHistoryDefinition object. */
export async function generateDownloadUri(
  context: Client,
  scope: string,
  historyDefinitionId: string,
  instanceId: string,
  options: ScopeAccessReviewHistoryDefinitionInstanceGenerateDownloadUriOptionalParams = {
    requestOptions: {},
  },
): Promise<AccessReviewHistoryInstance> {
  const result = await _generateDownloadUriSend(
    context,
    scope,
    historyDefinitionId,
    instanceId,
    options,
  );
  return _generateDownloadUriDeserialize(result);
}
