// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  featureSupportRequestUnionSerializer,
  FeatureSupportRequestUnion,
  AzureVMResourceFeatureSupportResponse,
  azureVMResourceFeatureSupportResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { FeatureSupportValidateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2026-01-31-preview",
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
      body: featureSupportRequestUnionSerializer(parameters),
    });
}

export async function _validateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureVMResourceFeatureSupportResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
