// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeveloperHubServiceContext as Client } from "../index.js";
import type {
  VersionedTemplate,
  _VersionedTemplateListResult,
  GenerateVersionedTemplateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  versionedTemplateDeserializer,
  _versionedTemplateListResultDeserializer,
  generateVersionedTemplateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VersionedTemplateGenerateOptionalParams,
  VersionedTemplateListOptionalParams,
  VersionedTemplateGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _generateSend(
  context: Client,
  templateName: string,
  templateVersion: string,
  parameters: Record<string, string>,
  options: VersionedTemplateGenerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/templates/{templateName}/versions/{templateVersion}/generate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      templateName: templateName,
      templateVersion: templateVersion,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: parameters,
  });
}

export async function _generateDeserialize(
  result: PathUncheckedResponse,
): Promise<GenerateVersionedTemplateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return generateVersionedTemplateResponseDeserializer(result.body);
}

/** Generates a VersionedTemplate. */
export async function generate(
  context: Client,
  templateName: string,
  templateVersion: string,
  parameters: Record<string, string>,
  options: VersionedTemplateGenerateOptionalParams = { requestOptions: {} },
): Promise<GenerateVersionedTemplateResponse> {
  const result = await _generateSend(context, templateName, templateVersion, parameters, options);
  return _generateDeserialize(result);
}

export function _listSend(
  context: Client,
  templateName: string,
  options: VersionedTemplateListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/templates/{templateName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      templateName: templateName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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
): Promise<_VersionedTemplateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _versionedTemplateListResultDeserializer(result.body);
}

/** Gets a list of VersionedTemplate. */
export function list(
  context: Client,
  templateName: string,
  options: VersionedTemplateListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VersionedTemplate> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, templateName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-03-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  templateName: string,
  templateVersion: string,
  options: VersionedTemplateGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevHub/templates/{templateName}/versions/{templateVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      templateName: templateName,
      templateVersion: templateVersion,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VersionedTemplate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return versionedTemplateDeserializer(result.body);
}

/** Gets a VersionedTemplate. */
export async function get(
  context: Client,
  templateName: string,
  templateVersion: string,
  options: VersionedTemplateGetOptionalParams = { requestOptions: {} },
): Promise<VersionedTemplate> {
  const result = await _getSend(context, templateName, templateVersion, options);
  return _getDeserialize(result);
}
