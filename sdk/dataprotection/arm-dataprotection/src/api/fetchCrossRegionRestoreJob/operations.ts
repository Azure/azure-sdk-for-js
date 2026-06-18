// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  AzureBackupJobResource,
  azureBackupJobResourceDeserializer,
  CrossRegionRestoreJobRequest,
  crossRegionRestoreJobRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { FetchCrossRegionRestoreJobGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CrossRegionRestoreJobRequest,
  options: FetchCrossRegionRestoreJobGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/fetchCrossRegionRestoreJob{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
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
      body: crossRegionRestoreJobRequestSerializer(parameters),
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureBackupJobResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return azureBackupJobResourceDeserializer(result.body);
}

/** Fetches the Cross Region Restore Job */
export async function get(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CrossRegionRestoreJobRequest,
  options: FetchCrossRegionRestoreJobGetOptionalParams = { requestOptions: {} },
): Promise<AzureBackupJobResource> {
  const result = await _getSend(context, resourceGroupName, location, parameters, options);
  return _getDeserialize(result);
}
