// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  MigrationValidationRequest,
  migrationValidationRequestSerializer,
  MigrationValidationResponse,
  migrationValidationResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { MigrationsValidateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: MigrationValidationRequest,
  options: MigrationsValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cache/redisEnterprise/{clusterName}/migrations/default/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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
      body: migrationValidationRequestSerializer(body),
    });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<MigrationValidationResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return migrationValidationResponseDeserializer(result.body);
}

/** Validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource. */
export async function validate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: MigrationValidationRequest,
  options: MigrationsValidateOptionalParams = { requestOptions: {} },
): Promise<MigrationValidationResponse> {
  const result = await _validateSend(context, resourceGroupName, clusterName, body, options);
  return _validateDeserialize(result);
}
