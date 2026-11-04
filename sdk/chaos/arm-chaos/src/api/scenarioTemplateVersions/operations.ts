// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext as Client } from "../index.js";
import type {
  ScenarioTemplateVersion,
  _ScenarioTemplateVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  scenarioTemplateVersionDeserializer,
  _scenarioTemplateVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ScenarioTemplateVersionsListOptionalParams,
  ScenarioTemplateVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  scenarioTemplateName: string,
  options: ScenarioTemplateVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Chaos/scenarioTemplates/{scenarioTemplateName}/versions{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ScenarioTemplateVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _scenarioTemplateVersionListResultDeserializer(result.body);
}

/** Get a list of the published versions of a scenario template, including superseded ones. */
export function list(
  context: Client,
  scenarioTemplateName: string,
  options: ScenarioTemplateVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ScenarioTemplateVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, scenarioTemplateName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-11-01" },
  );
}

export function _getSend(
  context: Client,
  scenarioTemplateName: string,
  version: string,
  options: ScenarioTemplateVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Chaos/scenarioTemplates/{scenarioTemplateName}/versions/{version}{?api%2Dversion}",
    {
      scenarioTemplateName: scenarioTemplateName,
      version: version,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ScenarioTemplateVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return scenarioTemplateVersionDeserializer(result.body);
}

/** Get a single published version of a scenario template. */
export async function get(
  context: Client,
  scenarioTemplateName: string,
  version: string,
  options: ScenarioTemplateVersionsGetOptionalParams = { requestOptions: {} },
): Promise<ScenarioTemplateVersion> {
  const result = await _getSend(context, scenarioTemplateName, version, options);
  return _getDeserialize(result);
}
