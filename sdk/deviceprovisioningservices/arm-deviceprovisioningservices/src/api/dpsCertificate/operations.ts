// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotDpsContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  CertificateResponse,
  certificateResponseSerializer,
  certificateResponseDeserializer,
  CertificateListDescription,
  certificateListDescriptionDeserializer,
  VerificationCodeResponse,
  verificationCodeResponseDeserializer,
  VerificationCodeRequest,
  verificationCodeRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DpsCertificateVerifyCertificateOptionalParams,
  DpsCertificateGenerateVerificationCodeOptionalParams,
  DpsCertificateListOptionalParams,
  DpsCertificateDeleteOptionalParams,
  DpsCertificateCreateOrUpdateOptionalParams,
  DpsCertificateGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { uint8ArrayToString } from "@azure/core-util";

export function _verifyCertificateSend(
  context: Client,
  certificateName: string,
  ifMatch: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  request: VerificationCodeRequest,
  options: DpsCertificateVerifyCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}/verify{?api%2Dversion,certificate.name,certificate.rawBytes,certificate.isVerified,certificate.purpose,certificate.created,certificate.lastUpdated,certificate.hasPrivateKey,certificate.nonce}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "certificate.name": options?.certificateName,
      "certificate.rawBytes": !options?.certificateRawBytes
        ? options?.certificateRawBytes
        : uint8ArrayToString(options?.certificateRawBytes, "base64"),
      "certificate.isVerified": options?.certificateIsVerified,
      "certificate.purpose": options?.certificatePurpose,
      "certificate.created": !options?.certificateCreated
        ? options?.certificateCreated
        : options?.certificateCreated.toISOString(),
      "certificate.lastUpdated": !options?.certificateLastUpdated
        ? options?.certificateLastUpdated
        : options?.certificateLastUpdated.toISOString(),
      "certificate.hasPrivateKey": options?.certificateHasPrivateKey,
      "certificate.nonce": options?.certificateNonce,
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
      headers: {
        "if-match": ifMatch,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: verificationCodeRequestSerializer(request),
    });
}

export async function _verifyCertificateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateResponseDeserializer(result.body);
}

/** Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. */
export async function verifyCertificate(
  context: Client,
  certificateName: string,
  ifMatch: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  request: VerificationCodeRequest,
  options: DpsCertificateVerifyCertificateOptionalParams = { requestOptions: {} },
): Promise<CertificateResponse> {
  const result = await _verifyCertificateSend(
    context,
    certificateName,
    ifMatch,
    resourceGroupName,
    provisioningServiceName,
    request,
    options,
  );
  return _verifyCertificateDeserialize(result);
}

export function _generateVerificationCodeSend(
  context: Client,
  certificateName: string,
  ifMatch: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: DpsCertificateGenerateVerificationCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}/generateVerificationCode{?api%2Dversion,certificate.name,certificate.rawBytes,certificate.isVerified,certificate.purpose,certificate.created,certificate.lastUpdated,certificate.hasPrivateKey,certificate.nonce}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "certificate.name": options?.certificateName,
      "certificate.rawBytes": !options?.certificateRawBytes
        ? options?.certificateRawBytes
        : uint8ArrayToString(options?.certificateRawBytes, "base64"),
      "certificate.isVerified": options?.certificateIsVerified,
      "certificate.purpose": options?.certificatePurpose,
      "certificate.created": !options?.certificateCreated
        ? options?.certificateCreated
        : options?.certificateCreated.toISOString(),
      "certificate.lastUpdated": !options?.certificateLastUpdated
        ? options?.certificateLastUpdated
        : options?.certificateLastUpdated.toISOString(),
      "certificate.hasPrivateKey": options?.certificateHasPrivateKey,
      "certificate.nonce": options?.certificateNonce,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        "if-match": ifMatch,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _generateVerificationCodeDeserialize(
  result: PathUncheckedResponse,
): Promise<VerificationCodeResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return verificationCodeResponseDeserializer(result.body);
}

/** Generate verification code for Proof of Possession. */
export async function generateVerificationCode(
  context: Client,
  certificateName: string,
  ifMatch: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: DpsCertificateGenerateVerificationCodeOptionalParams = { requestOptions: {} },
): Promise<VerificationCodeResponse> {
  const result = await _generateVerificationCodeSend(
    context,
    certificateName,
    ifMatch,
    resourceGroupName,
    provisioningServiceName,
    options,
  );
  return _generateVerificationCodeDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: DpsCertificateListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateListDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateListDescriptionDeserializer(result.body);
}

/** Get all the certificates tied to the provisioning service. */
export async function list(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: DpsCertificateListOptionalParams = { requestOptions: {} },
): Promise<CertificateListDescription> {
  const result = await _listSend(context, resourceGroupName, provisioningServiceName, options);
  return _listDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  certificateName: string,
  ifMatch: string,
  options: DpsCertificateDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}{?api%2Dversion,certificate.name,certificate.rawBytes,certificate.isVerified,certificate.purpose,certificate.created,certificate.lastUpdated,certificate.hasPrivateKey,certificate.nonce}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      "certificate.name": options?.certificateName,
      "certificate.rawBytes": !options?.certificateRawBytes
        ? options?.certificateRawBytes
        : uint8ArrayToString(options?.certificateRawBytes, "base64"),
      "certificate.isVerified": options?.certificateIsVerified,
      "certificate.purpose": options?.certificatePurpose,
      "certificate.created": !options?.certificateCreated
        ? options?.certificateCreated
        : options?.certificateCreated.toISOString(),
      "certificate.lastUpdated": !options?.certificateLastUpdated
        ? options?.certificateLastUpdated
        : options?.certificateLastUpdated.toISOString(),
      "certificate.hasPrivateKey": options?.certificateHasPrivateKey,
      "certificate.nonce": options?.certificateNonce,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { "if-match": ifMatch, ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified certificate associated with the Provisioning Service */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  certificateName: string,
  ifMatch: string,
  options: DpsCertificateDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    provisioningServiceName,
    certificateName,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  certificateName: string,
  certificateDescription: CertificateResponse,
  options: DpsCertificateCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: certificateResponseSerializer(certificateDescription),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateResponseDeserializer(result.body);
}

/** Add new certificate or update an existing certificate. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  provisioningServiceName: string,
  certificateName: string,
  certificateDescription: CertificateResponse,
  options: DpsCertificateCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CertificateResponse> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    provisioningServiceName,
    certificateName,
    certificateDescription,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  certificateName: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: DpsCertificateGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/provisioningServices/{provisioningServiceName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      provisioningServiceName: provisioningServiceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CertificateResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateResponseDeserializer(result.body);
}

/** Get the certificate from the provisioning service. */
export async function get(
  context: Client,
  certificateName: string,
  resourceGroupName: string,
  provisioningServiceName: string,
  options: DpsCertificateGetOptionalParams = { requestOptions: {} },
): Promise<CertificateResponse> {
  const result = await _getSend(
    context,
    certificateName,
    resourceGroupName,
    provisioningServiceName,
    options,
  );
  return _getDeserialize(result);
}
