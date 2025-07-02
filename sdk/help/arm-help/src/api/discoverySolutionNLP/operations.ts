// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HelpContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  discoveryNlpRequestSerializer,
  DiscoveryNlpResponse,
  discoveryNlpResponseDeserializer,
} from "../../models/models.js";
import {
  DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams,
  DiscoverySolutionNLPDiscoverSolutionsOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _discoverSolutionsBySubscriptionSend(
  context: Client,
  options: DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Help/discoverSolutions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["discoverSolutionRequest"]
      ? options["discoverSolutionRequest"]
      : discoveryNlpRequestSerializer(options["discoverSolutionRequest"]),
  });
}

export async function _discoverSolutionsBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryNlpResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return discoveryNlpResponseDeserializer(result.body);
}

/** Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary and subscription. */
export async function discoverSolutionsBySubscription(
  context: Client,
  options: DiscoverySolutionNLPDiscoverSolutionsBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): Promise<DiscoveryNlpResponse> {
  const result = await _discoverSolutionsBySubscriptionSend(context, options);
  return _discoverSolutionsBySubscriptionDeserialize(result);
}

export function _discoverSolutionsSend(
  context: Client,
  options: DiscoverySolutionNLPDiscoverSolutionsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Help/discoverSolutions{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["discoverSolutionRequest"]
      ? options["discoverSolutionRequest"]
      : discoveryNlpRequestSerializer(options["discoverSolutionRequest"]),
  });
}

export async function _discoverSolutionsDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscoveryNlpResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return discoveryNlpResponseDeserializer(result.body);
}

/** Search for relevant Azure Diagnostics, Solutions and Troubleshooters using a natural language issue summary. */
export async function discoverSolutions(
  context: Client,
  options: DiscoverySolutionNLPDiscoverSolutionsOptionalParams = {
    requestOptions: {},
  },
): Promise<DiscoveryNlpResponse> {
  const result = await _discoverSolutionsSend(context, options);
  return _discoverSolutionsDeserialize(result);
}
