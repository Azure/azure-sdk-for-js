// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext as Client } from "../index.js";
import type { PlatformWorkloadIdentityRoleSet } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  platformWorkloadIdentityRoleSetDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { PlatformWorkloadIdentityRoleSetGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  openShiftMinorVersion: string,
  options: PlatformWorkloadIdentityRoleSetGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RedHatOpenShift/locations/{location}/platformWorkloadIdentityRoleSets/{openShiftMinorVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      openShiftMinorVersion: openShiftMinorVersion,
      "api%2Dversion": context.apiVersion ?? "2025-07-25",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PlatformWorkloadIdentityRoleSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return platformWorkloadIdentityRoleSetDeserializer(result.body);
}

/** This operation returns Platform Workload Identity Role Set as a string */
export async function get(
  context: Client,
  location: string,
  openShiftMinorVersion: string,
  options: PlatformWorkloadIdentityRoleSetGetOptionalParams = { requestOptions: {} },
): Promise<PlatformWorkloadIdentityRoleSet> {
  const result = await _getSend(context, location, openShiftMinorVersion, options);
  return _getDeserialize(result);
}
