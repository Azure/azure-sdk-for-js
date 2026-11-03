// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  AllowedEnvironmentType,
  _AllowedEnvironmentTypeListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  allowedEnvironmentTypeDeserializer,
  _allowedEnvironmentTypeListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProjectAllowedEnvironmentTypesListOptionalParams,
  ProjectAllowedEnvironmentTypesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ProjectAllowedEnvironmentTypesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/allowedEnvironmentTypes{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
      "%24top": options?.top,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AllowedEnvironmentTypeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _allowedEnvironmentTypeListResultDeserializer(result.body);
}

/** Lists allowed environment types for a project. */
export function list(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ProjectAllowedEnvironmentTypesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AllowedEnvironmentType> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, projectName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  options: ProjectAllowedEnvironmentTypesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/allowedEnvironmentTypes/{environmentTypeName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      environmentTypeName: environmentTypeName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AllowedEnvironmentType> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return allowedEnvironmentTypeDeserializer(result.body);
}

/** Gets an allowed environment type. */
export async function get(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  environmentTypeName: string,
  options: ProjectAllowedEnvironmentTypesGetOptionalParams = { requestOptions: {} },
): Promise<AllowedEnvironmentType> {
  const result = await _getSend(
    context,
    resourceGroupName,
    projectName,
    environmentTypeName,
    options,
  );
  return _getDeserialize(result);
}
