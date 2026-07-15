// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "./index.js";
import type { GraphicalRunbookContent } from "../models/models.js";
import {
  graphicalRunbookContentSerializer,
  graphicalRunbookContentDeserializer,
  errorResponseDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { ConvertGraphRunbookContentOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _convertGraphRunbookContentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  parameters: GraphicalRunbookContent,
  options: ConvertGraphRunbookContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/convertGraphRunbookContent{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: graphicalRunbookContentSerializer(parameters),
  });
}

export async function _convertGraphRunbookContentDeserialize(
  result: PathUncheckedResponse,
): Promise<GraphicalRunbookContent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return graphicalRunbookContentDeserializer(result.body);
}

/** Post operation to serialize or deserialize GraphRunbookContent */
export async function convertGraphRunbookContent(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  parameters: GraphicalRunbookContent,
  options: ConvertGraphRunbookContentOptionalParams = { requestOptions: {} },
): Promise<GraphicalRunbookContent> {
  const result = await _convertGraphRunbookContentSend(
    context,
    resourceGroupName,
    automationAccountName,
    parameters,
    options,
  );
  return _convertGraphRunbookContentDeserialize(result);
}
