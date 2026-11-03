// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext as Client } from "../index.js";
import type { ScenarioTemplate, _ScenarioTemplateListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  scenarioTemplateDeserializer,
  _scenarioTemplateListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScenarioTemplatesListOptionalParams,
  ScenarioTemplatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ScenarioTemplatesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Chaos/scenarioTemplates{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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
): Promise<_ScenarioTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _scenarioTemplateListResultDeserializer(result.body);
}

/** Get a list of the scenario templates published by Microsoft. */
export function list(
  context: Client,
  options: ScenarioTemplatesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScenarioTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _getSend(
  context: Client,
  scenarioTemplateName: string,
  options: ScenarioTemplatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Chaos/scenarioTemplates/{scenarioTemplateName}{?api%2Dversion}",
    {
      scenarioTemplateName: scenarioTemplateName,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ScenarioTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scenarioTemplateDeserializer(result.body);
}

/** Get a scenario template, described by its newest published version. */
export async function get(
  context: Client,
  scenarioTemplateName: string,
  options: ScenarioTemplatesGetOptionalParams = { requestOptions: {} },
): Promise<ScenarioTemplate> {
  const result = await _getSend(context, scenarioTemplateName, options);
  return _getDeserialize(result);
}
