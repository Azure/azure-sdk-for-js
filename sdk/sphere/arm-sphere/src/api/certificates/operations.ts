// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext as Client } from "../index.js";
import type {
  Certificate,
  _CertificateListResult,
  CertificateChainResponse,
  ProofOfPossessionNonceRequest,
  ProofOfPossessionNonceResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  certificateDeserializer,
  _certificateListResultDeserializer,
  certificateChainResponseDeserializer,
  proofOfPossessionNonceRequestSerializer,
  proofOfPossessionNonceResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CertificatesRetrieveProofOfPossessionNonceOptionalParams,
  CertificatesRetrieveCertChainOptionalParams,
  CertificatesListByCatalogOptionalParams,
  CertificatesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _retrieveProofOfPossessionNonceSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
  options: CertificatesRetrieveProofOfPossessionNonceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveProofOfPossessionNonce{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      serialNumber: serialNumber,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: proofOfPossessionNonceRequestSerializer(proofOfPossessionNonceRequest),
  });
}

export async function _retrieveProofOfPossessionNonceDeserialize(
  result: PathUncheckedResponse,
): Promise<ProofOfPossessionNonceResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return proofOfPossessionNonceResponseDeserializer(result.body);
}

/** Gets the proof of possession nonce. */
export async function retrieveProofOfPossessionNonce(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
  options: CertificatesRetrieveProofOfPossessionNonceOptionalParams = { requestOptions: {} },
): Promise<ProofOfPossessionNonceResponse> {
  const result = await _retrieveProofOfPossessionNonceSend(
    context,
    resourceGroupName,
    catalogName,
    serialNumber,
    proofOfPossessionNonceRequest,
    options,
  );
  return _retrieveProofOfPossessionNonceDeserialize(result);
}

export function _retrieveCertChainSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesRetrieveCertChainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveCertChain{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      serialNumber: serialNumber,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _retrieveCertChainDeserialize(
  result: PathUncheckedResponse,
): Promise<CertificateChainResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificateChainResponseDeserializer(result.body);
}

/** Retrieves cert chain. */
export async function retrieveCertChain(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesRetrieveCertChainOptionalParams = { requestOptions: {} },
): Promise<CertificateChainResponse> {
  const result = await _retrieveCertChainSend(
    context,
    resourceGroupName,
    catalogName,
    serialNumber,
    options,
  );
  return _retrieveCertChainDeserialize(result);
}

export function _listByCatalogSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CertificatesListByCatalogOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates{?api%2Dversion,%24filter,%24top,%24skip,%24maxpagesize}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24maxpagesize": options?.maxpagesize,
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

export async function _listByCatalogDeserialize(
  result: PathUncheckedResponse,
): Promise<_CertificateListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _certificateListResultDeserializer(result.body);
}

/** List Certificate resources by Catalog */
export function listByCatalog(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  options: CertificatesListByCatalogOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Certificate> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCatalogSend(context, resourceGroupName, catalogName, options),
    _listByCatalogDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      catalogName: catalogName,
      serialNumber: serialNumber,
      "api%2Dversion": context.apiVersion ?? "2024-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Certificate> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return certificateDeserializer(result.body);
}

/** Get a Certificate */
export async function get(
  context: Client,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesGetOptionalParams = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _getSend(context, resourceGroupName, catalogName, serialNumber, options);
  return _getDeserialize(result);
}
