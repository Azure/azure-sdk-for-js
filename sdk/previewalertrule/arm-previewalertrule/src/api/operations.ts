// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PreviewAlertRuleManagementContext as Client } from "./index.js";
import {
  PreviewAlertRuleRequest,
  previewAlertRuleRequestSerializer,
  PreviewAlertRuleResponse,
  previewAlertRuleResponseDeserializer,
  errorResponseDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { PreviewAlertRuleOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _previewAlertRuleSend(
  context: Client,
  resourceId: string,
  parameters: PreviewAlertRuleRequest,
  options: PreviewAlertRuleOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{resourceId}/providers/microsoft.AlertsManagement/previewAlertRule{?api%2Dversion}",
    {
      resourceId: resourceId,
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
      body: previewAlertRuleRequestSerializer(parameters),
    });
}

export async function _previewAlertRuleDeserialize(
  result: PathUncheckedResponse,
): Promise<PreviewAlertRuleResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return previewAlertRuleResponseDeserializer(result.body);
}

/** Retrieves the results of a simulated historical execution of an alert rule */
export async function previewAlertRule(
  context: Client,
  resourceId: string,
  parameters: PreviewAlertRuleRequest,
  options: PreviewAlertRuleOptionalParams = { requestOptions: {} },
): Promise<PreviewAlertRuleResponse> {
  const result = await _previewAlertRuleSend(context, resourceId, parameters, options);
  return _previewAlertRuleDeserialize(result);
}
