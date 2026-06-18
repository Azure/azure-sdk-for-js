// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  featureValidationRequestBaseUnionSerializer,
  FeatureValidationRequestBaseUnion,
  featureValidationResponseBaseUnionDeserializer,
  FeatureValidationResponseBaseUnion,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { DataProtectionCheckFeatureSupportOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _checkFeatureSupportSend(
  context: Client,
  location: string,
  parameters: FeatureValidationRequestBaseUnion,
  options: DataProtectionCheckFeatureSupportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/checkFeatureSupport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: featureValidationRequestBaseUnionSerializer(parameters),
    });
}

export async function _checkFeatureSupportDeserialize(
  result: PathUncheckedResponse,
): Promise<FeatureValidationResponseBaseUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return featureValidationResponseBaseUnionDeserializer(result.body);
}

/** Validates if a feature is supported */
export async function checkFeatureSupport(
  context: Client,
  location: string,
  parameters: FeatureValidationRequestBaseUnion,
  options: DataProtectionCheckFeatureSupportOptionalParams = { requestOptions: {} },
): Promise<FeatureValidationResponseBaseUnion> {
  const result = await _checkFeatureSupportSend(context, location, parameters, options);
  return _checkFeatureSupportDeserialize(result);
}
