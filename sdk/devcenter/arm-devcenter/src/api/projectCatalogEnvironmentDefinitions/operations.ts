// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type { CatalogResourceValidationErrorDetails } from "../../models/models.js";
import {
  errorResponseDeserializer,
  catalogResourceValidationErrorDetailsDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getErrorDetailsSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/projects/{projectName}/catalogs/{catalogName}/environmentDefinitions/{environmentDefinitionName}/getErrorDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      catalogName: catalogName,
      environmentDefinitionName: environmentDefinitionName,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getErrorDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<CatalogResourceValidationErrorDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return catalogResourceValidationErrorDetailsDeserializer(result.body);
}

/** Gets Environment Definition error details. */
export async function getErrorDetails(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  catalogName: string,
  environmentDefinitionName: string,
  options: ProjectCatalogEnvironmentDefinitionsGetErrorDetailsOptionalParams = {
    requestOptions: {},
  },
): Promise<CatalogResourceValidationErrorDetails> {
  const result = await _getErrorDetailsSend(
    context,
    resourceGroupName,
    projectName,
    catalogName,
    environmentDefinitionName,
    options,
  );
  return _getErrorDetailsDeserialize(result);
}
