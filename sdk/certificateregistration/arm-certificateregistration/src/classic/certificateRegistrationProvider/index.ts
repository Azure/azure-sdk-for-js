// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificateRegistrationManagementContext } from "../../api/certificateRegistrationManagementContext.js";
import { listOperations } from "../../api/certificateRegistrationProvider/operations.js";
import { CertificateRegistrationProviderListOperationsOptionalParams } from "../../api/certificateRegistrationProvider/options.js";
import { CsmOperationDescription } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CertificateRegistrationProvider operations. */
export interface CertificateRegistrationProviderOperations {
  /** Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider */
  listOperations: (
    options?: CertificateRegistrationProviderListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<CsmOperationDescription>;
}

function _getCertificateRegistrationProvider(context: CertificateRegistrationManagementContext) {
  return {
    listOperations: (options?: CertificateRegistrationProviderListOperationsOptionalParams) =>
      listOperations(context, options),
  };
}

export function _getCertificateRegistrationProviderOperations(
  context: CertificateRegistrationManagementContext,
): CertificateRegistrationProviderOperations {
  return {
    ..._getCertificateRegistrationProvider(context),
  };
}
