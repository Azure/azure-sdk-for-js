// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { TemplateModel } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  templateModelSerializer,
  templateModelDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContentTemplateDeleteOptionalParams,
  ContentTemplateInstallOptionalParams,
  ContentTemplateGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  templateId: string,
  options: ContentTemplateDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentTemplates/{templateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      templateId: templateId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete an installed template. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  templateId: string,
  options: ContentTemplateDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, workspaceName, templateId, options);
  return _$deleteDeserialize(result);
}

export function _installSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  templateId: string,
  templateInstallationProperties: TemplateModel,
  options: ContentTemplateInstallOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentTemplates/{templateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      templateId: templateId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: templateModelSerializer(templateInstallationProperties),
  });
}

export async function _installDeserialize(result: PathUncheckedResponse): Promise<TemplateModel> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return templateModelDeserializer(result.body);
}

/** Install a template. */
export async function install(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  templateId: string,
  templateInstallationProperties: TemplateModel,
  options: ContentTemplateInstallOptionalParams = { requestOptions: {} },
): Promise<TemplateModel> {
  const result = await _installSend(
    context,
    resourceGroupName,
    workspaceName,
    templateId,
    templateInstallationProperties,
    options,
  );
  return _installDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  templateId: string,
  options: ContentTemplateGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/contentTemplates/{templateId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      templateId: templateId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TemplateModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return templateModelDeserializer(result.body);
}

/**
 * Gets a template byt its identifier.
 * Expandable properties:
 * - properties/mainTemplate
 * - properties/dependantTemplates
 */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  templateId: string,
  options: ContentTemplateGetOptionalParams = { requestOptions: {} },
): Promise<TemplateModel> {
  const result = await _getSend(context, resourceGroupName, workspaceName, templateId, options);
  return _getDeserialize(result);
}
