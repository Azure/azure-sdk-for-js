// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IotHubContext as Client } from "../index.js";
import {
  errorDetailsDeserializer,
  CertificateDescription,
  certificateDescriptionSerializer,
  certificateDescriptionDeserializer,
  CertificateListDescription,
  certificateListDescriptionDeserializer,
  CertificateWithNonceDescription,
  certificateWithNonceDescriptionDeserializer,
  CertificateVerificationDescription,
  certificateVerificationDescriptionSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  CertificatesVerifyOptionalParams,
  CertificatesGenerateVerificationCodeOptionalParams,
  CertificatesListByIotHubOptionalParams,
  CertificatesDeleteOptionalParams,
  CertificatesCreateOrUpdateOptionalParams,
  CertificatesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _verifySend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  ifMatch: string,
  certificateVerificationBody: CertificateVerificationDescription,
  options: CertificatesVerifyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/certificates/{certificateName}/verify{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
      body: certificateVerificationDescriptionSerializer(certificateVerificationBody),
    });
}

export async function _verifyDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateDescriptionDeserializer(result.body);
}

/** Verifies the certificate's private key possession by providing the leaf cert issued by the verifying pre uploaded certificate. */
export async function verify(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  ifMatch: string,
  certificateVerificationBody: CertificateVerificationDescription,
  options: CertificatesVerifyOptionalParams = { requestOptions: {} },
): Promise<CertificateDescription> {
  const result = await _verifySend(
    context,
    resourceGroupName,
    resourceName,
    certificateName,
    ifMatch,
    certificateVerificationBody,
    options,
  );
  return _verifyDeserialize(result);
}

export function _generateVerificationCodeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  ifMatch: string,
  options: CertificatesGenerateVerificationCodeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/certificates/{certificateName}/generateVerificationCode{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<CertificateWithNonceDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateWithNonceDescriptionDeserializer(result.body);
}

/** Generates verification code for proof of possession flow. The verification code will be used to generate a leaf certificate. */
export async function generateVerificationCode(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  ifMatch: string,
  options: CertificatesGenerateVerificationCodeOptionalParams = { requestOptions: {} },
): Promise<CertificateWithNonceDescription> {
  const result = await _generateVerificationCodeSend(
    context,
    resourceGroupName,
    resourceName,
    certificateName,
    ifMatch,
    options,
  );
  return _generateVerificationCodeDeserialize(result);
}

export function _listByIotHubSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CertificatesListByIotHubOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/certificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listByIotHubDeserialize(
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

/** Returns the list of certificates. */
export async function listByIotHub(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: CertificatesListByIotHubOptionalParams = { requestOptions: {} },
): Promise<CertificateListDescription> {
  const result = await _listByIotHubSend(context, resourceGroupName, resourceName, options);
  return _listByIotHubDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  ifMatch: string,
  options: CertificatesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

/** Deletes an existing X509 certificate or does nothing if it does not exist. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  ifMatch: string,
  options: CertificatesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    resourceName,
    certificateName,
    ifMatch,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  certificateDescription: CertificateDescription,
  options: CertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
      body: certificateDescriptionSerializer(certificateDescription),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateDescription> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateDescriptionDeserializer(result.body);
}

/** Adds new or replaces existing certificate. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  certificateDescription: CertificateDescription,
  options: CertificatesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<CertificateDescription> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    resourceName,
    certificateName,
    certificateDescription,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  options: CertificatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Devices/IotHubs/{resourceName}/certificates/{certificateName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      certificateName: certificateName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return certificateDescriptionDeserializer(result.body);
}

/** Returns the certificate. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  certificateName: string,
  options: CertificatesGetOptionalParams = { requestOptions: {} },
): Promise<CertificateDescription> {
  const result = await _getSend(context, resourceGroupName, resourceName, certificateName, options);
  return _getDeserialize(result);
}
