// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  JobResource,
  jobResourceDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { JobDetailsGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  jobName: string,
  options: JobDetailsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupJobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2026-01-31-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobResourceDeserializer(result.body);
}

/** Gets extended information associated with the job. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  jobName: string,
  options: JobDetailsGetOptionalParams = { requestOptions: {} },
): Promise<JobResource> {
  const result = await _getSend(context, vaultName, resourceGroupName, jobName, options);
  return _getDeserialize(result);
}
