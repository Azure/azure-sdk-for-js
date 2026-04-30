// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CodeSigningContext } from "../../api/codeSigningContext.js";
import {
  revokeCertificate,
  listByCodeSigningAccount,
  $delete,
  create,
  get,
} from "../../api/certificateProfiles/operations.js";
import type {
  CertificateProfilesRevokeCertificateOptionalParams,
  CertificateProfilesListByCodeSigningAccountOptionalParams,
  CertificateProfilesDeleteOptionalParams,
  CertificateProfilesCreateOptionalParams,
  CertificateProfilesGetOptionalParams,
} from "../../api/certificateProfiles/options.js";
import type { CertificateProfile, RevokeCertificate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CertificateProfiles operations. */
export interface CertificateProfilesOperations {
  /** Revoke a certificate under a certificate profile. */
  revokeCertificate: (
    resourceGroupName: string,
    accountName: string,
    profileName: string,
    body: RevokeCertificate,
    options?: CertificateProfilesRevokeCertificateOptionalParams,
  ) => Promise<void>;
  /** List certificate profiles under an artifact signing account. */
  listByCodeSigningAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: CertificateProfilesListByCodeSigningAccountOptionalParams,
  ) => PagedAsyncIterableIterator<CertificateProfile>;
  /** Delete a certificate profile. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    profileName: string,
    options?: CertificateProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a certificate profile. */
  create: (
    resourceGroupName: string,
    accountName: string,
    profileName: string,
    resource: CertificateProfile,
    options?: CertificateProfilesCreateOptionalParams,
  ) => PollerLike<OperationState<CertificateProfile>, CertificateProfile>;
  /** Get details of a certificate profile. */
  get: (
    resourceGroupName: string,
    accountName: string,
    profileName: string,
    options?: CertificateProfilesGetOptionalParams,
  ) => Promise<CertificateProfile>;
}

function _getCertificateProfiles(context: CodeSigningContext) {
  return {
    revokeCertificate: (
      resourceGroupName: string,
      accountName: string,
      profileName: string,
      body: RevokeCertificate,
      options?: CertificateProfilesRevokeCertificateOptionalParams,
    ) => revokeCertificate(context, resourceGroupName, accountName, profileName, body, options),
    listByCodeSigningAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: CertificateProfilesListByCodeSigningAccountOptionalParams,
    ) => listByCodeSigningAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      profileName: string,
      options?: CertificateProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, profileName, options),
    create: (
      resourceGroupName: string,
      accountName: string,
      profileName: string,
      resource: CertificateProfile,
      options?: CertificateProfilesCreateOptionalParams,
    ) => create(context, resourceGroupName, accountName, profileName, resource, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      profileName: string,
      options?: CertificateProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, profileName, options),
  };
}

export function _getCertificateProfilesOperations(
  context: CodeSigningContext,
): CertificateProfilesOperations {
  return {
    ..._getCertificateProfiles(context),
  };
}
