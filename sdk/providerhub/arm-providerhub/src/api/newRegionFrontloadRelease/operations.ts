// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  ResourceProviderManifest,
  DefaultRollout,
  FrontloadPayload,
} from "../../models/models.js";
import {
  resourceProviderManifestDeserializer,
  errorResponseDeserializer,
  defaultRolloutDeserializer,
  frontloadPayloadSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NewRegionFrontloadReleaseGenerateManifestOptionalParams,
  NewRegionFrontloadReleaseStopOptionalParams,
  NewRegionFrontloadReleaseCreateOrUpdateOptionalParams,
  NewRegionFrontloadReleaseGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _generateManifestSend(
  context: Client,
  providerNamespace: string,
  properties: FrontloadPayload,
  options: NewRegionFrontloadReleaseGenerateManifestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/generateNewRegionFrontloadManifest{?api%2Dversion}",
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
    body: frontloadPayloadSerializer(properties),
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

/** Generates the new region frontload manifest. */
export async function generateManifest(
  context: Client,
  providerNamespace: string,
  properties: FrontloadPayload,
  options: NewRegionFrontloadReleaseGenerateManifestOptionalParams = { requestOptions: {} },
): Promise<ResourceProviderManifest> {
  const result = await _generateManifestSend(context, providerNamespace, properties, options);
  return _generateManifestDeserialize(result);
}

export function _stopSend(
  context: Client,
  providerNamespace: string,
  releaseName: string,
  options: NewRegionFrontloadReleaseStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/newRegionFrontloadRelease/{releaseName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      releaseName: releaseName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Stops a new region frontload release. */
export async function stop(
  context: Client,
  providerNamespace: string,
  releaseName: string,
  options: NewRegionFrontloadReleaseStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(context, providerNamespace, releaseName, options);
  return _stopDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  releaseName: string,
  properties: FrontloadPayload,
  options: NewRegionFrontloadReleaseCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/newRegionFrontloadRelease/{releaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      releaseName: releaseName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: frontloadPayloadSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DefaultRollout> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return defaultRolloutDeserializer(result.body);
}

/** Creates or updates a new region frontload release. */
export async function createOrUpdate(
  context: Client,
  providerNamespace: string,
  releaseName: string,
  properties: FrontloadPayload,
  options: NewRegionFrontloadReleaseCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<DefaultRollout> {
  const result = await _createOrUpdateSend(
    context,
    providerNamespace,
    releaseName,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  releaseName: string,
  options: NewRegionFrontloadReleaseGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/newRegionFrontloadRelease/{releaseName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      releaseName: releaseName,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DefaultRollout> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return defaultRolloutDeserializer(result.body);
}

/** Gets a new region frontload release. */
export async function get(
  context: Client,
  providerNamespace: string,
  releaseName: string,
  options: NewRegionFrontloadReleaseGetOptionalParams = { requestOptions: {} },
): Promise<DefaultRollout> {
  const result = await _getSend(context, providerNamespace, releaseName, options);
  return _getDeserialize(result);
}
