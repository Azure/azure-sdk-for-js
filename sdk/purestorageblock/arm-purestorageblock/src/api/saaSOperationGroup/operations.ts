// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext as Client } from "../index.js";
import type { ActivateSaaSRequest, SaaSResourceDetailsResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  activateSaaSRequestSerializer,
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
  body: ActivateSaaSRequest,
  options: SaaSOperationGroupActivateResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/PureStorage.Block/activateSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activateSaaSRequestSerializer(body),
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
/** Activate the SaaS resource */
export function activateResource(
  context: Client,
  body: ActivateSaaSRequest,
  options: SaaSOperationGroupActivateResourceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SaaSResourceDetailsResponse>, SaaSResourceDetailsResponse> {
  return getLongRunningPoller(context, _activateResourceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _activateResourceSend(context, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<SaaSResourceDetailsResponse>, SaaSResourceDetailsResponse>;
}
