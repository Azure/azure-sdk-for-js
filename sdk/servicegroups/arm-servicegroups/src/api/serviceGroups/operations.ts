// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceGroupsManagementContext as Client } from "../index.js";
import type { ServiceGroup } from "../../models/models.js";
import { serviceGroupDeserializer, errorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ServiceGroupsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  serviceGroupName: string,
  options: ServiceGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServiceGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return serviceGroupDeserializer(result.body);
}

/** Get the details of the serviceGroup */
export async function get(
  context: Client,
  serviceGroupName: string,
  options: ServiceGroupsGetOptionalParams = { requestOptions: {} },
): Promise<ServiceGroup> {
  const result = await _getSend(context, serviceGroupName, options);
  return _getDeserialize(result);
}
