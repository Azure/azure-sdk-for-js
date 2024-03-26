// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Certificate,
  CertificateListResult,
  CertificateChainResponse,
  ProofOfPossessionNonceRequest,
  ProofOfPossessionNonceResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { buildPagedAsyncIterator } from "../pagingHelpers.js";
import {
  isUnexpected,
  AzureSphereContext as Client,
  CertificatesGet200Response,
  CertificatesGetDefaultResponse,
  CertificatesListByCatalog200Response,
  CertificatesListByCatalogDefaultResponse,
  CertificatesRetrieveCertChain200Response,
  CertificatesRetrieveCertChainDefaultResponse,
  CertificatesRetrieveProofOfPossessionNonce200Response,
  CertificatesRetrieveProofOfPossessionNonceDefaultResponse,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  CertificatesGetOptions,
  CertificatesListByCatalogOptions,
  CertificatesRetrieveCertChainOptions,
  CertificatesRetrieveProofOfPossessionNonceOptions,
} from "../../models/options.js";

export function _certificatesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesGetOptions = { requestOptions: {} },
): StreamableMethod<
  CertificatesGet200Response | CertificatesGetDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}",
      subscriptionId,
      resourceGroupName,
      catalogName,
      serialNumber,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _certificatesGetDeserialize(
  result: CertificatesGet200Response | CertificatesGetDefaultResponse,
): Promise<Certificate> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    type: result.body["type"],
    systemData: !result.body.systemData
      ? undefined
      : {
          createdBy: result.body.systemData?.["createdBy"],
          createdByType: result.body.systemData?.["createdByType"],
          createdAt:
            result.body.systemData?.["createdAt"] !== undefined
              ? new Date(result.body.systemData?.["createdAt"])
              : undefined,
          lastModifiedBy: result.body.systemData?.["lastModifiedBy"],
          lastModifiedByType: result.body.systemData?.["lastModifiedByType"],
          lastModifiedAt:
            result.body.systemData?.["lastModifiedAt"] !== undefined
              ? new Date(result.body.systemData?.["lastModifiedAt"])
              : undefined,
        },
    properties: !result.body.properties
      ? undefined
      : {
          certificate: result.body.properties?.["certificate"],
          status: result.body.properties?.["status"],
          subject: result.body.properties?.["subject"],
          thumbprint: result.body.properties?.["thumbprint"],
          expiryUtc:
            result.body.properties?.["expiryUtc"] !== undefined
              ? new Date(result.body.properties?.["expiryUtc"])
              : undefined,
          notBeforeUtc:
            result.body.properties?.["notBeforeUtc"] !== undefined
              ? new Date(result.body.properties?.["notBeforeUtc"])
              : undefined,
          provisioningState: result.body.properties?.["provisioningState"],
        },
  };
}

/** Get a Certificate */
export async function certificatesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesGetOptions = { requestOptions: {} },
): Promise<Certificate> {
  const result = await _certificatesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    serialNumber,
    options,
  );
  return _certificatesGetDeserialize(result);
}

export function _certificatesListByCatalogSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CertificatesListByCatalogOptions = { requestOptions: {} },
): StreamableMethod<
  | CertificatesListByCatalog200Response
  | CertificatesListByCatalogDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates",
      subscriptionId,
      resourceGroupName,
      catalogName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        $filter: options?.filter,
        $top: options?.top,
        $skip: options?.skip,
        $maxpagesize: options?.maxpagesize,
      },
    });
}

export async function _certificatesListByCatalogDeserialize(
  result:
    | CertificatesListByCatalog200Response
    | CertificatesListByCatalogDefaultResponse,
): Promise<CertificateListResult> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    value: result.body["value"].map((p) => ({
      id: p["id"],
      type: p["type"],
      systemData: !p.systemData
        ? undefined
        : {
            createdBy: p.systemData?.["createdBy"],
            createdByType: p.systemData?.["createdByType"],
            createdAt:
              p.systemData?.["createdAt"] !== undefined
                ? new Date(p.systemData?.["createdAt"])
                : undefined,
            lastModifiedBy: p.systemData?.["lastModifiedBy"],
            lastModifiedByType: p.systemData?.["lastModifiedByType"],
            lastModifiedAt:
              p.systemData?.["lastModifiedAt"] !== undefined
                ? new Date(p.systemData?.["lastModifiedAt"])
                : undefined,
          },
      properties: !p.properties
        ? undefined
        : {
            certificate: p.properties?.["certificate"],
            status: p.properties?.["status"],
            subject: p.properties?.["subject"],
            thumbprint: p.properties?.["thumbprint"],
            expiryUtc:
              p.properties?.["expiryUtc"] !== undefined
                ? new Date(p.properties?.["expiryUtc"])
                : undefined,
            notBeforeUtc:
              p.properties?.["notBeforeUtc"] !== undefined
                ? new Date(p.properties?.["notBeforeUtc"])
                : undefined,
            provisioningState: p.properties?.["provisioningState"],
          },
    })),
    nextLink: result.body["nextLink"],
  };
}

