// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { BackupStatusRequest, BackupStatusResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupStatusRequestSerializer,
  backupStatusResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { BackupStatusGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

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
    body: backupStatusRequestSerializer(parameters),
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
