// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  AgentRegistration,
  AgentRegistrationRegenerateKeyParameter,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  agentRegistrationDeserializer,
  agentRegistrationRegenerateKeyParameterSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AgentRegistrationInformationRegenerateKeyOptionalParams,
  AgentRegistrationInformationGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _regenerateKeySend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  parameters: AgentRegistrationRegenerateKeyParameter,
  options: AgentRegistrationInformationRegenerateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/agentRegistrationInformation/regenerateKey{?api%2Dversion}",
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
    body: agentRegistrationRegenerateKeyParameterSerializer(parameters),
  });
}

export async function _regenerateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentRegistrationDeserializer(result.body);
}

/** Regenerate a primary or secondary agent registration key */
export async function regenerateKey(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  parameters: AgentRegistrationRegenerateKeyParameter,
  options: AgentRegistrationInformationRegenerateKeyOptionalParams = { requestOptions: {} },
): Promise<AgentRegistration> {
  const result = await _regenerateKeySend(
    context,
    resourceGroupName,
    automationAccountName,
    parameters,
    options,
  );
  return _regenerateKeyDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: AgentRegistrationInformationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/agentRegistrationInformation{?api%2Dversion}",
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
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AgentRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentRegistrationDeserializer(result.body);
}

/** Retrieve the automation agent registration information. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: AgentRegistrationInformationGetOptionalParams = { requestOptions: {} },
): Promise<AgentRegistration> {
  const result = await _getSend(context, resourceGroupName, automationAccountName, options);
  return _getDeserialize(result);
}
