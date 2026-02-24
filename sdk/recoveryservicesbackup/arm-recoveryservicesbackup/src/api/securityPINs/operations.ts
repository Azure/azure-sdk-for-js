// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesBackupContext as Client } from "../index.js";
import type { TokenInformation } from "../../models/models.js";
import {
  errorResponseDeserializer,
  securityPinBaseSerializer,
  tokenInformationDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SecurityPINsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: SecurityPINsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupSecurityPIN{?api%2Dversion}",
    {
      vaultName: vaultName,
      resourceGroupName: resourceGroupName,
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
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? { "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["parameters"]
      ? options["parameters"]
      : securityPinBaseSerializer(options["parameters"]),
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TokenInformation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return tokenInformationDeserializer(result.body);
}

/** Get the security PIN. */
export async function get(
  context: Client,
  vaultName: string,
  resourceGroupName: string,
  options: SecurityPINsGetOptionalParams = { requestOptions: {} },
): Promise<TokenInformation> {
  const result = await _getSend(context, vaultName, resourceGroupName, options);
  return _getDeserialize(result);
}
