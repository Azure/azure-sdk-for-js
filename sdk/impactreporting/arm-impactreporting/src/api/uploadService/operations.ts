// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext as Client } from "../index.js";
import {
  UploadTokenResult,
  uploadTokenResultDeserializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { UploadServiceGetUploadTokenOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getUploadTokenSend(
  context: Client,
  options: UploadServiceGetUploadTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/getUploadToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getUploadTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<UploadTokenResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return uploadTokenResultDeserializer(result.body);
}

/** Only for select HPC customers at this time, who can use this POST endpoint to trigger an action, where the UserRP/AzImpactRP service creates and returns a user-delegate SAS token for the storage account/container unique to the customer (identified by subscription ID). */
export async function getUploadToken(
  context: Client,
  options: UploadServiceGetUploadTokenOptionalParams = { requestOptions: {} },
): Promise<UploadTokenResult> {
  const result = await _getUploadTokenSend(context, options);
  return _getUploadTokenDeserialize(result);
}
