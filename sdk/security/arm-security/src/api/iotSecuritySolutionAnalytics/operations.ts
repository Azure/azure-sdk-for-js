// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  IoTSecuritySolutionAnalyticsModel,
  IoTSecuritySolutionAnalyticsModelList,
} from "../../models/ioTSecurityAPI/models.js";
import {
  ioTSecuritySolutionAnalyticsModelDeserializer,
  ioTSecuritySolutionAnalyticsModelListDeserializer,
} from "../../models/ioTSecurityAPI/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IotSecuritySolutionAnalyticsListOptionalParams,
  IotSecuritySolutionAnalyticsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionAnalyticsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}/analyticsModels{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      "api%2Dversion": "2019-08-01",
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
): Promise<IoTSecuritySolutionAnalyticsModelList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ioTSecuritySolutionAnalyticsModelListDeserializer(result.body);
}

/** Use this method to get IoT security Analytics metrics in an array. */
export async function list(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionAnalyticsListOptionalParams = { requestOptions: {} },
): Promise<IoTSecuritySolutionAnalyticsModelList> {
  const result = await _listSend(context, resourceGroupName, solutionName, options);
  return _listDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionAnalyticsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/iotSecuritySolutions/{solutionName}/analyticsModels/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionName: solutionName,
      "api%2Dversion": "2019-08-01",
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
): Promise<IoTSecuritySolutionAnalyticsModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ioTSecuritySolutionAnalyticsModelDeserializer(result.body);
}

/** Use this method to get IoT Security Analytics metrics. */
export async function get(
  context: Client,
  resourceGroupName: string,
  solutionName: string,
  options: IotSecuritySolutionAnalyticsGetOptionalParams = { requestOptions: {} },
): Promise<IoTSecuritySolutionAnalyticsModel> {
  const result = await _getSend(context, resourceGroupName, solutionName, options);
  return _getDeserialize(result);
}
