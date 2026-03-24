// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { AccessIdName } from "../../models/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TenantAccessGitRegenerateSecondaryKeyOptionalParams,
  TenantAccessGitRegeneratePrimaryKeyOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _regenerateSecondaryKeySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGitRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}/git/regenerateSecondaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regenerateSecondaryKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerate secondary access key for GIT. */
export async function regenerateSecondaryKey(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGitRegenerateSecondaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regenerateSecondaryKeySend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    options,
  );
  return _regenerateSecondaryKeyDeserialize(result);
}

export function _regeneratePrimaryKeySend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGitRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}/git/regeneratePrimaryKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      accessName: accessName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _regeneratePrimaryKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Regenerate primary access key for GIT. */
export async function regeneratePrimaryKey(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  accessName: AccessIdName,
  options: TenantAccessGitRegeneratePrimaryKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _regeneratePrimaryKeySend(
    context,
    resourceGroupName,
    serviceName,
    accessName,
    options,
  );
  return _regeneratePrimaryKeyDeserialize(result);
}
