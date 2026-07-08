// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { VmInsightsOnboardingVMInsightsOnboardingStatus } from "../../models/vmInsightsOnboarding/models.js";
import {
  vmInsightsOnboardingVMInsightsOnboardingStatusDeserializer,
  vmInsightsOnboardingResponseWithErrorDeserializer,
} from "../../models/vmInsightsOnboarding/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { vMInsightsGetOnboardingStatusOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getOnboardingStatusSend(
  context: Client,
  resourceUri: string,
  options: vMInsightsGetOnboardingStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Insights/vmInsightsOnboardingStatuses/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": "2018-11-27-preview",
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

export async function _getOnboardingStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<VmInsightsOnboardingVMInsightsOnboardingStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = vmInsightsOnboardingResponseWithErrorDeserializer(result.body);
    }

    throw error;
  }

  return vmInsightsOnboardingVMInsightsOnboardingStatusDeserializer(result.body);
}

/** Retrieves the VM Insights onboarding status for the specified resource or resource scope. */
export async function getOnboardingStatus(
  context: Client,
  resourceUri: string,
  options: vMInsightsGetOnboardingStatusOptionalParams = { requestOptions: {} },
): Promise<VmInsightsOnboardingVMInsightsOnboardingStatus> {
  const result = await _getOnboardingStatusSend(context, resourceUri, options);
  return _getOnboardingStatusDeserialize(result);
}
