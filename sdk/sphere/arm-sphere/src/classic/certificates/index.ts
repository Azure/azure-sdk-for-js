// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureSphereContext } from "../../api/AzureSphereContext.js";
import {
  Certificate,
  CertificateChainResponse,
  ProofOfPossessionNonceRequest,
  ProofOfPossessionNonceResponse,
} from "../../models/models.js";
import {
  certificatesGet,
  certificatesListByCatalog,
  certificatesRetrieveCertChain,
  certificatesRetrieveProofOfPossessionNonce,
} from "../../api/certificates/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import {
  CertificatesGetOptions,
  CertificatesListByCatalogOptions,
  CertificatesRetrieveCertChainOptions,
  CertificatesRetrieveProofOfPossessionNonceOptions,
} from "../../models/options.js";

export interface CertificatesOperations {
  get: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    options?: CertificatesGetOptions,
  ) => Promise<Certificate>;
  listByCatalog: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    options?: CertificatesListByCatalogOptions,
  ) => PagedAsyncIterableIterator<Certificate>;
  retrieveCertChain: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    options?: CertificatesRetrieveCertChainOptions,
  ) => Promise<CertificateChainResponse>;
  retrieveProofOfPossessionNonce: (
    subscriptionId: string,
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
    options?: CertificatesRetrieveProofOfPossessionNonceOptions,
  ) => Promise<ProofOfPossessionNonceResponse>;
}

export function getCertificates(context: AzureSphereContext) {
  return {
    get: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      serialNumber: string,
      options?: CertificatesGetOptions,
    ) =>
      certificatesGet(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        serialNumber,
        options,
      ),
    listByCatalog: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      options?: CertificatesListByCatalogOptions,
    ) =>
      certificatesListByCatalog(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        options,
      ),
    retrieveCertChain: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      serialNumber: string,
      options?: CertificatesRetrieveCertChainOptions,
    ) =>
      certificatesRetrieveCertChain(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        serialNumber,
        options,
      ),
    retrieveProofOfPossessionNonce: (
      subscriptionId: string,
      resourceGroupName: string,
      catalogName: string,
      serialNumber: string,
      proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
      options?: CertificatesRetrieveProofOfPossessionNonceOptions,
    ) =>
      certificatesRetrieveProofOfPossessionNonce(
        context,
        subscriptionId,
        resourceGroupName,
        catalogName,
        serialNumber,
        proofOfPossessionNonceRequest,
        options,
      ),
  };
}

export function getCertificatesOperations(
  context: AzureSphereContext,
): CertificatesOperations {
  return {
    ...getCertificates(context),
  };
}
