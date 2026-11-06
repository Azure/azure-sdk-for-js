// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  OperationJobExtendedInfo,
  AzureBackupRestoreRequestUnion,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationJobExtendedInfoDeserializer,
  azureBackupRestoreRequestUnionSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RestoresFromDppCrossTenantVaultTriggerOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _triggerSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  body: AzureBackupRestoreRequestUnion,
  options: RestoresFromDppCrossTenantVaultTriggerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/crossTenantVaultMappings/{mappingName}/backupInstances/{backupInstanceName}/restore{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      mappingName: mappingName,
      backupInstanceName: backupInstanceName,
      "api%2Dversion": context.apiVersion ?? "2026-08-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureBackupRestoreRequestUnionSerializer(body),
  });
}

export async function _triggerDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationJobExtendedInfo> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationJobExtendedInfoDeserializer(result.body);
}

/** Triggers restore for a backup instance of the mapped source vault in a different tenant. */
export function trigger(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  mappingName: string,
  backupInstanceName: string,
  body: AzureBackupRestoreRequestUnion,
  options: RestoresFromDppCrossTenantVaultTriggerOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo> {
  return getLongRunningPoller(context, _triggerDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerSend(
        context,
        resourceGroupName,
        vaultName,
        mappingName,
        backupInstanceName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-31-preview",
  }) as PollerLike<OperationState<OperationJobExtendedInfo>, OperationJobExtendedInfo>;
}
