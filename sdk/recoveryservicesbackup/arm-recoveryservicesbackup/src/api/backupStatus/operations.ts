// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BackupStatusRequest,
  backupStatusRequestSerializer,
  BackupStatusResponse,
  backupStatusResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { BackupStatusGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  azureRegion: string,
  parameters: BackupStatusRequest,
  options: BackupStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{azureRegion}/backupStatus{?api%2Dversion}",
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
      body: backupStatusRequestSerializer(parameters),
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return backupStatusResponseDeserializer(result.body);
}

/** Get the container backup status */
export async function get(
  context: Client,
  azureRegion: string,
  parameters: BackupStatusRequest,
  options: BackupStatusGetOptionalParams = { requestOptions: {} },
): Promise<BackupStatusResponse> {
  const result = await _getSend(context, azureRegion, parameters, options);
  return _getDeserialize(result);
}
