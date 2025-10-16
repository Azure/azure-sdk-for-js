// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ServiceComponentsCheckAvailabilityOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkAvailabilitySend(
  context: Client,
  location: string,
  serviceComponentName: string,
  options: ServiceComponentsCheckAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/serviceComponents/{serviceComponentName}/checkAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      serviceComponentName: serviceComponentName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkAvailabilityDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Return service component availability */
export function checkAvailability(
  context: Client,
  location: string,
  serviceComponentName: string,
  options: ServiceComponentsCheckAvailabilityOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _checkAvailabilityDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _checkAvailabilitySend(context, location, serviceComponentName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}
