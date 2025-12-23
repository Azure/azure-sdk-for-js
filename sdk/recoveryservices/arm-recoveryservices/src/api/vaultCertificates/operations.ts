// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext as Client } from "../index.js";
import type { CertificateRequest, VaultCertificateResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  certificateRequestSerializer,
  vaultCertificateResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { VaultCertificatesCreateOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  certificateName: string,
  certificateRequest: CertificateRequest,
  options: VaultCertificatesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: certificateRequestSerializer(certificateRequest),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<VaultCertificateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return vaultCertificateResponseDeserializer(result.body);
}

/** Uploads a certificate for a resource. */
export async function create(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  certificateName: string,
  certificateRequest: CertificateRequest,
  options: VaultCertificatesCreateOptionalParams = { requestOptions: {} },
): Promise<VaultCertificateResponse> {
  const result = await _createSend(
    context,
    resourceGroupName,
    vaultName,
    certificateName,
    certificateRequest,
    options,
  );
  return _createDeserialize(result);
}
