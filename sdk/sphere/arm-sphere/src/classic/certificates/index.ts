// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSphereContext } from "../../api/azureSphereContext.js";
import {
  retrieveProofOfPossessionNonce,
  retrieveCertChain,
  listByCatalog,
  get,
} from "../../api/certificates/operations.js";
import type {
  CertificatesRetrieveProofOfPossessionNonceOptionalParams,
  CertificatesRetrieveCertChainOptionalParams,
  CertificatesListByCatalogOptionalParams,
  CertificatesGetOptionalParams,
} from "../../api/certificates/options.js";
import type {
  Certificate,
  CertificateChainResponse,
  ProofOfPossessionNonceRequest,
  ProofOfPossessionNonceResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Certificates operations. */
export interface CertificatesOperations {
  /** Gets the proof of possession nonce. */
  retrieveProofOfPossessionNonce: (
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
    options?: CertificatesRetrieveProofOfPossessionNonceOptionalParams,
  ) => Promise<ProofOfPossessionNonceResponse>;
  /** Retrieves cert chain. */
  retrieveCertChain: (
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    options?: CertificatesRetrieveCertChainOptionalParams,
  ) => Promise<CertificateChainResponse>;
  /** List Certificate resources by Catalog */
  listByCatalog: (
    resourceGroupName: string,
    catalogName: string,
    options?: CertificatesListByCatalogOptionalParams,
  ) => PagedAsyncIterableIterator<Certificate>;
  /** Get a Certificate */
  get: (
    resourceGroupName: string,
    catalogName: string,
    serialNumber: string,
    options?: CertificatesGetOptionalParams,
  ) => Promise<Certificate>;
}

function _getCertificates(context: AzureSphereContext) {
  return {
    retrieveProofOfPossessionNonce: (
      resourceGroupName: string,
      catalogName: string,
      serialNumber: string,
      proofOfPossessionNonceRequest: ProofOfPossessionNonceRequest,
      options?: CertificatesRetrieveProofOfPossessionNonceOptionalParams,
    ) =>
      retrieveProofOfPossessionNonce(
        context,
        resourceGroupName,
        catalogName,
        serialNumber,
        proofOfPossessionNonceRequest,
        options,
      ),
    retrieveCertChain: (
      resourceGroupName: string,
      catalogName: string,
      serialNumber: string,
      options?: CertificatesRetrieveCertChainOptionalParams,
    ) => retrieveCertChain(context, resourceGroupName, catalogName, serialNumber, options),
    listByCatalog: (
      resourceGroupName: string,
      catalogName: string,
      options?: CertificatesListByCatalogOptionalParams,
    ) => listByCatalog(context, resourceGroupName, catalogName, options),
    get: (
      resourceGroupName: string,
      catalogName: string,
      serialNumber: string,
      options?: CertificatesGetOptionalParams,
    ) => get(context, resourceGroupName, catalogName, serialNumber, options),
  };
}

export function _getCertificatesOperations(context: AzureSphereContext): CertificatesOperations {
  return {
    ..._getCertificates(context),
  };
}
