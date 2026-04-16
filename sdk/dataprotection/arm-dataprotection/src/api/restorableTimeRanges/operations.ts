// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  AzureBackupFindRestorableTimeRangesRequest,
  AzureBackupFindRestorableTimeRangesResponseResource,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  azureBackupFindRestorableTimeRangesRequestSerializer,
  azureBackupFindRestorableTimeRangesResponseResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RestorableTimeRangesFindOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _findSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: AzureBackupFindRestorableTimeRangesRequest,
  options: RestorableTimeRangesFindOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/backupInstances/{backupInstanceName}/findRestorableTimeRanges{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      backupInstanceName: backupInstanceName,
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
    body: azureBackupFindRestorableTimeRangesRequestSerializer(parameters),
  });
}

export async function _findDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureBackupFindRestorableTimeRangesResponseResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return azureBackupFindRestorableTimeRangesResponseResourceDeserializer(result.body);
}

export async function find(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  backupInstanceName: string,
  parameters: AzureBackupFindRestorableTimeRangesRequest,
  options: RestorableTimeRangesFindOptionalParams = { requestOptions: {} },
): Promise<AzureBackupFindRestorableTimeRangesResponseResource> {
  const result = await _findSend(
    context,
    resourceGroupName,
    vaultName,
    backupInstanceName,
    parameters,
    options,
  );
  return _findDeserialize(result);
}
