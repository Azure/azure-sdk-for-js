// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type { ManifestInfo } from "../../models/models.js";
import {
  errorResponseDeserializer,
  manifestInfoSerializer,
  manifestInfoDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManifestsCreateOrUpdateOptionalParams,
  ManifestsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  environment: string,
  properties: ManifestInfo,
  options: ManifestsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/manifests/{environment}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      environment: environment,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: manifestInfoSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManifestInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return manifestInfoDeserializer(result.body);
}

/** Creates or Updates a manifest in manifest repository. */
export async function createOrUpdate(
  context: Client,
  providerNamespace: string,
  environment: string,
  properties: ManifestInfo,
  options: ManifestsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ManifestInfo> {
  const result = await _createOrUpdateSend(
    context,
    providerNamespace,
    environment,
    properties,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  environment: string,
  options: ManifestsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/manifests/{environment}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      environment: environment,
      "api%2Dversion": context.apiVersion ?? "2025-10-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManifestInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return manifestInfoDeserializer(result.body);
}

/** Gets the manifest from the manifest repository. */
export async function get(
  context: Client,
  providerNamespace: string,
  environment: string,
  options: ManifestsGetOptionalParams = { requestOptions: {} },
): Promise<ManifestInfo> {
  const result = await _getSend(context, providerNamespace, environment, options);
  return _getDeserialize(result);
}
