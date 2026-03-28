// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type { PolicyDescriptionCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  policyDescriptionCollectionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PolicyDescriptionListByServiceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PolicyDescriptionListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/policyDescriptions{?api%2Dversion,scope}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
      scope: options?.scope,
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<PolicyDescriptionCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return policyDescriptionCollectionDeserializer(result.body);
}

/** Lists all policy descriptions. */
export async function listByService(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  options: PolicyDescriptionListByServiceOptionalParams = { requestOptions: {} },
): Promise<PolicyDescriptionCollection> {
  const result = await _listByServiceSend(context, resourceGroupName, serviceName, options);
  return _listByServiceDeserialize(result);
}
