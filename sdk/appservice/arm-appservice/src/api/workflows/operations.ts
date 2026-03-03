// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSiteManagementContext as Client } from "../index.js";
import type { RegenerateActionParameter, Workflow } from "../../models/models.js";
import {
  errorResponseDeserializer,
  regenerateActionParameterSerializer,
  workflowSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkflowsValidateOptionalParams,
  WorkflowsRegenerateAccessKeyOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  validateParameter: Workflow,
  options: WorkflowsValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: workflowSerializer(validateParameter),
  });
}

export async function _validateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Validates the workflow definition. */
export async function validate(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  validateParameter: Workflow,
  options: WorkflowsValidateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _validateSend(
    context,
    resourceGroupName,
    name,
    workflowName,
    validateParameter,
    options,
  );
  return _validateDeserialize(result);
}

export function _regenerateAccessKeySend(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  keyType: RegenerateActionParameter,
  options: WorkflowsRegenerateAccessKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Web/sites/{name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/{workflowName}/regenerateAccessKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
      workflowName: workflowName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: regenerateActionParameterSerializer(keyType),
  });
}

export async function _regenerateAccessKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Regenerates the callback URL access key for request triggers. */
export async function regenerateAccessKey(
  context: Client,
  resourceGroupName: string,
  name: string,
  workflowName: string,
  keyType: RegenerateActionParameter,
  options: WorkflowsRegenerateAccessKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regenerateAccessKeySend(
    context,
    resourceGroupName,
    name,
    workflowName,
    keyType,
    options,
  );
  return _regenerateAccessKeyDeserialize(result);
}
