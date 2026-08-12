// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext as Client } from "../index.js";
import type {
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  activateSaaSParameterRequestSerializer,
  saaSResourceDetailsResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SaaSOperationGroupActivateResourceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _activateResourceSend(
  context: Client,
  body: ActivateSaaSParameterRequest,
  options: SaaSOperationGroupActivateResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Commvault.ContentStore/activateSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activateSaaSParameterRequestSerializer(body),
  });
}

export async function _activateResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<SaaSResourceDetailsResponse> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saaSResourceDetailsResponseDeserializer(result.body);
}

/** Resolve the token to get the SaaS resource ID and activate the SaaS resource */
export function activateResource(
  context: Client,
  body: ActivateSaaSParameterRequest,
  options: SaaSOperationGroupActivateResourceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SaaSResourceDetailsResponse>, SaaSResourceDetailsResponse> {
  return getLongRunningPoller(context, _activateResourceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _activateResourceSend(context, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<SaaSResourceDetailsResponse>, SaaSResourceDetailsResponse>;
}
