// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type {
  FeatureSupportRequestUnion,
  AzureVMResourceFeatureSupportResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  featureSupportRequestUnionSerializer,
  azureVMResourceFeatureSupportResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FeatureSupportValidateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateSend(
  context: Client,
  azureRegion: string,
  parameters: FeatureSupportRequestUnion,
  options: FeatureSupportValidateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{azureRegion}/backupValidateFeatures{?api%2Dversion}",
    {
      azureRegion: azureRegion,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: featureSupportRequestUnionSerializer(parameters),
  });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureVMResourceFeatureSupportResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return azureVMResourceFeatureSupportResponseDeserializer(result.body);
}

/** It will validate if given feature with resource properties is supported in service */
export async function validate(
  context: Client,
  azureRegion: string,
  parameters: FeatureSupportRequestUnion,
  options: FeatureSupportValidateOptionalParams = { requestOptions: {} },
): Promise<AzureVMResourceFeatureSupportResponse> {
  const result = await _validateSend(context, azureRegion, parameters, options);
  return _validateDeserialize(result);
}
