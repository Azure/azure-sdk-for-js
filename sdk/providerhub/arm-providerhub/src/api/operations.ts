// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "./index.js";
import type {
  ResourceProviderManifest,
  CheckinManifestParams,
  CheckinManifestInfo,
} from "../models/models.js";
import {
  resourceProviderManifestDeserializer,
  errorResponseDeserializer,
  checkinManifestParamsSerializer,
  checkinManifestInfoDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { CheckinManifestOptionalParams, GenerateManifestOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkinManifestSend(
  context: Client,
  providerNamespace: string,
  checkinManifestParams: CheckinManifestParams,
  options: CheckinManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/checkinManifest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkinManifestParamsSerializer(checkinManifestParams),
  });
}

export async function _checkinManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckinManifestInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return checkinManifestInfoDeserializer(result.body);
}

/** Checkin the manifest. */
export async function checkinManifest(
  context: Client,
  providerNamespace: string,
  checkinManifestParams: CheckinManifestParams,
  options: CheckinManifestOptionalParams = { requestOptions: {} },
): Promise<CheckinManifestInfo> {
  const result = await _checkinManifestSend(
    context,
    providerNamespace,
    checkinManifestParams,
    options,
  );
  return _checkinManifestDeserialize(result);
}

export function _generateManifestSend(
  context: Client,
  providerNamespace: string,
  options: GenerateManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/generateManifest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _generateManifestDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceProviderManifest> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return resourceProviderManifestDeserializer(result.body);
}

/** Generates the manifest for the given provider. */
export async function generateManifest(
  context: Client,
  providerNamespace: string,
  options: GenerateManifestOptionalParams = { requestOptions: {} },
): Promise<ResourceProviderManifest> {
  const result = await _generateManifestSend(context, providerNamespace, options);
  return _generateManifestDeserialize(result);
}
