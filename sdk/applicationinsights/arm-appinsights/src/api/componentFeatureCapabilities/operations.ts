// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApplicationInsightsManagementContext as Client } from "../index.js";
import type { ApplicationInsightsComponentFeatureCapabilities } from "../../models/componentAPIs/models.js";
import { applicationInsightsComponentFeatureCapabilitiesDeserializer } from "../../models/componentAPIs/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ComponentFeatureCapabilitiesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentFeatureCapabilitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/components/{resourceName}/featurecapabilities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": "2015-05-01",
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
): Promise<ApplicationInsightsComponentFeatureCapabilities> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return applicationInsightsComponentFeatureCapabilitiesDeserializer(result.body);
}

/** Returns feature capabilities of the application insights component. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ComponentFeatureCapabilitiesGetOptionalParams = { requestOptions: {} },
): Promise<ApplicationInsightsComponentFeatureCapabilities> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
