// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type { SolutionSchema, _SolutionSchemaListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  solutionSchemaDeserializer,
  _solutionSchemaListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SolutionSchemasListBySolutionTemplateVersionOptionalParams,
  SolutionSchemasGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySolutionTemplateVersionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  options: SolutionSchemasListBySolutionTemplateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/solutionSchemas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _listBySolutionTemplateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SolutionSchemaListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _solutionSchemaListResultDeserializer(result.body);
}

/** List by SolutionTemplateVersion */
export function listBySolutionTemplateVersion(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  options: SolutionSchemasListBySolutionTemplateVersionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SolutionSchema> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listBySolutionTemplateVersionSend(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        options,
      ),
    _listBySolutionTemplateVersionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  solutionSchemaName: string,
  options: SolutionSchemasGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/solutionSchemas/{solutionSchemaName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      solutionSchemaName: solutionSchemaName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SolutionSchema> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return solutionSchemaDeserializer(result.body);
}

/** Get a SolutionSchema Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  solutionSchemaName: string,
  options: SolutionSchemasGetOptionalParams = { requestOptions: {} },
): Promise<SolutionSchema> {
  const result = await _getSend(
    context,
    resourceGroupName,
    solutionTemplateName,
    solutionTemplateVersionName,
    solutionSchemaName,
    options,
  );
  return _getDeserialize(result);
}
