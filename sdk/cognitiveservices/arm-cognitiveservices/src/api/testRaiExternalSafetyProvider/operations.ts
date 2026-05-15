// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type { RaiExternalSafetyProviderSchema } from "../../models/models.js";
import {
  errorResponseDeserializer,
  raiExternalSafetyProviderSchemaSerializer,
  raiExternalSafetyProviderSchemaDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { TestRaiExternalSafetyProviderCreateOrUpdateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
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
    error.details = errorResponseDeserializer(result.body);

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
