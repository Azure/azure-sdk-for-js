// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CertificateRequest,
  certificateRequestSerializer,
  VaultCertificateResponse,
  vaultCertificateResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { VaultCertificatesCreateOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: certificateRequestSerializer(certificateRequest),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<VaultCertificateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
