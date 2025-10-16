// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerContext } from "../../api/planetaryComputerContext.js";
import {
  revokeToken,
  getToken,
  getSign,
} from "../../api/sharedAccessSignature/operations.js";
import {
  SharedAccessSignatureRevokeTokenOptionalParams,
  SharedAccessSignatureGetTokenOptionalParams,
  SharedAccessSignatureGetSignOptionalParams,
} from "../../api/sharedAccessSignature/options.js";
import {
  SharedAccessSignatureSignedLink,
  SharedAccessSignatureToken,
} from "../../models/models.js";

/** Interface representing a SharedAccessSignature operations. */
export interface SharedAccessSignatureOperations {
  /**
   * Revoke a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
   * for managed storage account of this GeoCatalog.
   */
  revokeToken: (
    options?: SharedAccessSignatureRevokeTokenOptionalParams,
  ) => Promise<void>;
  /**
   * Generate a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works)
   * for the given storage account and container. The storage account and container
   * must be associated with a Planetary Computer dataset indexed by the STAC API.
   */
  getToken: (
    collectionId: string,
    options?: SharedAccessSignatureGetTokenOptionalParams,
  ) => Promise<SharedAccessSignatureToken>;
  /**
   * Signs a HREF (a link URL) by appending a [SAS Token](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview#how-a-shared-access-signature-works).
   * If the HREF is not a Azure Blob Storage HREF, then pass back the HREF unsigned.
   */
  getSign: (
    href: string,
    options?: SharedAccessSignatureGetSignOptionalParams,
  ) => Promise<SharedAccessSignatureSignedLink>;
}

function _getSharedAccessSignature(context: PlanetaryComputerContext) {
  return {
    revokeToken: (options?: SharedAccessSignatureRevokeTokenOptionalParams) =>
      revokeToken(context, options),
    getToken: (
      collectionId: string,
      options?: SharedAccessSignatureGetTokenOptionalParams,
    ) => getToken(context, collectionId, options),
    getSign: (
      href: string,
      options?: SharedAccessSignatureGetSignOptionalParams,
    ) => getSign(context, href, options),
  };
}

export function _getSharedAccessSignatureOperations(
  context: PlanetaryComputerContext,
): SharedAccessSignatureOperations {
  return {
    ..._getSharedAccessSignature(context),
  };
}
