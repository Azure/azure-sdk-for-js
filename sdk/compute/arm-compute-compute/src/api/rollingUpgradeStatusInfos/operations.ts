// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeContext as Client } from "../index.js";
import type { RollingUpgradeStatusInfo } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  rollingUpgradeStatusInfoDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RollingUpgradeStatusInfosGetLatestOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getLatestSend(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: RollingUpgradeStatusInfosGetLatestOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmScaleSetName: vmScaleSetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getLatestDeserialize(
  result: PathUncheckedResponse,
): Promise<RollingUpgradeStatusInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return rollingUpgradeStatusInfoDeserializer(result.body);
}

/** Gets the status of the latest virtual machine scale set rolling upgrade. */
export async function getLatest(
  context: Client,
  resourceGroupName: string,
  vmScaleSetName: string,
  options: RollingUpgradeStatusInfosGetLatestOptionalParams = {
    requestOptions: {},
  },
): Promise<RollingUpgradeStatusInfo> {
  const result = await _getLatestSend(context, resourceGroupName, vmScaleSetName, options);
  return _getLatestDeserialize(result);
}
