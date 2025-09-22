// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import type { UpgradableVersionsList } from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  upgradableVersionsListDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UpgradableVersionsDetailsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _detailsSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: UpgradableVersionsDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/listUpgradableVersions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _detailsDeserialize(
  result: PathUncheckedResponse,
): Promise<UpgradableVersionsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return upgradableVersionsListDeserializer(result.body);
}

/** List all upgradable versions for your Elastic monitor resource, helping you plan and execute upgrades. */
export async function details(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: UpgradableVersionsDetailsOptionalParams = { requestOptions: {} },
): Promise<UpgradableVersionsList> {
  const result = await _detailsSend(context, resourceGroupName, monitorName, options);
  return _detailsDeserialize(result);
}
