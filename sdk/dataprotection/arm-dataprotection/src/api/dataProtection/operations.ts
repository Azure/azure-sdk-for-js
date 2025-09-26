// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  FeatureValidationRequestBaseUnion,
  FeatureValidationResponseBaseUnion,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  featureValidationRequestBaseUnionSerializer,
  featureValidationResponseBaseUnionDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { DataProtectionCheckFeatureSupportOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkFeatureSupportSend(
  context: Client,
  location: string,
  parameters: FeatureValidationRequestBaseUnion,
  options: DataProtectionCheckFeatureSupportOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/locations/{location}/checkFeatureSupport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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
    body: featureValidationRequestBaseUnionSerializer(parameters),
  });
}

export async function _checkFeatureSupportDeserialize(
  result: PathUncheckedResponse,
): Promise<FeatureValidationResponseBaseUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return featureValidationResponseBaseUnionDeserializer(result.body);
}

/** Validates if a feature is supported */
export async function checkFeatureSupport(
  context: Client,
  location: string,
  parameters: FeatureValidationRequestBaseUnion,
  options: DataProtectionCheckFeatureSupportOptionalParams = {
    requestOptions: {},
  },
): Promise<FeatureValidationResponseBaseUnion> {
  const result = await _checkFeatureSupportSend(context, location, parameters, options);
  return _checkFeatureSupportDeserialize(result);
}