/** List Certificate resources by Catalog */
export function certificatesListByCatalog(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  options: CertificatesListByCatalogOptions = { requestOptions: {} },
): PagedAsyncIterableIterator<Certificate> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _certificatesListByCatalogSend(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    _certificatesListByCatalogDeserialize,
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _certificatesRetrieveCertChainSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesRetrieveCertChainOptions = { requestOptions: {} },
): StreamableMethod<
  | CertificatesRetrieveCertChain200Response
  | CertificatesRetrieveCertChainDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveCertChain",
      subscriptionId,
      resourceGroupName,
      catalogName,
      serialNumber,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _certificatesRetrieveCertChainDeserialize(
  result:
    | CertificatesRetrieveCertChain200Response
    | CertificatesRetrieveCertChainDefaultResponse,
): Promise<CertificateChainResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    certificateChain: result.body["certificateChain"],
  };
}

/** Retrieves cert chain. */
export async function certificatesRetrieveCertChain(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  options: CertificatesRetrieveCertChainOptions = { requestOptions: {} },
): Promise<CertificateChainResponse> {
  const result = await _certificatesRetrieveCertChainSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    serialNumber,
    options,
  );
  return _certificatesRetrieveCertChainDeserialize(result);
}

export function _certificatesRetrieveProofOfPossessionNonceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
  options: CertificatesRetrieveProofOfPossessionNonceOptions = {
    requestOptions: {},
  },
): StreamableMethod<
  | CertificatesRetrieveProofOfPossessionNonce200Response
  | CertificatesRetrieveProofOfPossessionNonceDefaultResponse
> {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureSphere/catalogs/{catalogName}/certificates/{serialNumber}/retrieveProofOfPossessionNonce",
      subscriptionId,
      resourceGroupName,
      catalogName,
      serialNumber,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        proofOfPossessionNonce:
          proofOfPossessionNonceRequest["proofOfPossessionNonce"],
      },
    });
}

export async function _certificatesRetrieveProofOfPossessionNonceDeserialize(
  result:
    | CertificatesRetrieveProofOfPossessionNonce200Response
    | CertificatesRetrieveProofOfPossessionNonceDefaultResponse,
): Promise<ProofOfPossessionNonceResponse> {
  if (isUnexpected(result)) {
    throw createRestError(result);
  }

  return {
    certificate: result.body["certificate"],
    status: result.body["status"],
    subject: result.body["subject"],
    thumbprint: result.body["thumbprint"],
    expiryUtc:
      result.body["expiryUtc"] !== undefined
        ? new Date(result.body["expiryUtc"])
        : undefined,
    notBeforeUtc:
      result.body["notBeforeUtc"] !== undefined
        ? new Date(result.body["notBeforeUtc"])
        : undefined,
    provisioningState: result.body["provisioningState"],
  };
}

/** Gets the proof of possession nonce. */
export async function certificatesRetrieveProofOfPossessionNonce(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  catalogName: string,
  serialNumber: string,
  proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
  options: CertificatesRetrieveProofOfPossessionNonceOptions = {
    requestOptions: {},
  },
): Promise<ProofOfPossessionNonceResponse> {
  const result = await _certificatesRetrieveProofOfPossessionNonceSend(
    context,
    subscriptionId,
    resourceGroupName,
    catalogName,
    serialNumber,
    proofOfPossessionNonceRequest,
    options,
  );
  return _certificatesRetrieveProofOfPossessionNonceDeserialize(result);
}
