// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDedicatedHSMResourceProviderContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  BackupResult,
  backupResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { CloudHsmClusterBackupStatusGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  jobId: string,
  options: CloudHsmClusterBackupStatusGetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HardwareSecurityModules/cloudHsmClusters/{cloudHsmClusterName}/backupOperationStatus/{jobId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudHsmClusterName: cloudHsmClusterName,
      jobId: jobId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BackupResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupResultDeserializer(result.body);
}

/** Gets the backup operation status of the specified Cloud HSM Cluster */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudHsmClusterName: string,
  jobId: string,
  options: CloudHsmClusterBackupStatusGetOptionalParams = {
    requestOptions: {},
  },
): Promise<BackupResult | null> {
  const result = await _getSend(context, resourceGroupName, cloudHsmClusterName, jobId, options);
  return _getDeserialize(result);
}
