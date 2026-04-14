// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext as Client } from "../index.js";
import type { HeatMapModel, HeatMapType } from "../../models/models.js";
import { cloudErrorDeserializer, heatMapModelDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { HeatMapGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  heatMapType: HeatMapType,
  options: HeatMapGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/trafficmanagerprofiles/{profileName}/heatMaps/{heatMapType}{?api%2Dversion,topLeft,botRight}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      heatMapType: heatMapType,
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
      topLeft: !options?.topLeft
        ? options?.topLeft
        : options?.topLeft.map((p: any) => {
            return p;
          }),
      botRight: !options?.botRight
        ? options?.botRight
        : options?.botRight.map((p: any) => {
            return p;
          }),
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<HeatMapModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return heatMapModelDeserializer(result.body);
}

/** Gets latest heatmap for Traffic Manager profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  heatMapType: HeatMapType,
  options: HeatMapGetOptionalParams = { requestOptions: {} },
): Promise<HeatMapModel> {
  const result = await _getSend(context, resourceGroupName, profileName, heatMapType, options);
  return _getDeserialize(result);
}
