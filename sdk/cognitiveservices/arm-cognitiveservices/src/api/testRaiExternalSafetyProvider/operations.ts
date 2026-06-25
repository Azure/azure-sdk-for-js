// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  RaiExternalSafetyProviderSchema,
  raiExternalSafetyProviderSchemaSerializer,
  raiExternalSafetyProviderSchemaDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { TestRaiExternalSafetyProviderCreateOrUpdateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  safetyProviderName: string,
  safetyProvider: RaiExternalSafetyProviderSchema,
  options: TestRaiExternalSafetyProviderCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/testRaiExternalSafetyProvider/{safetyProviderName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      safetyProviderName: safetyProviderName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: raiExternalSafetyProviderSchemaSerializer(safetyProvider),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RaiExternalSafetyProviderSchema> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return raiExternalSafetyProviderSchemaDeserializer(result.body);
}

/** Test the rai safety provider associated with the subscription. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  safetyProviderName: string,
  safetyProvider: RaiExternalSafetyProviderSchema,
  options: TestRaiExternalSafetyProviderCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RaiExternalSafetyProviderSchema> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    accountName,
    safetyProviderName,
    safetyProvider,
    options,
  );
  return _createOrUpdateDeserialize(result);
}
